import { Coordenate } from '../interfaces/coordenate';

export class Camera {
  private position: Coordenate;

  private aceleration: Coordenate = { x: 0, y: 0 };

  constructor(position: Coordenate, acelaration: Coordenate) {
    this.position = position;
    this.aceleration = acelaration;
  }

  getPosition(): Coordenate {
    return this.position;
  }

  setAcelerateX(move: Coordenate): Coordenate {
    const movement = move;
    if (this.aceleration.x > 0) {
      movement.x += Math.abs(this.aceleration.x) > 10 ? 10 : this.aceleration.x;
      this.aceleration.x -= Math.abs(this.aceleration.x) > 10 ? 10 : this.aceleration.x;
    } else {
      movement.x -= Math.abs(this.aceleration.x) > 10 ? 10 : -this.aceleration.x;
      this.aceleration.x += Math.abs(this.aceleration.x) > 10 ? 10 : -this.aceleration.x;
    }
    return movement;
  }

  setAcelerateY(move: Coordenate): Coordenate {
    const movement = move;
    if (this.aceleration.y > 0) {
      movement.y += Math.abs(this.aceleration.y) > 10 ? 10 : this.aceleration.y;
      this.aceleration.y -= Math.abs(this.aceleration.y) > 10 ? 10 : this.aceleration.y;
    } else {
      movement.y -= Math.abs(this.aceleration.y) > 10 ? 10 : -this.aceleration.y;
      this.aceleration.y += Math.abs(this.aceleration.y) > 10 ? 10 : -this.aceleration.y;
    }
    return movement;
  }

  moveCameraAxys(move: Coordenate, MAPWIDTH: number,
    MAPHEIGHT: number, LARGURA: number, ALTURA: number): void {
    if (this.position.x + move.x > 20 || this.position.x + move.x < -MAPWIDTH + LARGURA - 20) {
      this.aceleration.x = 0;
    } else {
      this.position.x += move.x;
    }
    if (this.position.y + move.y > 20 || this.position.y + move.y < -MAPHEIGHT + ALTURA - 20) {
      this.aceleration.y = 0;
    } else {
      this.position.y += move.y;
    }
  }

  moveCamera(x: number, y: number): void {
    this.aceleration.x += x * 2;
    this.aceleration.y += y * 2;
  }

  acelerateCamera(MAPWIDTH: number, MAPHEIGHT: number, LARGURA: number, ALTURA: number): void {
    if (this.aceleration.x || this.aceleration.y) {
      let move = { x: 0, y: 0 };
      move = this.setAcelerateX(move);
      move = this.setAcelerateY(move);
      this.moveCameraAxys(move, MAPWIDTH, MAPHEIGHT, LARGURA, ALTURA);
    }
  }
}
