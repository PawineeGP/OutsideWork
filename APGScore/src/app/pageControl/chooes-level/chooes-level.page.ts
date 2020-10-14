import { QUESTION1, QUESTION2 } from './../../mock/mock-question';
import { Question } from './../../model/question';
import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chooes-level',
  templateUrl: './chooes-level.page.html',
  styleUrls: ['./chooes-level.page.scss'],
})
export class ChooesLevelPage implements OnInit {

  userEmail: string;
  userlist: any;
  isAdmin: string;

  quiz: Question[];
  random = 0;
  total_:any;
  total_ori:any;

  chk_admin: boolean = true;
  ScoreState1;
  ScoreState2;
  chk_scoreState1:boolean;
  chk_scoreState2:boolean;
  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private myapi: ServiceApiService
  ) { this.getDetail();
    if(this.isAdmin == 'admin@gmail.com'){
      this.chk_admin = true;
    }else{
      this.chk_admin = false;
    } }

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

  getDetail(){
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          myid: e.payload.doc.data()['id'.toString()],
          mystate1: e.payload.doc.data()['state1'.toString()],
          mystate2: e.payload.doc.data()['state2'.toString()],
          mystate3: e.payload.doc.data()['state3'.toString()],
          myname: e.payload.doc.data()['name'.toString()],
          mysurname: e.payload.doc.data()['surname'.toString()],
          mytotal:e.payload.doc.data()['total']
        };
      });
     
      console.log(this.userlist);
      let uid = localStorage.getItem('uid');
      console.log('uid:', uid);
      let index = this.userlist.findIndex(std => std.myuid === uid);
      console.log(`index: ${index}`);
      let name = this.userlist[index].myname;
      console.log(name);
      let lastname = this.userlist[index].mysurname;
      console.log(lastname);
      this.userEmail = name + ' ' + lastname;      
      


     let u = this.userlist[index].mytotal;
     

      console.log(u);
      if(u == 30){
          this.total_ = u+70;
      }else if(u == 15){
        this.total_ = u+35;
        console.log('15'+ this.total_);
        
     }else if(u == 10){
        this.total_ = 10+15;
     }else if( u <= 15 && u >10){
       this.total_ =  u + 30;
     }else if( u<=30 && u >15){
          this.total_= u+60;
     }else if (u < 10 && u > 0){
          this.total_ = u+12;
     }else if (u == 0){
       this.total_ = u;
     }

      this.total_ori = u;
      console.log(this.total_ );
      this.ScoreState1 = this.userlist[index].mystate1;
      console.log('score 1st =', this.ScoreState1);
      this.ScoreState2 = this.userlist[index].mystate2;
      console.log('score 2nd =', this.ScoreState2);
      
      this.afAuth.user.subscribe((res) => {
        if (res != null){
          this.isAdmin = res.email;       
          
        }else{
          console.log('logouted!');
        }
      }, (error) => {
        console.log(error);
      });
    });
  }

  state1(){
    this.random = Math.floor(Math.random() * 2) + 1;
    console.log('rd =', this.random);
    if (this.random === 1) {
      // this.quiz = QUESTION1;
      localStorage.setItem('quiz', JSON.stringify(QUESTION1) + '');
    } else if (this.random === 2) {
      // this.quiz = QUESTION2;
      localStorage.setItem('quiz', JSON.stringify(QUESTION2) + '');
    }
    console.log('QuIz =', this.quiz);
    this.route.navigateByUrl('/level1');
  }

  state2(){
    this.route.navigateByUrl('/level2');

  }

  state3(){
    this.route.navigateByUrl('/level3');

  }

  viewScore(){
    // this.route.navigateByUrl('/view-score');

  }

}

// code disable ด่าน เอาไปแทนบรรทัดที่ 11-17
// <div id="choose_level" *ngIf="isAdmin !== 'admin@gmail.com' else admin" >
//   <ion-button  size="large" type="submit" expand="block" (click)="state1()">ด่านที่ 1</ion-button>
//   <div class="spacer" style="width: 300px; height: 10px;"></div>
//   <ion-button  size="large" type="submit" expand="block" (click)="state2()" [disabled]="ScoreState1 === 0">ด่านที่ 2</ion-button>
//   <div class="spacer" style="width: 300px; height: 10px;"></div>
//   <ion-button  size="large" type="submit" expand="block" (click)="state3()" [disabled]="ScoreState1 === 0 || ScoreState2 === 0">ด่านที่ 3</ion-button>
// </div>
