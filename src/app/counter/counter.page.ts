import { Component, OnDestroy, OnInit } from '@angular/core';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnDestroy {
  counter: number;
  timerRef;
  isRunning = false;
  startText = 'Start';

  startTimer() {
    this.isRunning = !this.isRunning;
    // TODO abstract one level higher
    if (this.isRunning) {
      this.startText = 'Stop';
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      this.startText = 'Resume';
      clearInterval(this.timerRef);
      setTimeout(() => {
        alert('Phosporus elapsed');
      }, 12 * this.counter);
    }
  }

  clearTimer() {
    this.isRunning = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
