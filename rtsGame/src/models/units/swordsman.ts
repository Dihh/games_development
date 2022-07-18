import { Camera } from '../camera';
import { Drawable } from '../drawable.js';
import { HUD } from '../HUD';
import { Unity } from '../unity.js';
import { NextRoute } from '../../interfaces/nextRoun';
import { Battalion } from '../battalion';
import { Coordenate } from '../../interfaces/coordenate';
import { Soldier } from './soldier.js';

export class Swordsman extends Soldier {
  constructor(
    ctx: CanvasRenderingContext2D, imgSrc: string, target: Drawable[],
    route: NextRoute[], hud: HUD, camera: Camera, workTime: number,
    damage: number, battalion: Battalion, list: Unity[], position: Coordenate,
  ) {
    super(ctx, imgSrc, position, target, 'soldier', camera, 20, 20, 31, hud, ['fight', 'economy'], workTime, damage, 100, list, route, battalion, 60);
  }

  action(near: Unity): void {
    near.doDamage(this.damage);
  }
}
