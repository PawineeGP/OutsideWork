import { ServiceApiService } from './../../service/service-api.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-view-score',
  templateUrl: './view-score.page.html',
  styleUrls: ['./view-score.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ViewScorePage implements OnInit {


  public columns: any;
  public rows: any;
  tablestyle = ' bootstrap';
  userlist = [];

  constructor(private myapi: ServiceApiService) {

    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' }
    ];

    this.rows = [
      {
        "name": "Escape Room",
        "company": "Columbia Pictures",
        "genre": "Horror"
      },
      {
        "name": "Rust Creek",
        "company": "IFC Films",
        "genre": "Drama"
      },
      {
        "name": "American Hangman",
        "company": "Hangman Productions",
        "genre": "Thriller"
      },
      {
        "name": "The Upside",
        "company": "STX Entertainment",
        "genre": "Comedy"
      },
      {
        "name": "Replicas",
        "company": "Entertainment Studios",
        "genre": "Sci-Fi"
      },
      {
        "name": "After Darkness",
        "company": "Grindstone Group",
        "genre": "Drama"
      },
      {
        "name": "Glass",
        "company": "Universal Pictures",
        "genre": "Superhero"
      },
      {
        "name": "Close",
        "company": "Netflix",
        "genre": "Action"
      },
      {
        "name": "The Final Wish",
        "company": "BondIt Capital",
        "genre": "Horror"
      },
      {
        "name": "Serenity",
        "company": "Aviron Pictures",
        "genre": "Drama"
      },
      {
        "name": "Miss Bala",
        "company": "Columbia Pictures",
        "genre": "Thriller"
      },
      {
        "name": "Velvet Buzzsaw",
        "company": "Netflix",
        "genre": "Comedy"
      }
    ];
  }

  ngOnInit() {
    // read data from database
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
          mytotal: e.payload.doc.data()['total'.toString()],
        };
      });
      console.log('userlist =', this.userlist);
    });
  }

}
