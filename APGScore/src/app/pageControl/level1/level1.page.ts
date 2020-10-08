import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question';
import { QUESTION1, QUESTION2 } from './../../mock/mock-question';

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

  constructor() { }

  ngOnInit() {
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
      this.score += 1;
      console.log('score =', this.score);
    } else {
      this.score += 0;
      console.log('score =', this.score);
    }
    this.quiz.splice(0, 1);
    console.log('count =', this.quiz.length);
    console.log('catd =', this.quiz);
    this.status = '';
  }

}
