import { Component, OnInit } from '@angular/core';
import { QUESTION } from 'src/app/mock/mock-question';
import { Question } from 'src/app/model/question';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {

  cards: Question[] = QUESTION;
  randomCard: Question[] = [];
  status = '';
  score = 0;

  constructor() { }

  ngOnInit() {
    let rd = Math.floor(Math.random() * this.cards.length);
    this.randomCard.push(this.cards[rd]);
    console.log('cards0 = ', this.cards[rd].id);
    for (let index = 1; index < 100; index++) {
      if (this.randomCard.length === 5) {
        console.log('random = ', this.randomCard);
        break;
      } else {
        let rd = Math.floor(Math.random() * this.cards.length);
        console.log(this.randomCard.findIndex(std=> std.id === this.cards[rd].id) === -1);
        console.log(this.randomCard.findIndex(std=> std.id === this.cards[rd].id));
        if (this.randomCard.findIndex(std=> std.id === this.cards[rd].id) !== -1) {
          console.log('ไม่ต้อง push');
        } else {
          this.randomCard.push(this.cards[rd]);
        }
      }
    }
  }

  onCheck(str: string) {
    console.log('*****************');
    this.status = str;
    console.log(this.status);
  }

  next(i) {
    console.log('OK status:', this.status);
    if (this.randomCard[i].answer === this.status) {
      this.score += 1;
      console.log('score =', this.score);
    } else {
      this.score += 0;
      console.log('score =', this.score);
    }
    this.randomCard.splice(0, 1);
    console.log('count =', this.randomCard.length);
    console.log('catd =', this.randomCard);
    this.status = '';
  }

}


