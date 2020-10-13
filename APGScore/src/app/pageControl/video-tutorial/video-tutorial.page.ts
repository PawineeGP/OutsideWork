import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tutorial',
  templateUrl: './video-tutorial.page.html',
  styleUrls: ['./video-tutorial.page.scss'],
})
export class VideoTutorialPage implements OnInit {

  constructor(private route: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  signout(){
    this.afAuth.signOut()
    .then(() => {
      localStorage.setItem('uid', '');
      localStorage.setItem('quiz', '');
      this.route.navigateByUrl('/home');
    });
  }

  gotoChooesLevel() {
    this.route.navigateByUrl('/chooes-level');
  }

}
