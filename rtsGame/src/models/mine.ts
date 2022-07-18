import { Coordenate } from '../interfaces/coordenate';
import { Camera } from './camera';
import { House } from './house';
import { HUD } from './HUD';
import { Workers } from './workers.js';
import { Structure } from './structure.js';
import { Drawable } from './drawable';

export class Mine extends Structure {
  private nearHouse: House;

  private resource: string;

  private routeTo: Drawable[];

  constructor(imgSrc: string, ctx: CanvasRenderingContext2D,
    position: Coordenate, nearHouse: House, resource: string,
    camera: Camera, hud: HUD, routeTo: Drawable[]) {
    super(imgSrc, ctx, position, 'mine', camera, hud, 50, 50, 60);
    this.routeTo = [...routeTo, this, ...(routeTo.reverse()).slice(0, routeTo.length - 1)];
    this.nearHouse = nearHouse;
    this.resource = resource;
    this.setClickOption();
  }

  setClickOption(): void {
    this.clickOptions.push({
      toConfirm: false,
      confirmed: false,
      height: 28,
      width: 28,
      icon: 'T',
      title: 'Minerador',
      text: 'Coleta Recurso\nCusta: 20 Gold',
      position: {
        x: -10,
        y: 30,
      },
      function: (workers: Workers[]) => { this.click(workers); },
    });
  }

  getResource(): string {
    return this.resource;
  }

  click(workers: Workers[]): void {
    if (this.hud.getRound() === 'economy' && this.hud.getGold() >= 20) {
      workers.push(new Workers(this.ctx, './images/default_character.png', this.nearHouse, this.routeTo, this.hud, this.camera, 1, workers));
      this.hud.addGold(-20);
    }
  }
}
