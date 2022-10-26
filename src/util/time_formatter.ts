export default class TimeFormatter {
  private timeInSec: number = 0.0;

  public format(timeInMs: number): string {
    this.timeInSec = isNaN(timeInMs) ? 0.0 : timeInMs / 1000;

    return this.hrs() + ':' + this.min() + ':' + this.sec();
  }

  private sec(): string {
    const seconds = Math.round(this.timeInSec % 60);
    return this.pad(seconds);
  }

  private min(): string {
    const minutes = Math.round(this.timeInSec / 60) % 60;
    return this.pad(minutes);
  }

  private hrs(): string {
    const hours = Math.round(this.timeInSec / 3600) % 3600;
    return this.pad(hours);
  }

  private pad(number: number): string {
    return number.toString().padStart(2, '0');
  }
}
