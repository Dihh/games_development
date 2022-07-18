import { Coordenate } from '../../interfaces/coordenate.js';
import { NextRoute } from '../../interfaces/nextRoun.js';
import { Battalion } from '../battalion.js';
import { Camera } from '../camera.js';
import { Drawable } from '../drawable.js';
import { Enemy } from '../enemy.js';
import { HUD } from '../HUD.js';
import { Route } from '../route.js';
import { Unity } from '../unity.js';

export class Soldier extends Unity {
  protected route: NextRoute[];

  protected battalion: Battalion;

  protected healPoints: number = 2;

  protected distance: number;

  constructor(
    ctx: CanvasRenderingContext2D, imgSrc: string, position: Coordenate, target: Drawable[],
    type: string, camera: Camera, width: number, height: number, imageSizw: number, hud: HUD,
    moveRound: string[], workTime: number, damage: number, maxLife: number, list: Unity[],
    route: NextRoute[], battalion: Battalion, distance: number,
  ) {
    super(ctx, imgSrc, position, target, 'soldier', camera, 20, 20, 31, hud, ['fight', 'economy'], workTime, damage, 100, list, []);
    [this.fighting, this.mainTarget, this.target, this.route] = [false, target, target, route];
    this.distance = distance;
    this.damage = damage;
    this.battalion = battalion;
    this.battalion.addSoldiers(this);
    this.battalion.setDirection();
    const index = this.battalion.getSoldiers().findIndex((ele) => this === ele);
    this.target.push(this.battalion.getSoldiersPosition()[index]);
  }

  onNearIn(): void {
    if (!(this.near instanceof Enemy)) {
      this.target.splice(0, 1);
      this.waiting = false;
    }
  }

  atack(enemy: Enemy): void {
    this.battalion.atack(enemy);
  }

  setVelocity(velocity: Coordenate | undefined): void {
    this.velocity = velocity;
  }

  onKeepNear(): void {
    if (this.near) {
      if (this.near instanceof Unity) {
        this.fighting = true;
        if (this.near.getLife() > 0) {
          this.action(this.near);
        } else {
          this.fighting = false;
          this.waiting = false;
          this.near = null;
          this.target.splice(0, 1);
          this.backToBattalion();
        }
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  action(near: Unity): void {
    throw new Error('Method not implemented.');
  }

  backToBattalion(): void {
    const index = this.battalion.getSoldiers().findIndex((ele) => this === ele);
    this.target.push(this.battalion.getSoldiersPosition()[index]);
    this.getDistance();
  }

  outMovingRound(): boolean {
    if (this.fighting) {
      return true;
    }
    return false;
  }

  inMovingRound(): boolean {
    const velocity = this.battalion.getVelocity();
    if (velocity && velocity.x !== 0 && velocity.y !== 0) {
      this.velocity = velocity;
    }
    return true;
  }

  isNear(): void {
    let distance = 2;
    if (this.target[0] instanceof Route) {
      distance = 20;
    } else if (this.target[0] instanceof Enemy) {
      distance = this.distance;
      this.getDistance();
    }
    if (this.targetDistance
      && this.targetDistance.x < distance && this.targetDistance.y < distance) {
      this.setNear();
    }
  }

  setNear(): void {
    this.near = this.target[0] || null;
    this.nearStatus = 'in';
    this.onNearIn();
    this.velocity = undefined;
    this.targetDistance = undefined;
  }

  getBattalion(): Battalion {
    return this.battalion;
  }

  setBattalion(battalion: Battalion): void {
    this.battalion = battalion;
  }
}
