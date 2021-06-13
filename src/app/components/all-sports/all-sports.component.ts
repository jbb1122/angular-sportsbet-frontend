import { Component, OnInit } from '@angular/core';
import { AppService, HttpResponseInterface, Sport } from '../../app.service';

@Component({
  selector: 'app-all-sports',
  templateUrl: './all-sports.component.html',
  styleUrls: ['./all-sports.component.css'],
  providers: [AppService]
})
export class AllSportsComponent implements OnInit {
  data: HttpResponseInterface;
  sports: Sport[];
  error: any;
  pathNames  : object[];

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.pathNames = [
      {
        text: "HOME",
        link: "/"
      }, 
      {
        text: "ALL SPORTS"
      }];

    this.appService.getSports()
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.sports = this.data.data;
        }
      },
      error => this.error = error);
  }

  clear() {
    this.data = undefined;
    this.error = undefined;
    this.sports = undefined;
  }
}
