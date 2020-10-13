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
  // quiz: string;

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

    this.lodeData();

    // this.quiz = localStorage.getItem('quiz');
    // console.log('quiz1 =', this.quiz);
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
      console.log(this.userlist);
    });
  }

  lodeData() {
    this.random = Math.floor(Math.random() * 2) + 1;
    console.log('rd =', this.random);
    if (this.random === 1) {
      this.quiz = QUESTION1;
    } else if (this.random === 2) {
      this.quiz = QUESTION2;
    }
    console.log('quiz =', this.quiz);
  }

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
        this.quiz = QUESTION1;
        // localStorage.setItem('quiz', QUESTION1 + '');
      } else if (this.random === 2) {
        this.quiz = QUESTION2;
        // localStorage.setItem('quiz', QUESTION2 + '');
      }
      this.route.navigateByUrl(`/${url}`);
      console.log('quiz =', this.quiz);

    }else if (url ===  'level2'){
      this.random = Math.floor(Math.random() * 2) + 1;
      console.log('rd =', this.random);
      if (this.random === 1) {
        this.quiz = QUESTION1;
        // localStorage.setItem('quiz', QUESTION1 + '');
      } else if (this.random === 2) {
        this.quiz = QUESTION2;
        // localStorage.setItem('quiz', QUESTION2 + '');
      }
      console.log('quiz =', this.quiz);
      this.route.navigateByUrl(`/${url}`);

    }else{
      console.log('error');
    }
  }

  // routelink(url){
  //   if(url == '/level2')
  // }

}
