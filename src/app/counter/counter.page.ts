import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Insomnia } from '@ionic-native/insomnia/ngx';

declare const annyang: any;

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit, OnDestroy {
  counter: number;
  timerRef;
  voiceRef;
  isRunning = false;
  isListening: boolean = false;

  startText = 'Start';
  // TODO coefitients to enum
  coefficient = 12;

  private sub: Subscription;
  constructor(private localNotifications: LocalNotifications,
              private route: ActivatedRoute,
              private insomnia: Insomnia,
              private speechRecognition: SpeechRecognition,
              private zone: NgZone) {

  }

  ngOnInit() {
    if (annyang) {
      // Let's define a command.
      var commands = {
        'go': () => { this.startTimer(); }
      };

      // Add our commands to annyang
      annyang.addCommands(commands);
      annyang.start();

    } else {
      console.log('No voice');
    }
    // TODO
/*    // Check feature available
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available))*/


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
        // this.listen();

    } else {

      setTimeout(() => {
        console.log('Notification');
        // Schedule a single notification
        this.localNotifications.schedule({
          id: 1,
          text: 'Notifa',
          // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
          sound: 'file://sound.mp3',
        });
      }, this.coefficient * this.counter);
      this.clearTimer();

    }
  }

  clearTimer() {
    this.isRunning = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
    clearInterval(this.voiceRef);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    clearInterval(this.timerRef);
    clearInterval(this.voiceRef);
    this.insomnia.allowSleepAgain()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
  }

  listen(): void {
    if (annyang) {
      // Start listening.
    }

  }

}
