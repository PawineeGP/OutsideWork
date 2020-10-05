import { Component, OnInit } from '@angular/core';
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

  }
  constructor(private route:Router) { }

  ngOnInit() {
  }
  signin(){
    this.route.navigate(['/chooes-level']);
  }

}
