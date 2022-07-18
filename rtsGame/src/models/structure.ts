import { Coordenate } from '../interfaces/coordenate';
import { Camera } from './camera';
import { Drawable } from './drawable.js';
import { HUD } from './HUD';

export class Structure extends Drawable {
  constructor(
    imgSrc: string,
    ctx: CanvasRenderingContext2D,
    position: Coordenate,
    type: string,
    camera: Camera,
    hud: HUD,
    width: number,
    height: number,
    workTime: number,
  ) {
    super(imgSrc, ctx, position, type, camera, width, height, hud, workTime, 300);
  }
}
