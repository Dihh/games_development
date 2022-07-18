/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

interface Coordenate {
  x: number,
  y: number,
  icon: string
}

interface Positions {
  top: Coordenate,
  right: Coordenate,
  bottom: Coordenate,
  left: Coordenate,
}

export const positions: Positions = {
  top: { x: -30, y: 70, icon: '⇧' },
  right: { x: -110, y: -10, icon: '⇨' },
  bottom: { x: -35, y: -95, icon: '⇩' },
  left: { x: 50, y: -10, icon: '⇦' },
};

export enum PositionsTypes {
  top = 'top',
  left = 'left',
  right = 'right',
  bottom = 'bottom'
}
