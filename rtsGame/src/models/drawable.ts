/* eslint-disable no-unused-vars */
import { Coordenate } from '../interfaces/coordenate';
import { NextRoute } from '../interfaces/nextRoun';
import { Option } from '../interfaces/options';
import { Camera } from './camera';
import { HUD } from './HUD';

export class Drawable {
  protected width: number;

  protected height: number;

  protected img: HTMLImageElement

  protected ctx: CanvasRenderingContext2D

  protected position: Coordenate;

  protected center: Coordenate;

  protected camera: Camera

  protected type: string;

  protected hud: HUD;

  protected clicked = false;

  protected workTime: number;

  protected clickOptions: Option[] = [];

  protected vision: number;

  protected inFog: boolean = true;

  protected fogSeted: boolean = false;

  constructor(imgSrc: string, ctx: CanvasRenderingContext2D,
    position: Coordenate, type: string, camera: Camera, width: number, height: number,
    hud: HUD, workTime: number, vision: number = 0) {
    [this.img, this.ctx] = [new Image(), ctx];
    this.img.src = imgSrc;
    this.position = position;
    this.center = { x: this.position.x + width / 2, y: this.position.y + height / 2 };
    this.camera = camera;
    this.width = width;
    this.height = height;
    this.type = type;
    this.hud = hud;
    [this.workTime, this.vision] = [workTime, vision];
  }

  getVision(): number {
    return this.vision;
  }

  setVision(vision: number): void {
    this.vision = vision;
  }

  getInFog(): boolean {
    return this.inFog;
  }

  setInFog(inFog: boolean): void {
    this.inFog = inFog;
  }

  getFogSeted(): boolean {
    return this.fogSeted;
  }

  setFogSeted(fogSeted: boolean): void {
    this.fogSeted = fogSeted;
  }

  getWorkTime(): number {
    return this.workTime;
  }

  getCenter(): Coordenate {
    return this.center;
  }

  getWidth(): number {
    return this.width;
  }

  getType(): string {
    return this.type;
  }

  getHeight(): number {
    return this.height;
  }

  getPosition(): Coordenate {
    return this.position;
  }

  getClicked(): boolean {
    return this.clicked;
  }

  setClicked(clicked: boolean): void {
    this.clicked = clicked;
  }

  getClickOptions(): Option[] {
    return this.clickOptions;
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
  }

  drawOptions(): void {
    const cameraPosition = this.camera.getPosition();
    this.drawOptionCircle(cameraPosition);
    this.clickOptions.forEach((el) => {
      this.ctx.beginPath();
      this.drawOption(cameraPosition, el);
      if (!el.toConfirm) {
        this.ctx.fillText(el.icon,
          (this.position.x - el.position.x + el.width / 2) + cameraPosition.x,
          this.position.y - el.position.y + (el.height / 1.5) + cameraPosition.y);
      } else {
        this.ctx.fillText('✓', (this.position.x - el.position.x + el.width / 2) + cameraPosition.x, this.position.y - el.position.y + (el.height / 1.5) + cameraPosition.y);
        const positionX = this.getPositionX(cameraPosition);
        this.drawOptionInfo(positionX, cameraPosition, el);
      }
    });
  }

  drawOptionCircle(cameraPosition: Coordenate): void {
    this.ctx.beginPath();
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = '#00000070';
    const radius = this.constructor.name === 'Battalion' ? 80 : 40;
    this.ctx.arc(
      this.center.x + cameraPosition.x,
      this.center.y + cameraPosition.y,
      radius, 0, 2 * Math.PI,
    );
    this.ctx.stroke();
  }

  drawOption(cameraPosition: Coordenate, element: Option): void {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(
      this.position.x - element.position.x + cameraPosition.x,
      this.position.y - element.position.y + cameraPosition.y,
      element.width,
      element.height,
    );
    this.ctx.font = '16px Arial bold';
    this.ctx.fillStyle = '#fff';
  }

  drawOptionInfo(positionX: number, cameraPosition: Coordenate, element: Option): void {
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(
      positionX,
      this.position.y + cameraPosition.y - 20,
      170,
      100,
    );
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(element.title, positionX, this.position.y + cameraPosition.y);
    this.ctx.font = '10px Arial';
    this.ctx.fillText(element.text, positionX, this.position.y + cameraPosition.y + 20);
    this.ctx.textAlign = 'center';
  }

  getPositionX(cameraPosition: Coordenate): number {
    if (this.position.x + cameraPosition.x - 210 > 0) {
      return this.position.x + cameraPosition.x - this.height * 4.2;
    }
    return this.position.x + cameraPosition.x + this.height * 1.5;
  }

  disableClicked(): void {
    this.clicked = false;
    this.clickOptions = this.clickOptions.map((el) => ({
      ...el,
      toConfirm: false,
      confirmed: false,
    }));
  }

  click(workes: Drawable[], soldier: Drawable[], target: Drawable[],
    enemies: Drawable[], route: NextRoute | null, routes: NextRoute[]): void {
    this.clicked = true;
  }
}
