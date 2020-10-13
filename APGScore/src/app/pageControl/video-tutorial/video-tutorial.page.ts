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
  constructor() {
      
   }
  

<<<<<<< HEAD
  setCurrentTime(data) {
    // console.log("data");
    
    // console.log(data);
    
     this.currentTime = data.target.currentTime;
     console.log("current Time :");
     console.log(this.currentTime);
    
     if(this.currentTime >= 115.686231){
      console.log("Button show");
      this.chk_btn = true;      
    }else if(!this.currentTime){
      this.chk_btn = false;  
    }else{
      this.chk_btn = false; 
    }
     
  }
=======
  constructor(private route: Router, public afAuth: AngularFireAuth) { }

>>>>>>> bf351d35f51a9d5123606f55f7eafbebeeabb734
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
