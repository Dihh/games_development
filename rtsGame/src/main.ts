/* eslint-disable no-new */
/* eslint-disable no-param-reassign */
import { Background } from './models/background.js';
import { Barraks } from './models/barraks.js';
import { Workers } from './models/workers.js';
import { House } from './models/house.js';
import { Route } from './models/route.js';
import { Mine } from './models/mine.js';
import { Enemy } from './models/enemy.js';
import { Swordsman } from './models/units/swordsman.js';
import { Camera } from './models/camera.js';
import { HUD } from './models/HUD.js';
import { Coordenate } from './interfaces/coordenate.js';
import { Structure } from './models/structure.js';
import { Drawable } from './models/drawable.js';
import { Option } from './interfaces/options.js';
import { PositionsTypes } from './utils/utils.js';
import { Battalion } from './models/battalion.js';
import { Projectile } from './models/units/projectile.js';
import { Archers } from './models/units/archers.js';
import { Unity } from './models/unity.js';

class Main {
  private MAPWIDTH = 1000;

  private MAPHEIGHT = 1000;

  // window.screen.width - 20
  private LARGURA = 400;

  private ALTURA = 660;

  private canvas: HTMLCanvasElement = this.setCanvas();

  private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

  private camera: Camera = new Camera({ x: 0, y: 0 }, { x: -1000, y: -1100 });

  private hud = new HUD(160, 0, 30, 30, 'economy', './images/gold_icon.png', './images/iron_ore.png', this.ctx);

  private BG: Background = new Background('./images/map.png', this.ctx, this.MAPWIDTH, this.MAPHEIGHT, this.camera, this.hud);

  private soldiers: Unity[] = [];

  private workers: Workers[] = [];

  private targets: Structure[] = [];

  private enemies: Enemy[] = [];

  private elements: Drawable[] = [];

  private projectile: Projectile[] = [];

  private initialTouch: Coordenate = { x: 0, y: 0 };

  private frames = 0;

  private fps = 0;

  private battalions: Battalion[] = [];

  private barraks: Barraks[] = [];

  main(): void {
    this.setCanvasEvents();
    this.setWindowsEvents();
    this.setInitialElements();
    setInterval(() => { this.hud.setFPS(this.fps); this.fps = 0; }, 1000);
    this.roda();
  }

  setCanvasEvents(): void {
    this.canvas.addEventListener('mouseup', (evt) => { this.click(evt); });
    this.canvas.addEventListener('mousedown', () => { });
  }

  setWindowsEvents(): void {
    window.addEventListener('touchcancel', () => { });
    window.addEventListener('touchend', () => { });
    window.addEventListener('touchmove', (evt) => { this.touchmove(evt); });
    window.addEventListener('touchstart', (evt) => { this.touchstart(evt); });
    window.addEventListener('keydown', (evt) => { this.keydown(evt); });
  }

