import { Q3SET1, Q3SET2 } from './../../mock/mock-question3';
import { ServiceApiService } from './../../service/service-api.service';
import { Question3 } from './../../model/question3';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-level3',
  templateUrl: './level3.page.html',
  styleUrls: ['./level3.page.scss'],
})
export class Level3Page implements OnInit {

  quiz: Question3[];
  problem: any;
  status = '';
  score = 0;
  random = 0;
  uid: string;
  userlist: any;

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
  chk_img_q: boolean = true;

  constructor(private route: Router, private myapi: ServiceApiService, private alertCtrl: AlertController) {
    this.uid = localStorage.getItem('uid');
    let q = localStorage.getItem('quiz3');
    this.quiz = JSON.parse(q);
    console.log(this.quiz);
    this.problem = this.quiz[0].quiz;
    console.log('problem =', this.problem);
    // *ngIf="problem[0].option1[0] !== 'h' else Img" 

    if (this.problem[0].option1[0] != 'h') {
      this.chk_img_q = false;
      console.log('h = false');

    } else {
      this.chk_img_q = true;
      console.log('h = true');
    }

  }

  ngOnInit() {
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
    if (this.problem[i].answer === this.status) {
      if (this.problem[i].txt.slice(0, 1) != 'h') {
        this.correct(this.problem[i].txt);
      } else {
        this.correct_img(this.problem[i].txt);
      }
      this.std.state3 += 1;
      console.log('score =', this.std.state3);
    } else {
      // console.log("slice = ",this.problem[i].txt.slice(0,1));

      if (this.problem[i].txt.slice(0, 1) != 'h') {
        console.log('text ');
        this.result_was_wrong(this.problem[i].txt);

      } else {
        console.log('img alert');
        this.resule_was_wrong_img(this.problem[i].txt);
      }
      this.std.state3 += 0;
      console.log('score =', this.std.state3);
      // console.log('txt = ',this.problem[i].txt);

    }

    let u = this.std.state3;
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

    if (this.std.state3 > this.userlist[index].mystate3) {
      let newrecord = {};
      newrecord['state3'] = this.std.state3;
      newrecord['total'] = this.userlist[index].mystate1 + this.userlist[index].mystate2 + this.std.state3;
      this.myapi.updateData(this.userlist[index].id, newrecord); // update
      console.log(newrecord);
    }

    if (url === 'chooes-level') {
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        this.quiz = Q3SET1;
        localStorage.setItem('quiz', Q3SET1 + '');
      } else if (this.random === 2) {
        this.quiz = Q3SET2;
        localStorage.setItem('quiz', Q3SET2 + '');
      }
      console.log('quiz =', this.quiz);
      this.route.navigate([`${url}`]);
    } else if (url === 'level3') {

      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd3 =', this.random);

      if (this.random === 1) {
        this.quiz = Q3SET1;
        localStorage.setItem('quiz', Q3SET1 + '');
      } else if (this.random === 2) {
        this.quiz = Q3SET2;
        localStorage.setItem('quiz', Q3SET2 + '');
      }
      console.log('quiz =', this.quiz);

      this.route.navigate([`${url}`]);
    } else if (url === 'level2') {
      // this.random = Math.floor(Math.random() * 2) + 1;
      // console.log('rd =', this.random);
      // if (this.random === 1) {
      //   this.quiz = SET1;
      //   localStorage.setItem('quiz', SET1 + '');
      // } else if (this.random === 2) {
      //   this.quiz = SET2;
      //   localStorage.setItem('quiz', SET2 + '');
      // }
      // console.log('quiz =', this.quiz);
      this.route.navigate([`${url}`]);
    }
  }

  async correct_img(mes_img) {
    let alert = await this.alertCtrl.create({
      header: 'ยินดีด้วย',
      subHeader: 'คุณตอบถูก',
      message: `<img src="${mes_img}" alt="g-maps" style="border-radius: 2px">`,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {

            if (this.problem.length > 1) {
              this.problem.splice(0, 1);
              console.log('เข้า if');
              console.log('count =', this.problem.length);
              console.log('catd =', this.problem);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            } else {
              this.quiz.splice(0, 1);
              if (this.quiz.length > 0) {
                this.problem = this.quiz[0].quiz;

              }
              console.log('เข้า else');
              console.log('quiz =', this.quiz);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            }
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ], backdropDismiss: false
    });
    await alert.present();
  }
  async correct(mes) {
    let alert = await this.alertCtrl.create({
      header: 'ยินดีด้วย',
      subHeader: 'คุณตอบถูก',
      message: mes,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {

            if (this.problem.length > 1) {
              this.problem.splice(0, 1);
              console.log('เข้า if');
              console.log('count =', this.problem.length);
              console.log('catd =', this.problem);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            } else {
              this.quiz.splice(0, 1);
              if (this.quiz.length > 0) {
                this.problem = this.quiz[0].quiz;

              }
              console.log('เข้า else');
              console.log('quiz =', this.quiz);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            }
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ], backdropDismiss: false
    });
    await alert.present();
  }

  async resule_was_wrong_img(txt_img) {
    let alert = await this.alertCtrl.create({
      header: 'คุณตอบผิด',
      subHeader: 'เฉลย',
      message: `<img src="${txt_img}" alt="g-maps" style="border-radius: 2px">`,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          handler: () => {

            if (this.problem.length > 1) {
              this.problem.splice(0, 1);
              console.log('เข้า if');
              console.log('count =', this.problem.length);
              console.log('catd =', this.problem);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            } else {
              this.quiz.splice(0, 1);
              if (this.quiz.length > 0) {
                this.problem = this.quiz[0].quiz;

              }
              console.log('เข้า else');
              console.log('quiz =', this.quiz);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            }
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],
      backdropDismiss: false

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
          text: 'OK',
          role: 'ok',
          handler: () => {

            if (this.problem.length > 1) {
              this.problem.splice(0, 1);
              console.log('เข้า if');
              console.log('count =', this.problem.length);
              console.log('catd =', this.problem);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            } else {
              this.quiz.splice(0, 1);
              if (this.quiz.length > 0) {
                this.problem = this.quiz[0].quiz;

              }
              console.log('เข้า else');
              console.log('quiz =', this.quiz);
              this.status = '';
              if (this.problem[0].option1[0] != 'h') {
                this.chk_img_q = false;
                console.log('h = false');

              } else {
                this.chk_img_q = true;
                console.log('h = true');
              }
            }
            this.status = '';
            // console.log('Cancel clicked');
          }
        }
      ],
      backdropDismiss: false

    });
    await alert.present();
  }

}
