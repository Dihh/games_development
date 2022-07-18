export class HUD {
  private gold: number;

  private iron: number;

  private timer: number;

  private roundTime: number;

  private round: string;

  private ctx: CanvasRenderingContext2D;

  private coinIcon: HTMLImageElement;

  private ironOreIcon: HTMLImageElement;

  private fps: number = 0;

  private pause = false;

  constructor(gold: number, iron: number, timer: number, roundTime: number, round: string,
    coinIcon: string, ironOreIcon: string,
    ctx: CanvasRenderingContext2D) {
    this.gold = gold;
    this.iron = iron;
    this.timer = timer;
    this.round = round;
    this.ctx = ctx;
    this.coinIcon = new Image();
    this.coinIcon.src = coinIcon;
    this.ironOreIcon = new Image();
    this.ironOreIcon.src = ironOreIcon;
    this.roundTime = roundTime;
  }

  setFPS(value: number): void {
    this.fps = value;
  }

  getRoundTime(): number {
    return this.roundTime;
  }

  setPause(pause: boolean): void {
    this.pause = pause;
  }

  getPause(): boolean {
    return this.pause;
  }

  setTime(value: number): void {
    this.timer += value;
  }

  getGold(): number {
    return this.gold;
  }

  addGold(gold: number): void {
    this.setGold(this.gold + gold);
  }

  setGold(gold: number): void {
    this.gold = gold > 9999 ? 9999 : gold;
  }

  getIron(): number {
    return this.iron;
  }

  addIron(iron: number): void {
    this.setIron(this.iron + iron);
  }

  setIron(iron: number): void {
    this.iron = iron > 9999 ? 9999 : iron;
  }

  getTimer(): number {
    return this.timer;
  }

  getRound(): string {
    return this.round;
  }

  setRound(value: string): void {
    this.round = value;
  }

  draw(): void {
    this.drawGold();
    this.drawIron();
    this.drawFps();
    this.drawRound();
  }

  private drawGold(): void {
    this.ctx.fillStyle = '#000000a0';
    this.ctx.fillRect(350, 10, 45, 15);
    this.ctx.drawImage(this.coinIcon, 330, 10, 30, 15);
    this.ctx.textAlign = 'center';
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`${this.gold}`, 375, 22);
  }

  private drawIron(): void {
    this.ctx.fillStyle = '#000000a0';
    this.ctx.fillRect(350, 30, 45, 15);
    this.ctx.drawImage(this.ironOreIcon, 330, 28, 30, 22);
    this.ctx.textAlign = 'center';
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`${this.iron}`, 375, 42);
  }

  private drawFps(): void {
    this.ctx.fillStyle = '#000000a0';
    this.ctx.fillRect(350, 50, 45, 15);
    this.ctx.textAlign = 'center';
    this.ctx.font = '12px Arial';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText(`${this.fps}`, 375, 62);
  }

  private drawRound(): void {
    this.ctx.beginPath();
    const timerArc = (((((1 / this.roundTime)) * (this.roundTime - this.timer)) + 1));
    this.ctx.arc(180, 660, 50, 1 * Math.PI, timerArc * Math.PI);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = '#000';
    this.ctx.stroke();
    this.ctx.arc(180, 660, 50, 1 * Math.PI, 0 * Math.PI);
    this.ctx.fill();
    this.drawRoundText();
  }

  drawRoundText(): void {
    this.ctx.font = '14px Arial';
    this.ctx.fillStyle = '#000';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.round === 'economy' ? 'Economia' : 'Luta'}`, 180, 650);
  }
}
