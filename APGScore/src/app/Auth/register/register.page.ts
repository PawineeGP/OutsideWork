import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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

  constructor(
    private route: Router,
    public afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private afStore: AngularFirestoreModule,
    private myapi: ServiceApiService
  ) { }

  ngOnInit() {
  }
  signup() {
    console.log(this.std);

    this.afAuth.createUserWithEmailAndPassword(this.std.stdCode + '@gmail.com', this.std.password)
      .then(() => {
        this.afAuth.authState.subscribe(auth => {
          localStorage.setItem('uid', auth.uid);
          let record = {};
          record['UID'] = auth.uid;
          record['id'] = this.std.stdCode;
          record['name'] = this.std.username;
          record['surname'] = this.std.lastname;
          record['state1'] = this.std.state1;
          record['state2'] = this.std.state2;
          record['state3'] = this.std.state3;
          record['total'] = this.std.total;
          this.myapi
            .createData(record)
            .then(() => {
              this.route.navigateByUrl('chooes-level');
            })
            .catch(error => {
              console.log(error);
            }
            );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
