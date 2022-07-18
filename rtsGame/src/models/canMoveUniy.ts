import { Coordenate } from '../interfaces/coordenate.js';
import { NextRoute } from '../interfaces/nextRoun.js';
import { Camera } from './camera.js';
import { canMove } from './canMove.js';
import { Drawable } from './drawable.js';
import { Enemy } from './enemy.js';
import { HUD } from './HUD.js';

export class canMoveUniy extends canMove {
  protected ctx: CanvasRenderingContext2D;

  protected camera: Camera;

  protected route: NextRoute[];

  protected moveRound: string[];

  protected moving: boolean;

  protected velocity: Coordenate | undefined = { x: 0, y: 0 };

  protected targetDistance?: Coordenate = undefined;

  protected nearStatus: string = '';

  protected nearFrames = 0;

  protected oldWaiting: boolean = false;

  protected waiting = false;

  protected near: Drawable | null = null;

  protected frame = 0;

  protected fighting: boolean = false;

  constructor(img: string, ctx: CanvasRenderingContext2D, position: Coordenate,
    camera: Camera, hud: HUD, target: Drawable[], route: NextRoute[],
    width: number, height: number, worktime: number, type: string, moveRound: string[]) {
    super(img, ctx, position, type, camera, width, height, hud, worktime, target, 1, 200);
    this.camera = camera;
    this.route = route;
    this.ctx = ctx;
    this.moveRound = moveRound;
    this.moving = false;
  }

  isMoving(): boolean {
    return this.moving;
  }

  getFighting(): boolean {
    if (this.target[0] && this.target[0].constructor.name === 'Enemy') {
      const target = this.target[0] as Enemy;
      if (target.getLife() <= 0) { this.fighting = false; }
    }
    return this.fighting;
  }

  setFighting(fighting: boolean): void {
    this.fighting = fighting;
  }

  getVelocity(): Coordenate | undefined {
    return this.velocity;
  }

  move(): void {
    this.setNearFrame();
    if (this.goToTarget()) {
      this.getDistance();
      if (this.oldWaiting === true && this.waiting === false) {
        this.onNearOut();
        this.nearStatus = 'out';
        this.oldWaiting = false;
      }
    }
  }

  setNearFrame(): void {
    if (this.nearStatus === 'in' && this.target.length) {
      this.nearFrames += 1;
      if (this.nearFrames % this.target[0].getWorkTime() === 0) {
        this.onKeepNear();
      }
    } else {
      this.nearFrames = 0;
    }
  }

  onKeepNear(): void { }

  goToTarget(): boolean {
    const unityCanMove = this.setCanMove();
    if (this.target[0]) {
      if (unityCanMove) {
        this.isNear();
        if (!this.waiting && !this.fighting) {
          return true;
        }
      }
    } else {
      this.onNoTarget();
    }
    return false;
  }

  onNearOut(): void { }

  onNoTarget(): void { }

  setCanMove(): boolean {
    let unityCanMove;
    if (this.moveRound.find((el) => el === this.hud.getRound())) {
      unityCanMove = this.inMovingRound();
    } else {
      unityCanMove = this.outMovingRound();
    }
    return unityCanMove;
  }

  inMovingRound(): boolean { return true; }

  outMovingRound(): boolean { return false; }

  onNearIn(): void {
    this.waiting = true;
    if (!(this.near && this.near.constructor.name === 'Unity')) {
      this.target.splice(0, 1);
      this.waiting = false;
    }
  }

  getTargetDistance(): Coordenate | undefined {
    return this.targetDistance;
  }

  setTarget(target: Drawable[]): void {
    this.target = target;
  }

  addTarget(target: Drawable): void {
    this.target.push(target);
  }

  refresh(): void {
    this.frame += 1;
  }

  isNear(): void { }
}
