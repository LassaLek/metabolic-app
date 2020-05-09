import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit() {

    // TODO
/*    // Check permission
    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => console.log(hasPermission))

// Request permissions
    this.speechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )*/
  }

}
