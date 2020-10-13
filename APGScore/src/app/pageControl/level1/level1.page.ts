import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { QUESTION1, QUESTION2 } from './../../mock/mock-question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  quiz: Question[];
  status = '';
  score = 0;
  random = 0;
  uid: string;
  userlist: any;
  // quiz: any;

  std = {
    stdCode: '',
    username: '',
    lastname: '',
    password: '',
    state1 : 0,
    state2 : 0,
    state3 : 0,
    total : 0
  };

  constructor(private route: Router, private myapi: ServiceApiService) {
    this.uid = localStorage.getItem('uid');
    console.log('uid = ' + this.uid);

    // this.lodeData();
    // console.log('data:', this.lodeData());

    let q = localStorage.getItem('quiz');
    this.quiz = JSON.parse(q);
    console.log('quiz =', this.quiz[0].problem, 'ans =', this.quiz[0].answer);
    console.log(JSON.parse(q));
  }

  ngOnInit() {
    // read data from database
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          mystate1: e.payload.doc.data()['state1'.toString()],
          mystate2: e.payload.doc.data()['state2'.toString()],
          mystate3: e.payload.doc.data()['state3'.toString()],
          mytotal: e.payload.doc.data()['total'.toString()]
        };
      });
      console.log('userlist =', this.userlist);
    });
  }

  // lodeData() {
  //   this.random = Math.floor(Math.random() * 2) + 1;
  //   console.log('rd =', this.random);
  //   if (this.random === 1) {
  //     this.quiz = QUESTION1;
  //     localStorage.setItem('quiz', QUESTION1 + '');
  //   } else if (this.random === 2) {
  //     this.quiz = QUESTION2;
  //     localStorage.setItem('quiz', QUESTION2 + '');
  //   }
  //   console.log('quiz =', this.quiz);
  // }

  onCheck(str: string) {
    console.log('*****************');
    this.status = str;
    console.log(this.status);
  }

  next(i) {
    console.log('OK status:', this.status);
    if (this.quiz[i].answer === this.status) {
      this.std.state1 += 1;
      console.log('score =', this.std.state1);
    } else {
      this.std.state1 += 0;
      console.log('score =', this.std.state1);
    }
    this.quiz.splice(0, 1);
    console.log('count =', this.quiz.length);
    console.log('catd =', this.quiz);
    this.status = '';
  }

  setScore(url: string) {
    console.log(url);
    let index = this.userlist.findIndex(std => std.myuid === this.uid);
    console.log('index:', index);
    if (this.std.state1 > this.userlist[index].mystate1) {
      let newrecord = {};
      newrecord['state1'] = this.std.state1;
      newrecord['total'] = this.std.state1 + this.userlist[index].mystate2 + this.userlist[index].mystate2;
      this.myapi.updateData(this.userlist[index].id, newrecord); // update
      console.log(newrecord);
    }

    if (url === 'chooes-level'){
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        // this.quiz = QUESTION1;
        localStorage.setItem('quiz', QUESTION1 + '');
      } else if (this.random === 2) {
        // this.quiz = QUESTION2;
        localStorage.setItem('quiz', QUESTION2 + '');
      }
      console.log('quiz =', this.quiz);
      this.route.navigateByUrl(`/${url}`);

    }else if (url ===  'level2'){
      this.route.navigateByUrl(`/${url}`);

    }else if (url ===  'level1') {
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        this.quiz = QUESTION1;
        localStorage.setItem('quiz', QUESTION1 + '');
      } else if (this.random === 2) {
        this.quiz = QUESTION2;
        localStorage.setItem('quiz', QUESTION2 + '');
      }
      console.log('quiz =', this.quiz);
      this.route.navigateByUrl(`/${url}`);
    }
  }

}

// code การเปลี่ยนปุ่ม เอาไปแทน ion-row เดิม
// <div *ngIf="std.state1 !== 0 else Replay">
//   <ion-row>
//     <ion-col>
//       <ion-button  color="primary" (click)="setScore('chooes-level')">
//         <ion-icon slot="end" name="home-outline"></ion-icon>
//         กลับหน้าหลัก
//       </ion-button>
//     </ion-col>

//     <ion-col>
//       <ion-button  color="primary" (click)="setScore('level2')" >
//         <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
//         ด่านต่อไป
//       </ion-button>
//     </ion-col>
//   </ion-row>
// </div>

// <ng-template #Replay>
//   <ion-row>
//     <ion-col>
//       <ion-button  color="primary" (click)="setScore('chooes-level')">
//         <ion-icon slot="end" name="home-outline"></ion-icon>
//         กลับหน้าหลัก
//       </ion-button>
//     </ion-col>

//     <ion-col>
//       <ion-button  color="primary" (click)="setScore('level1')" >
//         <ion-icon slot="end" name="chevron-forward-outline"></ion-icon>
//         เล่นอีกครั้ง
//       </ion-button>
//     </ion-col>
//   </ion-row>
// </ng-template>
