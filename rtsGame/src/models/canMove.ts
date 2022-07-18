import { Coordenate } from '../interfaces/coordenate.js';
import { Camera } from './camera.js';
import { Drawable } from './drawable.js';
import { HUD } from './HUD.js';

export class canMove extends Drawable {
  protected velocity: Coordenate | undefined = { x: 0, y: 0 };

  protected target: Drawable[];

  protected targetDistance?: Coordenate = undefined;

  protected speed: number;

  constructor(
    imgSrc: string, ctx: CanvasRenderingContext2D,
    position: Coordenate, type: string, camera: Camera, width: number, height: number,
    hud: HUD, workTime: number, target: Drawable[], speed: number, vision: number = 0,
  ) {
    super(imgSrc, ctx, position, type, camera, width, height, hud, workTime, vision);
    this.target = target;
    this.speed = speed;
  }

  changeMovement(): void {
    if (this.velocity && this.velocity.x !== undefined && this.velocity.y !== undefined) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.center = { x: this.position.x + this.width / 2, y: this.position.y + this.height / 2 };
    }
  }

  getMultiple(greater: number): number {
    let multiple = 1;
    while ((greater / multiple) > multiple) { multiple *= 10; }
    return multiple;
  }

  getDistance(): void {
    if (!this.target.length) return;
    const targetCenter = this.target[0].getCenter();
    const distance = {
      x: targetCenter.x - (this.position.x + (this.width / 2)),
      y: targetCenter.y - (this.position.y + this.height),
    };
    const greater = Math.abs(distance.y) < Math.abs(distance.x) ? distance.x : distance.y;
    const multiple = this.getMultiple(greater);
    this.targetDistance = {
      x: Math.abs(distance.x),
      y: Math.abs(distance.y),
    };
    if (this.targetDistance.x !== 0 || this.targetDistance.y !== 0) {
      this.velocity = {
        x: distance.x = (distance.x / multiple / Math.abs(greater / multiple)) * this.speed,
        y: distance.y = (distance.y / multiple / Math.abs(greater / multiple)) * this.speed,
      };
    }
  }
}
