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

  constructor(private route: Router, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  signin() {
    console.log(this.std);
    this.afAuth.signInWithEmailAndPassword(this.std.username + '@gmail.com', this.std.password)
      .then((res) => {
        this.afAuth.authState.subscribe(auth => {
          if (auth != null) {
            localStorage.setItem('uid', auth.uid);
          } else {
            console.log('logouted!');
          }
        });
        this.route.navigateByUrl('/chooes-level');
      })
      .catch((error) => {
        console.log('Errror : ');
        console.log(error);
      });
  }

}
