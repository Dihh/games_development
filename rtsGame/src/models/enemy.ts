import { Unity } from './unity.js';
import { Coordenate } from '../interfaces/coordenate';
import { Camera } from './camera.js';
import { HUD } from './HUD.js';
import { Swordsman } from './units/swordsman.js';
import { Route } from './route.js';

export class Enemy extends Unity {
  private initialPosition: Route;

  private enemyRoute: Route[];

  private inRoute: Route | null = null;

  constructor(
    imgSrc: string,
    ctx: CanvasRenderingContext2D,
    position: Coordenate,
    list: Unity[],
    camera: Camera,
    hud: HUD,
    route: Route[],
  ) {
    super(ctx, imgSrc, position, [], 'dragon', camera, 80, 80, 80, hud, ['fight', 'economy'], 60, 10, 100, list, []);
    this.life = this.maxLife;
    this.initialPosition = new Route('./images/target.png', this.ctx, { x: this.position.x + this.width / 2, y: this.position.y + this.height }, this.camera, this.hud, []);
    this.enemyRoute = route;
  }

  inMovingRound(): boolean {
    return true;
  }

  refresh(): void {
    this.frame += 1;
    if (this.frame % 60 === 59) {
      this.life += this.life < this.maxLife ? 2 : 0;
      this.frame = 0;
    }
  }

  onKeepNear(): void {
    if (this.near) {
      if (this.near instanceof Unity) {
        this.fighting = true;
        if (this.near.getLife() > 0) {
          this.near.doDamage(this.damage);
        } else {
          this.fighting = false;
          this.waiting = false;
          this.near = null;
          this.target = [this.initialPosition];
        }
      } else {
        this.target = [];
      }
    }
  }

  onNearIn(): void {
    if (this.target[0] instanceof Route) {
      const route = this.target[0] as Route;
      route.setEnemyInThisRoute(this);
      this.inRoute = route;
    }

    this.fighting = true;
    this.velocity = undefined;
  }

  isNear(): void {
    let distance = 2;
    if (this.target[0] instanceof Swordsman) {
      distance = 60;
    }
    if (this.targetDistance
      && this.targetDistance.x < distance && this.targetDistance.y < distance) {
      this.near = this.target[0] || null;
      this.nearStatus = 'in';
      this.onNearIn();
      this.velocity = undefined;
      this.targetDistance = undefined;
    }
  }

  verifyProximity(soldiers: Unity[]): void {
    const nearSoldier = soldiers.find((el) => {
      const elementCenter = el.getCenter();
      const dy = elementCenter.y - (this.position.y + this.height);
      const dx = elementCenter.x - (this.position.x + (this.width / 2));
      const distance: Coordenate = {
        x: Math.abs(dx),
        y: Math.abs(dy),
      };
      return distance.x < 70 && distance.y < 70;
    }) as Swordsman;
    if (nearSoldier) {
      nearSoldier.atack(this);
      this.target = [nearSoldier];
    }
  }

  draw(): void {
    const cameraPosition = this.camera.getPosition();
    this.ctx.drawImage(
      this.img,
      this.position.x + cameraPosition.x,
      this.position.y + cameraPosition.y,
      this.width,
      this.height,
    );
    this.ctx.font = '10px Arial';
    this.ctx.fillStyle = '#000';
    this.ctx.fillText(` ${this.life}`, this.center.x + cameraPosition.x, this.position.y + this.height + 10 + cameraPosition.y);
  }

  onNoTarget(): void {
    this.fighting = false;
    if (this.enemyRoute.length) {
      if (this.inRoute) {
        this.getRandomTarget(this.inRoute);
      } else {
        this.target = [this.enemyRoute[0]];
        this.near = null;
      }
    }
  }

  getRandomTarget(inRoute: Route): void {
    if (this.enemyRoute.length) {
      const routesQuant = inRoute.getNextRoutes().length + 1;
      const randomRoute = Math.floor(Math.random() * (routesQuant - 1)) + 0;
      const nextRoute = inRoute.getNextRoutes()[randomRoute].route;
      this.near = null;
      if (!(nextRoute instanceof Route)) return;
      if (!(this.enemyRoute.includes((nextRoute)))) return;
      this.initialPosition = nextRoute || this.initialPosition;
      this.target = nextRoute ? [nextRoute] : [];
    }
  }
}