  // eslint-disable-next-line max-statements,  max-lines-per-function
  setInitialElements(): void {
    const house = new House('./images/house.png', this.ctx, { x: 900, y: 745 }, this.camera, this.hud);
    const route = new Route('./images/target.png', this.ctx, { x: 910, y: 940 }, this.camera, this.hud, []);
    const route2 = new Route('./images/target.png', this.ctx, { x: 670, y: 760 }, this.camera, this.hud, []);
    const dragon = new Enemy('./images/dragon.png', this.ctx, { x: 0, y: 0 }, this.enemies, this.camera, this.hud, []);
    const soldierRoute4 = new Route('./images/target.png', this.ctx, { x: 80, y: 280 }, this.camera, this.hud, []);
    const soldierRoute3 = new Route('./images/target.png', this.ctx, { x: 460, y: 280 }, this.camera, this.hud, []);
    const soldierRoute5 = new Route('./images/target.png', this.ctx, { x: 290, y: 430 }, this.camera, this.hud, []);
    const soldierRoute6 = new Route('./images/target.png', this.ctx, { x: 285, y: 715 }, this.camera, this.hud, []);
    const soldierRoute7 = new Route('./images/target.png', this.ctx, { x: 80, y: 720 }, this.camera, this.hud, []);
    const dragon2 = new Enemy('./images/dragon.png', this.ctx, { x: 20, y: 470 }, this.enemies, this.camera, this.hud, []);
    const dragon3 = new Enemy('./images/dragon.png', this.ctx, { x: 20, y: 900 }, this.enemies, this.camera, this.hud, []);
    const soldierRoute10 = new Route('./images/target.png', this.ctx, { x: 870, y: 280 }, this.camera, this.hud, []);
    const dragon4 = new Enemy('./images/dragon.png', this.ctx, { x: 820, y: 0 }, this.enemies, this.camera, this.hud, []);
    const soldierRoute2 = new Route('./images/target.png', this.ctx, { x: 450, y: 430 }, this.camera, this.hud, []);
    const soldierRoute1 = new Route('./images/target.png', this.ctx, { x: 880, y: 440 }, this.camera, this.hud, []);
    const barraksRoute = new Route('./images/target.png', this.ctx, { x: 820, y: 650 }, this.camera, this.hud, []);
    const dragon5 = new Enemy('./images/dragon.png', this.ctx, { x: 80, y: 280 }, this.enemies, this.camera, this.hud, [soldierRoute3, soldierRoute4, soldierRoute10]);
    soldierRoute2.setNextRoutes([
      { route: soldierRoute3, direction: PositionsTypes.top },
      { route: soldierRoute5, direction: PositionsTypes.left },
      { route: soldierRoute1, direction: PositionsTypes.right },
    ]);
    soldierRoute5.setNextRoutes([
      { route: soldierRoute2, direction: PositionsTypes.left },
      { route: soldierRoute6, direction: PositionsTypes.bottom },
      { route: soldierRoute2, direction: PositionsTypes.right },
    ]);
    soldierRoute3.setNextRoutes([
      { route: soldierRoute4, direction: PositionsTypes.left },
      { route: soldierRoute2, direction: PositionsTypes.bottom },
      { route: soldierRoute10, direction: PositionsTypes.right },
    ]);
    soldierRoute4.setNextRoutes([
      { route: dragon, direction: PositionsTypes.top },
      { route: soldierRoute3, direction: PositionsTypes.right },
    ]);
    soldierRoute1.setNextRoutes([
      { route: soldierRoute2, direction: PositionsTypes.left },
      { route: barraksRoute, direction: PositionsTypes.bottom },
    ]);
    soldierRoute10.setNextRoutes([
      { route: dragon4, direction: PositionsTypes.top },
      { route: soldierRoute3, direction: PositionsTypes.left },
    ]);
    soldierRoute6.setNextRoutes([
      { route: soldierRoute7, direction: PositionsTypes.left },
      { route: soldierRoute5, direction: PositionsTypes.top },
    ]);
    soldierRoute7.setNextRoutes([
      { route: dragon2, direction: PositionsTypes.top },
      { route: dragon3, direction: PositionsTypes.bottom },
      { route: soldierRoute6, direction: PositionsTypes.right },
    ]);
    barraksRoute.setNextRoutes([
      { route: soldierRoute1, direction: PositionsTypes.top },
    ]);
    const mine = new Mine('./images/mine2.png', this.ctx, { x: 650, y: 900 }, house, 'gold', this.camera, this.hud, [house, route]);
    const iron = new Mine('./images/ironMine.png', this.ctx, { x: 650, y: 650 }, house, 'iron', this.camera, this.hud, [house, route2]);
    const barraks = new Barraks('./images/barraks.png', this.ctx, { x: 900, y: 600 }, this.camera, this.hud, [{ route: soldierRoute1, direction: PositionsTypes.top }], this.battalions, barraksRoute);
    this.barraks.push(barraks);
    this.setElementsArray(house, mine, [dragon, dragon2, dragon3, dragon4, dragon5] as Enemy[]);
    this.workers.push(new Workers(this.ctx, './images/default_character.png', house, [house, route, mine, route], this.hud, this.camera, 1, this.workers));
    this.elements.push(house, mine, barraks, iron);
  }

