import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { QUESTION1, QUESTION2 } from './../../mock/mock-question';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    state1: 0,
    state2: 0,
    state3: 0,
    total: 0
  };
  total_: any;
  total_ori: any;
  constructor(private route: Router, private myapi: ServiceApiService, private alertCtrl: AlertController) {
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

  onCheck(str: string) {
    console.log('*****************');
    this.status = str;
    console.log(this.status);
  }

  next(i) {
    console.log('OK status:', this.status);
    if (this.quiz[i].answer === this.status) {
      this.correct();
      this.std.state1 += 1;
      console.log('score =', this.std.state1);
     
    } else {
      this.result_was_wrong(this.quiz[i].txt);
      this.std.state1 += 0;
      console.log('score =', this.std.state1);
      console.log(this.quiz[i].txt);
      
     
    }
    // this.quiz.splice(0, 1);
    // console.log('count =', this.quiz.length);
    // console.log('catd =', this.quiz);
    // this.status = '';


    let u = this.std.state1;
    console.log("u =");
    console.log(u);

    this.total_ori = u;
    if (u == 10) {
      this.total_ = u + 90;
    } else if (u == 5) {
      this.total_ = u + 45;
      console.log('15' + this.total_);

    } else if (u == 1) {
      this.total_ = u + 30;
    } else if (u <= 5 && u > 1) {
      this.total_ = u + 15;
    } else if (u <= 10 && u > 5) {
      this.total_ = u + 80;
    } else if (u < 1 && u > 0) {
      this.total_ = u + 30;
    } else if (u == 0) {
      this.total_ = u;
    }

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

    if (url === 'chooes-level') {
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
      this.route.navigate([`${url}`]);
    } else if (url === 'level2') {
      this.route.navigate([`${url}`]);
    } else if (url === 'level1') {
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
      this.route.navigate([`${url}`]);
    }
  }

  async correct() {
    let alert = await this.alertCtrl.create({
      header: 'ยินดีด้วย',
      subHeader: 'คุณตอบถูก',
      message: 'This is an alert message.',
      buttons: [
        {
          text:'OK',
          role:'ok',
          handler: () => {
            this.quiz.splice(0, 1);
            console.log('count =', this.quiz.length);
            console.log('catd =', this.quiz);
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],
    });
    await alert.present();
  }

  async result_was_wrong(txt) {
    let alert = await this.alertCtrl.create({
      header: 'คุณตอบผิด',
      subHeader: 'เฉลย',
      message: txt,
      buttons: [
        {
          text:'OK',
          role:'ok',
          handler: () => {
            this.quiz.splice(0, 1);
            console.log('count =', this.quiz.length);
            console.log('catd =', this.quiz);
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],
     
    });
    await alert.present();
  }

}
