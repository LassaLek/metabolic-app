import { Component, OnDestroy, OnInit } from '@angular/core';
import { startTimeRange } from '@angular/core/src/profile/wtf_impl';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Insomnia } from '@ionic-native/insomnia/ngx';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit, OnDestroy {
  counter: number;
  timerRef;
  isRunning = false;
  startText = 'Start';
  // TODO coefitients to enum
  coefficient = 12;

  private sub: Subscription;
  constructor(private localNotifications: LocalNotifications,
              private route: ActivatedRoute,
              private insomnia: Insomnia) {

  }

  ngOnInit() {
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        // TODO no magic string
        this.coefficient = +params['ratio'] || 12;
      });
  }

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
        // Schedule a single notification
        this.localNotifications.schedule({
          id: 1,
          text: 'Phosphorus',
          // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          sound: 'file://sound.mp3',
        });
      }, this.coefficient * this.counter);
    }
  }

  clearTimer() {
    this.isRunning = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    clearInterval(this.timerRef);

    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
  }
}
