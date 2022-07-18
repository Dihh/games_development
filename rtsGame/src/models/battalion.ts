import { Coordenate } from '../interfaces/coordenate.js';
import { NextRoute } from '../interfaces/nextRoun.js';
import { Camera } from './camera.js';
import { Drawable } from './drawable.js';
import { HUD } from './HUD.js';
import { positions, PositionsTypes } from '../utils/utils.js';
import { Route } from './route.js';
import { Swordsman } from './units/swordsman.js';
import { canMoveUniy } from './canMoveUniy.js';
import { Enemy } from './enemy.js';
import { Unity } from './unity.js';

export class Battalion extends canMoveUniy {
  private soldiers: Unity[] = [];

  private soldiersPositions: Drawable[] = [];

  private direction: string = '';

  private inRoute: Route | null = null;

  private pausedTarget: Drawable[] = [];

  private directions = {
    top: {
      x: [-30, -10, 10],
      y: [-75, -75, -75],
      moveX: 0,
      moveY: 30,
    },
    left: {
      x: [-50, -50, -50],
      y: [-45, -15, +15],
      moveX: 20,
      moveY: 0,
    },
    right: {
      x: [30, 30, 30],
      y: [-45, -15, +15],
      moveX: -20,
      moveY: 0,
    },
    bottom: {
      x: [-30, -10, 10],
      y: [+45, +45, +45],
      moveX: 0,
      moveY: -30,
    },
  }

  constructor(ctx: CanvasRenderingContext2D, center: Coordenate,
    camera: Camera, hud: HUD, target: Drawable[], route: NextRoute[]) {
    super('', ctx, center, camera, hud, target, route, 170, 170, 0, '', ['fight', 'economy']);
    this.setClickOption();
  }

  setClickOption(): void {
    this.clickOptions = [];
    this.route.forEach((el) => {
      this.clickOptions.push({
        toConfirm: false,
        confirmed: false,
        height: 28,
        width: 28,
        icon: positions[el.direction].icon,
        title: '',
        text: '',
        position: {
          x: positions[el.direction].x - 40,
          y: positions[el.direction].y - 60,
        },
        function: () => { this.click([], [], [], [], el); },
      });
    });
  }

  atack(enemy: Enemy): void {
    this.velocity = undefined;
    this.pausedTarget = [...this.target];
    this.target = [];
    this.fighting = true;
    this.soldiers.forEach((el) => {
      el.setTarget([enemy]);
    });
  }

  setInRoute(inRoute: Route | null): void {
    this.inRoute = inRoute;
  }

  getInRoute(): Route | null {
    return this.inRoute;
  }

  removeSoldier(soldier: Unity): void {
    this.soldiers = this.soldiers.filter((el) => el !== soldier);
  }

  getSoldiers(): Unity[] {
    return this.soldiers;
  }

  addSoldiers(soldier: Unity): void {
    this.soldiers.push(soldier);
  }

  getSoldiersPosition(): Drawable[] {
    return this.soldiersPositions;
  }

  draw(): void {
    this.changeMovement();
    this.moving = false;
    if (this.velocity && Math.abs(this.velocity.x) > 0 && Math.abs(this.velocity.y) > 0) {
      this.moving = true;
    }
    this.setDirection();
    this.ctx.beginPath();
    this.tempDrawRects();
  }

  setDirection(): void {
    this.soldiersPositions = [];
    if (this.direction === 'left') {
      this.setDirectionPositions(this.soldiers.length, PositionsTypes.left);
    } else if (this.direction === 'top') {
      this.setDirectionPositions(this.soldiers.length, PositionsTypes.top);
    } else if (this.direction === 'right') {
      this.setDirectionPositions(this.soldiers.length, PositionsTypes.right);
    } else {
      this.setDirectionPositions(this.soldiers.length, PositionsTypes.bottom);
    }
  }

