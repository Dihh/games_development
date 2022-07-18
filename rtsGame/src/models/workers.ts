import { Camera } from './camera.js';
import { Drawable } from './drawable.js';
import { House } from './house.js';
import { HUD } from './HUD.js';
import { Mine } from './mine.js';
import { Route } from './route.js';
import { Unity } from './unity.js';

export class Workers extends Unity {
  private gold = 0;

  private iron = 0;

  protected near: Mine | House | null = null;

  protected target: House[] | Mine[] = [];

  constructor(
    ctx: CanvasRenderingContext2D,
    imgSrc: string,
    house: House,
    target: Drawable[],
    hud: HUD,
    camera: Camera,
    workTime: number,
    list: Unity[],
  ) {
    super(ctx, imgSrc, { x: house.getCenter().x + house.getWidth() / 2, y: house.getCenter().y + house.getHeight() / 2 }, target, 'worker', camera, 20, 20, 31, hud, ['fight'], workTime, 5, 100, list, []);
    this.hud = hud;
  }

  onNearIn(): void {
    if (this.near && this.near.getType() === 'house') {
      this.hud.addGold(this.gold);
      this.hud.addIron(this.iron);
      this.gold = 0;
      this.iron = 0;
    }
    if (this.near && this.near instanceof Mine) {
      if (this.near.getResource() === 'gold') {
        this.gold += 10;
      } else if (this.near.getResource() === 'iron') {
        this.iron += 10;
      }
    }
    this.setWaiting(true);
  }

  onNoTarget(): void {
    this.velocity = undefined;
    this.target = [...this.mainTarget];
  }

  onKeepNear(): void {
    this.target.splice(0, 1);
    this.setWaiting(false);
  }

  isNear(): void {
    const distance = this.target[0] instanceof Route ? 10 : 60;
    if (this.targetDistance
      && this.targetDistance.x < distance && this.targetDistance.y < distance) {
      this.near = this.target[0] || null;
      this.nearStatus = 'in';
      this.onNearIn();
      this.velocity = undefined;
      this.targetDistance = undefined;
    }
  }

  outMovingRound(): boolean {
    return true;
  }

  inMovingRound(): boolean {
    return true;
  }
}
