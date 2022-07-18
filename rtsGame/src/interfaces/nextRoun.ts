import { Enemy } from '../models/enemy.js';
import { Route } from '../models/route.js';
import { PositionsTypes } from '../utils/utils.js';

export interface NextRoute {
    route: Route | Enemy,
    direction: PositionsTypes
}
