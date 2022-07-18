import { Camera } from '../camera.js';
import { Coordenate } from '../../interfaces/coordenate.js';
import { Unity } from '../unity.js';
import { HUD } from '../HUD.js';
import { canMove } from '../canMove.js';

export class Projectile extends canMove {
  protected damage: number;

  protected list: Projectile[];

  private collision: boolean = false;

  constructor(
    ctx: CanvasRenderingContext2D, imgSrc: string, target: Unity[],
    camera: Camera, damage: number, list: Projectile[], position: Coordenate,
    width = 10, height = 10, hud: HUD,
  ) {
    super(imgSrc, ctx, position, 'projectile', camera, width, height, hud, 0, target, 2, 0);
    this.damage = damage;
    this.list = list;
    this.list.push(this);
  }

  draw(): void {
    const cameraPosition = this.camera.getPosition();
    this.changeMovement();
    const x = this.position.x + cameraPosition.x;
    const y = this.position.y + cameraPosition.y;
    const angle = this.getAngle() * Math.PI;
    this.ctx.translate(x, y);
    this.ctx.rotate(angle);
    this.ctx.drawImage(this.img, -2 / 2, -17 / 2);
    this.ctx.rotate(-angle);
    this.ctx.translate(-x, -y);
  }

  getAngle(): number {
    const velocity = this.velocity
      ? { x: this.velocity.x / 2, y: this.velocity.y / 2 } : { x: 0, y: 0 };
    let angle = 0;
    if (velocity.x === 1) {
      angle = 0.5;
    } else if (velocity.y === -1) {
      angle = 1;
    } else if (velocity.x === -1) {
      angle = 1.5;
    } else if (velocity.y === 1) {
      angle = 0;
    }
    return angle;
  }

  move(): void {
    this.getDistance();
    if (this.targetDistance && this.targetDistance.x < 5 && this.targetDistance.y < 5) {
      this.collision = true;
      if (this.target[0].constructor.name === 'Unity') {
        const target = this.target[0] as Unity;
        target.doDamage(this.damage);
      }
    }
  }

  getCollision(): boolean {
    return this.collision;
  }
}