  setElementsArray(house: House, mine: Structure, enemies: Enemy[]): void {
    this.targets.push(
      mine,
      house,
    );
    if (enemies.length) {
      this.enemies.push(
        ...enemies,
      );
    }
  }

  // eslint-disable-next-line max-lines-per-function
  roda(): void {
    this.atualiza();
    this.workers.forEach((el) => {
      el.move();
      if (el.getLife() <= 0) {
        this.workers = this.workers.filter((ele) => ele !== el);
      }
    });

    this.enemies.forEach((el) => {
      el.move();
      if (el.getLife() <= 0) {
        this.enemies = this.enemies.filter((ele) => ele !== el);
      }
      el.changeMovement();
    });

    this.soldiers.forEach((el) => {
      const element = el as Swordsman | Archers;
      if (el.constructor.name === 'Archers') {
        this.refreshArchers(el as Archers);
      }
      el.move();
      if (el.getLife() <= 0) {
        element.getBattalion().removeSoldier(element);
        this.soldiers = this.soldiers.filter((ele) => ele !== el);
      }
    });

    this.projectile.forEach((el) => {
      if (el.getCollision()) {
        this.projectile = this.projectile.filter((ele) => ele !== el);
      }
      el.move();
    });

    this.battalions.forEach((el) => {
      if (!el.getSoldiers().length) {
        const route = el.getInRoute();
        if (route) route.setInThisRoute(null);
        this.battalions = this.battalions.filter((ele) => ele !== el);
      }
      el.move();
    });

    this.barraks.forEach((el) => {
      el.setBattalion(this.battalions);
    });

    this.desenha();

    window.requestAnimationFrame(() => {
      if (this.hud.getPause()) return;
      this.fps += 1;
      this.roda();
    });
  }

  refreshArchers(archer: Archers): void {
    const enemy = archer.getNear() ? archer.getNear() as Unity : null;
    const position = { x: archer.getCenter().x, y: archer.getCenter().y };
    if (archer.getCanShoot() && enemy) {
      new Projectile(this.ctx, './images/arrow.png', [enemy], this.camera, 10, this.projectile, position, 10, 10, this.hud);
      archer.setCanShoot(false);
    }
  }

  // eslint-disable-next-line max-statements, max-lines-per-function
  desenha(): void {
    this.BG.draw();
    this.elements.forEach((el) => el.draw());
    this.battalions.forEach((el) => el.draw());
    this.workers.forEach((el) => el.draw());
    this.soldiers.forEach((el) => el.draw());
    this.projectile.forEach((el) => el.draw());
    this.elements.filter((el) => el.getClicked()).forEach((el) => el.drawOptions());
    this.battalions.filter((el) => el.getClicked() && !el.thereIsSoldierMoving())
      .forEach((el) => el.drawOptions());
    this.BG.drawFog(this.workers, this.soldiers, this.elements, this.enemies);
    this.enemies.filter((el) => !el.getInFog()).forEach((el) => el.draw());
    this.hud.draw();
  }

  atualiza(): void {
    this.camera.acelerateCamera(this.MAPWIDTH, this.MAPHEIGHT, this.LARGURA, this.ALTURA);
    this.enemies.forEach((el) => {
      el.verifyProximity(this.soldiers);
      el.refresh();
    });
    this.battalions.forEach((el) => {
      el.refresh();
    });
    this.frames += 1;
    if (this.frames % 15 === 14) {
      this.hud.setTime(-0.25);
      if (this.hud.getTimer() === 0) {
        this.hud.setRound(this.hud.getRound() === 'fight' ? 'economy' : 'fight');
        this.hud.setTime(this.hud.getRoundTime());
      }
      this.frames = 0;
    }
  }

