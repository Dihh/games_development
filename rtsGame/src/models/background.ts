import { Coordenate } from '../interfaces/coordenate.js';
import { Camera } from './camera.js';
import { Drawable } from './drawable.js';
import { HUD } from './HUD.js';

export class Background extends Drawable {
  private fog: Array<{
    xi: number, xf: number, yi: number, yf: number, hardfog: boolean, status: boolean
  }>[] = [];

  constructor(
    imgSrc: string,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    camera: Camera,
    hud: HUD,
  ) {
    super(imgSrc, ctx, { x: 0, y: 0 }, '', camera, width, height, hud, 0, 0);
    this.setFog();
  }

  draw(): void {
    this.drawOutMap();
    const cameraPosition = this.camera.getPosition();
    this.ctx.drawImage(this.img, -cameraPosition.x, -cameraPosition.y,
      this.width, this.height, 0, 0, this.width, this.height);
  }

  drawOutMap(): void {
    this.ctx.fillStyle = '#777';
    this.ctx.fillRect(-20, -20, this.width + 20, this.height + 20);
  }

  setFog(): void {
    const lines = this.width / 100;
    const coluns = this.height / 100;
    for (let i = 0; i < lines; i += 1) {
      this.fog[i] = [];
      for (let j = 0; j < coluns; j += 1) {
        this.fog[i][j] = {
          xi: 100 * i,
          xf: 100 * i + 100,
          yi: 100 * j,
          yf: 100 * j + 100,
          hardfog: true,
          status: true,
        };
      }
    }
  }

  drawFog(workers: Drawable[], soldiers: Drawable[],
    structures: Drawable[], enemies: Drawable[]): void {
    const cameraPosition = this.camera.getPosition();
    for (let i = 0; i < this.fog.length; i += 1) {
      for (let j = 0; j < this.fog[i].length; j += 1) {
        if (this.isInFog(workers, i, j) || this.isInFog(soldiers, i, j)
          || this.isInFog(structures, i, j)) {
          this.setFogStatus(i, j);
          continue;
        }
        if (this.fog[i][j].xi + cameraPosition.x > -200
          && this.fog[i][j].yi + cameraPosition.y > -200) {
          this.fog[i][j].status = true;
          this.drawFogVision(i, j, cameraPosition);
        }
      }
    }
    this.putInFog(enemies);
  }

  setFogStatus(i: number, j: number): void {
    this.fog[i][j].hardfog = false;
    this.fog[i][j].status = false;
  }

  drawFogVision(i: number, j: number, cameraPosition: Coordenate): void {
    const relativeX = (this.fog[i][j].xi + cameraPosition.x);
    const relativeY = (this.fog[i][j].yi + cameraPosition.y);
    this.ctx.fillStyle = this.fog[i][j].hardfog ? '#333333' : '#33333355';
    this.ctx.fillRect(relativeX, relativeY, 100, 100);
  }

  isInFog(elements: Drawable[], i: number, j: number): boolean {
    const status = elements.find((element) => (
      element.getCenter().x > 100 * i - element.getVision() + 100
      && element.getCenter().x < 100 * i + element.getVision()
      && element.getCenter().y > 100 * j - element.getVision() + 100
      && element.getCenter().y < 100 * j + element.getVision()));
    return !!status;
  }

  putInFog(elements: Drawable[]): void {
    elements.forEach((el) => {
      let inFog = true;
      for (let i = 0; i < this.fog.length; i += 1) {
        for (let j = 0; j < this.fog[i].length; j += 1) {
          const relativeX = 100 * i;
          const relativeY = 100 * j;
          if (el.getCenter().x >= relativeX && el.getCenter().x <= relativeX + 100
            && el.getCenter().y >= relativeY && el.getCenter().y <= relativeY + 100
            && !this.fog[i][j].status
          ) {
            inFog = false;
          }
        }
      }
      el.setInFog(inFog);
    });
  }
}
