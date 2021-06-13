import { Component, OnInit } from '@angular/core';

import { AppService, HttpResponseInterface, League } from '../../app.service';

@Component({
  selector: 'app-top-leagues',
  templateUrl: './top-leagues.component.html',
  styleUrls: ['./top-leagues.component.css'],
  providers: [AppService]
})
export class TopLeaguesComponent implements OnInit {
  data: HttpResponseInterface;
  topLeagues: League[];
  error: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getHighLights()
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.topLeagues = this.data.data.leagues;
        }
      },
      error => this.error = error);
  }

  clear() {
    this.data = undefined;
    this.error = undefined;
    this.topLeagues = undefined;
  }

}