  // eslint-disable-next-line max-statements, max-lines-per-function
  click(evt: MouseEvent): void {
    const cameraPosition = this.camera.getPosition();
    const position = {
      x: evt.pageX - 10 - cameraPosition.x,
      y: evt.pageY - 10 - cameraPosition.y,
    };

    const clickedElement = this.elements.find((el) => el.getClicked());
    const clickedSoldier = this.battalions.find((el) => el.getClicked());
    const options = clickedElement?.getClickOptions();
    const soldierOptions = clickedSoldier?.getClickOptions();

    let option;
    if (options || soldierOptions) {
      option = this.findClickedOption(position, options,
        soldierOptions, clickedElement, clickedSoldier);
    }
    if (option) {
      if (!option.title) {
        option.function();
        return;
      }
      if (option.toConfirm) {
        option.confirmed = true;
      } else {
        option.toConfirm = true;
      }
      if (option.confirmed) {
        option.function(this.workers, this.soldiers, this.targets, this.enemies);
        this.elements.forEach((el) => { el.disableClicked(); });
        this.battalions.forEach((el) => { el.disableClicked(); });
      }
    } else {
      this.elements.forEach((el) => { el.disableClicked(); });
      this.battalions.forEach((el) => { el.disableClicked(); });
      const element: Drawable | undefined = this.findClickedElement(
        position, this.elements, this.battalions,
      );
      if (element) {
        element.setClicked(true);
      }
    }
  }

  // eslint-disable-next-line max-lines-per-function
  findClickedOption(position: Coordenate, elements: Option[] | undefined,
    battalions: Option[] | undefined,
    ele: Drawable | undefined, soldier: Drawable | undefined): Option | undefined {
    let element: Option | undefined;
    if (ele && elements) {
      const elementPosition = ele.getPosition();
      element = elements.find((el) => position.x
        >= elementPosition.x - el.position.x
        && position.x <= elementPosition.x - el.position.x + el.width
        && position.y >= elementPosition.y - el.position.y
        && position.y <= elementPosition.y - el.position.y + el.height);
      if (element) {
        elements.filter((el) => el !== element).forEach((el) => {
          el.toConfirm = false;
        });
      }
    } else if (!element && soldier && battalions) {
      const elementPosition = soldier.getPosition();
      element = battalions.find((el) => position.x
        >= elementPosition.x - el.position.x
        && position.x <= elementPosition.x - el.position.x + el.width
        && position.y >= elementPosition.y - el.position.y
        && position.y <= elementPosition.y - el.position.y + el.height);
    }
    return element;
  }

  // eslint-disable-next-line max-lines-per-function
  findClickedElement(position: Coordenate, elements: Drawable[],
    battalions: Drawable[]): Drawable | undefined {
    let element;
    element = elements.find((el) => {
      const elementPosition = el.getPosition();
      return position.x >= elementPosition.x
        && position.x <= elementPosition.x + el.getWidth()
        && position.y >= elementPosition.y
        && position.y <= elementPosition.y + el.getHeight();
    });
    if (!element) {
      element = battalions.find((el) => {
        const elementPosition = el.getPosition();
        return position.x >= elementPosition.x
          && position.x <= elementPosition.x + el.getWidth()
          && position.y >= elementPosition.y
          && position.y <= elementPosition.y + el.getHeight();
      });
    }
    return element;
  }

  setCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = this.LARGURA;
    canvas.height = this.ALTURA;
    canvas.style.border = '1px solid #000';
    document.body.appendChild(canvas);
    return canvas;
  }

  touchmove(evt: TouchEvent): void {
    const movMent = {
      x: evt.changedTouches[0].pageX - this.initialTouch.x,
      y: evt.changedTouches[0].pageY - this.initialTouch.y,
    };
    this.initialTouch.x = evt.changedTouches[0].pageX;
    this.initialTouch.y = evt.changedTouches[0].pageY;
    this.camera.moveCamera(movMent.x, movMent.y);
  }

  touchstart(evt: TouchEvent): void {
    this.initialTouch.x = evt.changedTouches[0].pageX;
    this.initialTouch.y = evt.changedTouches[0].pageY;
  }

  keydown(evt: KeyboardEvent): void {
    switch (evt.key.toLowerCase()) {
      case 'w':
        this.camera.moveCamera(0, 40);
        break;
      case 'a':
        this.camera.moveCamera(40, 0);
        break;
      case 's':
        this.camera.moveCamera(0, -40);
        break;
      case 'd':
        this.camera.moveCamera(-40, 0);
        break;
      default:
        break;
    }
  }
}

const main = new Main();
main.main();
