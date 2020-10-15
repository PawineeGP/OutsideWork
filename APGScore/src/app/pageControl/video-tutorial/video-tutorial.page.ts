import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-tutorial',
  templateUrl: './video-tutorial.page.html',
  styleUrls: ['./video-tutorial.page.scss'],
})
export class VideoTutorialPage implements OnInit {
  currentTime: number;
  chk_btn: boolean = true;
  constructor(private route: Router, private afAuth: AngularFireAuth) {
<<<<<<< HEAD
      
   }
  
=======

  }

>>>>>>> update

  setCurrentTime(data) {
    // console.log("data");

    // console.log(data);
<<<<<<< HEAD
    
     this.currentTime = data.target.currentTime;
     console.log("current Time :");
     console.log(this.currentTime);
    
     if(this.currentTime >= 115.686231){
      console.log("Button show");
      this.chk_btn = true;      
    }else if(!this.currentTime || this.currentTime == 0.00){
      this.chk_btn = false;  
    }else{
      this.chk_btn = false; 
=======

    this.currentTime = data.target.currentTime;
    //  console.log("current Time :");
    //  console.log(this.currentTime);

    if (this.currentTime >= 115.686231) {
      // console.log("Button show");
      this.chk_btn = true;
    } else if (!this.currentTime || this.currentTime == 0.00) {
      this.chk_btn = false;
    } else {
      this.chk_btn = false;
>>>>>>> update
    }

  }

  ngOnInit() {

  }

  signout() {
    this.afAuth.signOut()
      .then(() => {
        localStorage.setItem('uid', '');
        localStorage.setItem('quiz', '');
        this.route.navigateByUrl('/chooes-level');
      });
  }

  gotoChooesLevel() {
    this.route.navigateByUrl('/chooes-level');
  }

}
