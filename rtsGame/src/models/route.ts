import { Coordenate } from '../interfaces/coordenate.js';
import { Camera } from './camera.js';
import { HUD } from './HUD.js';
import { Structure } from './structure.js';
import { NextRoute } from '../interfaces/nextRoun.js';
import { Battalion } from './battalion.js';
import { Enemy } from './enemy.js';

export class Route extends Structure {
  private nextRoutes: NextRoute[];

  private inThisRoute: Battalion | null = null;

  private enemyInThisRoute: Enemy | null = null;

  private canHeal: boolean = false;

  constructor(imgSrc: string, ctx: CanvasRenderingContext2D, position: Coordenate,
    camera: Camera, hud: HUD, nextRoutes: NextRoute[]) {
    super(imgSrc, ctx, position, 'route', camera, hud, 15, 15, 1);
    this.nextRoutes = nextRoutes;
  }

  getNextRoutes(): NextRoute[] {
    return this.nextRoutes;
  }

  setNextRoutes(value: NextRoute[]): void {
    this.nextRoutes = value;
  }

  getEnemyInThisRoute(): Enemy | null {
    return this.enemyInThisRoute;
  }

  setEnemyInThisRoute(enemyInThisRoute: Enemy | null): void {
    this.enemyInThisRoute = enemyInThisRoute;
  }

  getCanHeal(): boolean {
    return this.canHeal;
  }

  setCanHeal(canHeal: boolean): void {
    this.canHeal = canHeal;
  }

  getInThisRoute(): Battalion | null {
    return this.inThisRoute;
  }

  setInThisRoute(battalion: Battalion | null): void {
    this.inThisRoute = battalion;
  }
}
