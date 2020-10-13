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
  ngOnInit() {
   
  }

}
