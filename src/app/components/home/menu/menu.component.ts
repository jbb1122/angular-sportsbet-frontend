import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-menu',
  templateUrl: './menu.component.html',
  styleUrls: [
    './menu.component.css'
  ]
})
export class HomeMenuComponent implements OnInit {
  topSportMenus: object[];
  constructor() { }

  ngOnInit(): void {
    this.topSportMenus = [
      {
        id: 1,
        type: "football",
        name: "Football"
      },
      {
        id: 4,
        type: "tennis",
        name: "Tennis"
      },
      {
        id: 12,
        type: "basketball",
        name: "Basketball"
      },
      {
        id: 19,
        type: "volleyball",
        name: "Volleyball"
      },
      {
        id: 16,
        type: "ice-hockey",
        name: "Ice Hockey"
      }
    ]
  }

}
