import { Coordenate } from '../interfaces/coordenate.js';
import { NextRoute } from '../interfaces/nextRoun.js';
import { Camera } from './camera.js';
import { canMoveUniy } from './canMoveUniy.js';
import { Drawable } from './drawable.js';
import { HUD } from './HUD.js';

export class Unity extends canMoveUniy {
  protected x = 1;

  protected y = 1;

  protected mainTarget: Drawable[];

  protected life = 100;

  protected imageSizw: number;

  protected damage: number;

  protected maxLife: number;

  protected list: Unity[];

  protected healPoints: number = 0;

  constructor(
    ctx: CanvasRenderingContext2D, imgSrc: string, position: Coordenate, target: Drawable[],
    type: string, camera: Camera, width: number, height: number, imageSizw: number, hud: HUD,
    moveRound: string[], workTime: number, damage: number, maxLife: number, list: Unity[],
    route: NextRoute[],
  ) {
    super(imgSrc, ctx, position, camera, hud, target,
      route, width, height, workTime, type, moveRound);
    this.mainTarget = target;
    this.target = [];
    this.moveRound = moveRound;
    this.imageSizw = imageSizw;
    this.damage = damage;
    this.maxLife = maxLife;
    this.list = list;
  }

  protected setWaiting(waiting: boolean): void {
    this.oldWaiting = !waiting;
    this.waiting = waiting;
  }

  getLife(): number {
    return this.life;
  }

  getNear(): Drawable | null {
    return this.near;
  }

  doDamage(damage: number): void {
    this.life -= damage;
  }

  changeAnimatioImageInferiorDireito(): void {
    if (this.velocity && this.velocity.x > 0 && this.velocity.y >= 0) {
      if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
        this.y = 64;
      } else {
        this.y = 1;
      }
      this.moving = true;
    }
  }

  changeAnimatioImageSuperiorEsquerdo(): void {
    if (this.velocity && this.velocity.x <= 0 && this.velocity.y <= 0) {
      if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
        this.y = 32;
      } else {
        this.y = 96;
      }
      this.moving = true;
    }
  }

  changeAnimatioImageSuperiorDireito(): void {
    if (this.velocity && this.velocity.x >= 0 && this.velocity.y <= 0) {
      if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
        this.y = 64;
      } else {
        this.y = 96;
      }
      this.moving = true;
    }
  }

  changeAnimatioImageInferiorEsquerdo(): void {
    if (this.velocity && this.velocity.x <= 0 && this.velocity.y > 0) {
      if (Math.abs(this.velocity.x) > Math.abs(this.velocity.y)) {
        this.y = 32;
      } else {
        this.y = 1;
      }
      this.moving = true;
    }
  }

  changeAnimatioImage(): void {
    if (this.moving) {
      if (this.frame % 15 === 14) {
        this.x += this.imageSizw;
        if (this.x > 94) this.x = 1;
      }
    }
  }

  drawLife(): void {
    this.ctx.font = '10px Arial';
    this.ctx.fillStyle = '#000';
    const cameraPosition = this.camera.getPosition();
    this.ctx.fillText(`${this.life}`, this.center.x + cameraPosition.x, this.position.y + this.height + 10 + cameraPosition.y);
  }

  draw(): void {
    const cameraPosition = this.camera.getPosition();
    this.frame += 1;
    this.moving = false;
    this.changeMovement();
    this.changeAnimation();
    this.ctx.drawImage(this.img, this.x, this.y, this.imageSizw, this.imageSizw,
      this.position.x + cameraPosition.x, this.position.y + cameraPosition.y, this.width,
      this.height);
    this.drawLife();
  }

  changeAnimation(): void {
    if (this.velocity && this.velocity.x === 0 && this.velocity.y === 0) this.velocity = undefined;
    this.changeAnimatioImageInferiorDireito();
    this.changeAnimatioImageSuperiorEsquerdo();
    this.changeAnimatioImageSuperiorDireito();
    this.changeAnimatioImageInferiorEsquerdo();
    this.changeAnimatioImage();
  }

  heal(): void {
    if (this.frame % 60 === 59 && !this.velocity) {
      this.life += this.life < this.maxLife ? this.healPoints : 0;
    }
  }
}