  tempDrawRects(): void {
    const cameraPosition = this.camera.getPosition();
    this.ctx.lineWidth = 2;
    const thereIsNoSoldierMoving = (!this.velocity || (this.velocity && this.velocity.x === 0
      && this.velocity.y === 0)) && !this.thereIsSoldierMoving();
    this.ctx.strokeStyle = thereIsNoSoldierMoving ? '#044f00A0' : '#420000A0';
    this.ctx.setLineDash([10, 5]);
    const radius = 85;
    this.ctx.arc(
      this.center.x + cameraPosition.x,
      this.center.y + cameraPosition.y,
      radius, 0, 2 * Math.PI,
    );
    if (this.clicked) this.ctx.strokeStyle = '#020053A0';
    if (!this.clicked || !thereIsNoSoldierMoving) this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  setDirectionPositions(quantity = 10, position: PositionsTypes): void {
    for (let i = 0; i < quantity; i += 1) {
      this.soldiersPositions.push(
        new Drawable('', this.ctx, { x: this.center.x + this.directions[position].x[(i % 3)] + this.directions[position].moveX * Math.floor(i / 3), y: this.center.y + this.directions[position].y[(i % 3)] + this.directions[position].moveY * Math.floor(i / 3) }, '', this.camera, 20, 30, this.hud, 30),
      );
    }
  }

  getDistance(): void {
    if (this.getThereIsSoldierMoving()) return;
    if (!this.target.length) return;
    const targetCenter = this.target[0].getCenter();
    const distance = {
      y: targetCenter.y - (this.position.y + this.height),
      x: targetCenter.x - (this.position.x + (this.width / 2)),
    };
    const greater = Math.abs(distance.y) < Math.abs(distance.x) ? distance.x : distance.y;
    let multiple = 1;
    while ((greater / multiple) > multiple) { multiple *= 10; }
    this.targetDistance = { x: Math.abs(distance.x), y: Math.abs(distance.y) };
    this.velocity = {
      y: distance.y / multiple / Math.abs(greater / multiple),
      x: distance.x / multiple / Math.abs(greater / multiple),
    };
  }

  getThereIsSoldierMoving(): Boolean {
    this.soldiers.forEach((el) => {
      const index = this.soldiers.findIndex((ele) => el === ele);
      el.setTarget([this.soldiersPositions[index]]);
      el.getDistance();
    });
    const thereIsSoldierMoving = this.soldiers.find((el) => {
      const targetDistance = el.getTargetDistance();
      return targetDistance && (targetDistance.x > 1 || targetDistance.y > 1);
    });
    if (thereIsSoldierMoving && !this.moving) {
      this.velocity = undefined;
      return true;
    }

    return false;
  }

  click(workes: Drawable[], soldier: Drawable[], target: Drawable[],
    enemies: Drawable[], route: NextRoute): void {
    if (this.moving || this.transferSoldiers(route.route)) return;
    if (this.inRoute) this.inRoute.setInThisRoute(null);
    if (this.sendTo(route.route)) return;
    this.direction = route.direction;
    this.setDirection();
    this.target.push(route.route);
    if (route.route instanceof Route) this.route = route.route.getNextRoutes();
    this.setClickOption();
  }

  sendTo(route: Route | Enemy): Boolean {
    if (route.constructor.name === 'Enemy') {
      this.soldiers.forEach((el) => {
        el.addTarget(route);
      });
      this.target = [];
      return true;
    }
    if (route instanceof Route) {
      route.setInThisRoute(this);
      this.inRoute = route;
    }
    return false;
  }

  transferSoldiers(route: Route | Enemy): boolean {
    if (route instanceof Route) {
      const inNextRoute = route.getInThisRoute();
      if (inNextRoute) {
        const battalionInRoute = inNextRoute as Battalion;
        battalionInRoute.soldiers = [...battalionInRoute.soldiers, ...this.soldiers];
        this.sendSoldierToBattalion(battalionInRoute);
        return true;
      }
    }
    return false;
  }

  sendSoldierToBattalion(battalionInRoute: Battalion): void {
    this.soldiers.forEach((el) => {
      const soldier = el as Swordsman;
      soldier.setBattalion(battalionInRoute);
    });
    battalionInRoute.setDirection();
    this.soldiers = [];
    battalionInRoute.soldiers.forEach((el) => {
      const index = battalionInRoute.soldiers.findIndex((ele) => el === ele);
      el.setTarget([battalionInRoute.soldiersPositions[index]]);
      el.getDistance();
    });
  }

  isNear(): void {
    const distance = this.target[0] instanceof Route ? 20 : 60;
    if (this.targetDistance
      && this.targetDistance.x < distance && this.targetDistance.y < distance) {
      this.near = this.target[0] || null;
      this.nearStatus = 'in';
      this.onNearIn();
      this.velocity = undefined;
      this.targetDistance = undefined;
    }
  }

  refresh(): void {
    this.frame += 1;
    if (this.inRoute?.getCanHeal()) {
      this.soldiers.forEach((el) => {
        el.heal();
      });
    }
  }

  onNoTarget(): void {
    if (this.fighting) {
      this.fighting = false;
      this.target = [...this.pausedTarget];
    }
  }

  thereIsSoldierMoving(): boolean {
    if (this.isMoving()) return true;
    if (this.getSoldiers().find((ele) => ele.getFighting())) return true;
    const thereIsSoldierMoving = this.getSoldiers().find((ele) => {
      const targetDistance = ele.getTargetDistance();
      return targetDistance && (targetDistance.x > 1 || targetDistance.y > 1);
    });
    return !!thereIsSoldierMoving;
  }
}
