import { Coordenate } from '../interfaces/coordenate.js';
import { NextRoute } from '../interfaces/nextRoun.js';
import { Option } from '../interfaces/options.js';
import { Battalion } from './battalion.js';
import { Camera } from './camera.js';
import { Drawable } from './drawable.js';
import { HUD } from './HUD.js';
import { Route } from './route.js';
import { Swordsman } from './units/swordsman.js';
import { Structure } from './structure.js';
import { Unity } from './unity.js';
import { Archers } from './units/archers.js';

export class Barraks extends Structure {
  private soldierRoute: NextRoute[];

  private battalions: Battalion[];

  private newBattalionPosition: Route;

  protected clickOptions: Option[] = [
    {
      toConfirm: false,
      confirmed: false,
      height: 28,
      width: 28,
      icon: 'S',
      title: 'Soldado',
      text: 'Luta pelo reino\nCusta: 40 Ouro',
      position: {
        x: -10,
        y: 30,
      },
      function: (workes: Drawable[], soldiers: Unity[]): void => {
        this.soldier(workes, soldiers, [], [], null, this.soldierRoute);
      },
    },
    {
      toConfirm: false,
      confirmed: false,
      height: 28,
      width: 28,
      icon: 'A',
      title: 'Arqueiro',
      text: 'Und de longa distância Custa: 40 ',
      position: {
        x: 30,
        y: -15,
      },
      function: (workes: Drawable[], soldiers: Unity[]): void => {
        this.archer(workes, soldiers, [], [], null, this.soldierRoute);
      },
    },
  ]

  constructor(imgSrc: string, ctx: CanvasRenderingContext2D,
    position: Coordenate, camera: Camera, hud: HUD, soldierRoute: NextRoute[],
    battalions: Battalion[], newBattalionPosition: Route) {
    super(imgSrc, ctx, position, 'barraks', camera, hud, 50, 50, 1);
    this.soldierRoute = [...soldierRoute];
    this.battalions = battalions;
    this.newBattalionPosition = newBattalionPosition;
    this.newBattalionPosition.setCanHeal(true);
  }

  setBattalion(battalions: Battalion[]): void {
    this.battalions = battalions;
  }

  soldier(workes: Drawable[], soldiers: Unity[], target: Drawable[],
    enemies: Drawable[], route: NextRoute | null, routes: NextRoute[]): void {
    this.clicked = true;
    if (this.hud.getRound() === 'economy' && this.hud.getGold() >= 40) {
      let battalion;
      const inNewBattalionRoute = this.newBattalionPosition.getInThisRoute();
      if (inNewBattalionRoute) {
        battalion = inNewBattalionRoute;
      } else {
        battalion = this.addSoldierInBattalion();
      }
      soldiers.push(new Swordsman(this.ctx, './images/default_character.png', [], routes, this.hud, this.camera, 60, 20, battalion, soldiers,
        { x: this.position.x, y: this.position.y }));
      this.hud.addGold(-40);
    }
  }

  archer(workes: Drawable[], soldiers: Unity[], target: Drawable[],
    enemies: Drawable[], route: NextRoute | null, routes: NextRoute[]): void {
    this.clicked = true;
    if (this.hud.getRound() === 'economy' && this.hud.getGold() >= 40) {
      let battalion;
      const inNewBattalionRoute = this.newBattalionPosition.getInThisRoute();
      if (inNewBattalionRoute) {
        battalion = inNewBattalionRoute;
      } else {
        battalion = this.addSoldierInBattalion();
      }
      soldiers.push(new Archers(this.ctx, './images/archer.png', [], routes, this.hud, this.camera, 60, 20, battalion, soldiers,
        { x: this.position.x, y: this.position.y }));
      this.hud.addGold(-40);
    }
  }

  addSoldierInBattalion(): Battalion {
    const battalion = new Battalion(
      this.ctx, { x: 780, y: 500 }, this.camera, this.hud,
      [], this.newBattalionPosition.getNextRoutes(),
    );
    this.newBattalionPosition.setInThisRoute(battalion);
    battalion.setInRoute(this.newBattalionPosition);
    battalion.setDirection();
    this.battalions.push(battalion);
    return battalion;
  }
}
