import { Coordenate } from './coordenate';

export interface Option {
    title: string;
    toConfirm: boolean;
    confirmed: boolean;
    text: string;
    icon: string;
    position: Coordenate;
    width: number;
    height: number;
    function: Function;
}
