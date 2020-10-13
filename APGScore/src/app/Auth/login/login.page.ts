import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  std = {
    username: '',
    password: ''
  };

  userlist: any;

  constructor(private route: Router, public afAuth: AngularFireAuth, private myapi: ServiceApiService,) { }

  ngOnInit() {
    this.myapi.Readdata().subscribe(data => {
      this.userlist = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          myuid: e.payload.doc.data()['UID'.toString()],
          myid: e.payload.doc.data()['id'.toString()],
          myname: e.payload.doc.data()['name'.toString()],
          mysurname: e.payload.doc.data()['surname'.toString()],
          mystate1: e.payload.doc.data()['state1'.toString()],
          mystate2: e.payload.doc.data()['state2'.toString()],
          mystate3: e.payload.doc.data()['state3'.toString()],
          mytotal: e.payload.doc.data()['total'.toString()]
        };
      });
      console.log('userlist =', this.userlist);
    });
  }
  signin() {
    console.log(this.std);
    this.afAuth.signInWithEmailAndPassword(this.std.username + '@gmail.com', this.std.password)
      .then((res) => {
        this.afAuth.authState.subscribe(auth => {
          if (auth != null) {
            localStorage.setItem('uid', auth.uid);
            let index = this.userlist.findIndex(std => std.myuid === auth.uid);
            if (this.userlist[index].mystate1 !== 0 || this.userlist[index].mystate2 !== 0 || this.userlist[index].mystate3 !== 0) {
              this.route.navigateByUrl('/chooes-level');
            } else if (this.userlist[index].mystate1 === 0 || this.userlist[index].mystate2 === 0 || this.userlist[index].mystate3 === 0) {
              this.route.navigateByUrl('/video-tutorial');
            }
          } else {
            console.log('logouted!');
          }
        });
      })
      .catch((error) => {
        console.log('Errror : ');
        console.log(error);
      });
  }

}
