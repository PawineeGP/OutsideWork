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

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private myapi: ServiceApiService
  ) { this.getDetail(); }

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
          myname: e.payload.doc.data()['name'.toString()],
          mysurname: e.payload.doc.data()['surname'.toString()],
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
    this.route.navigateByUrl('/level1');
  }

  state2(){
    this.route.navigateByUrl('/level2');

  }

  state3(){
    this.route.navigateByUrl('/level3');

  }

  viewScore(){
    this.route.navigateByUrl('/view-score');

  }

}
