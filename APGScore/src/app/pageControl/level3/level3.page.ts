import { ServiceApiService } from './../../service/service-api.service';
import { Question3 } from './../../model/question3';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route: Router, private myapi: ServiceApiService) {
    this.uid = localStorage.getItem('uid');
    console.log('uid = ' + this.uid);

    // this.lodeData();
    // console.log('data:', this.lodeData());

    let q = localStorage.getItem('quiz3');
    this.quiz = JSON.parse(q);
    this.problem = this.quiz[0].quiz;
    console.log('quiz =', this.quiz[0].quiz);
    console.log(JSON.parse(q));
  }

  ngOnInit() {
  }

  onCheck(str: string) {
    console.log('*****************');
    this.status = str;
    console.log(this.status);
  }

  next(i) {
    console.log('OK status:', this.status);
    if (this.problem[i].answer === this.status) {
      this.std.state3 += 1;
      console.log('score =', this.std.state3);
    } else {
      this.std.state3 += 0;
      console.log('score =', this.std.state3);
    }
    // this.problem.splice(0, 1);
    if (this.problem.length > 1) {
      this.problem.splice(0, 1);
    } else {
      this.quiz.splice(0, 1);
    }
    console.log('count =', this.problem.length);
    console.log('catd =', this.problem);
    this.status = '';


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

}
