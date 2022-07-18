import { Coordenate } from '../interfaces/coordenate.js';
import { Camera } from './camera.js';
import { HUD } from './HUD.js';
import { Structure } from './structure.js';

export class House extends Structure {
  constructor(imgSrc: string, ctx: CanvasRenderingContext2D, position: Coordenate,
    camera: Camera, hud: HUD) {
    super(imgSrc, ctx, position, 'house', camera, hud, 50, 50, 30);
  }
}
