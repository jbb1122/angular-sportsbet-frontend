import { Component, OnInit } from '@angular/core';

import { 
  AppService, 
  HttpResponseInterface, 
  Sport,
  BetEvent } from '../../../app.service';

@Component({
  selector: 'app-home-important-welcomes',
  templateUrl: './home-important-welcomes.component.html',
  styleUrls: [
    './home-important-welcomes.component.css',
    '../home.component.css'
  ]
})
export class HomeImportantWelcomesComponent implements OnInit {
  // sports: object[];
  data: HttpResponseInterface;
  error: any;
  allHighlightEvents: BetEvent[];

  public markets = [];
  public sports = [];
  public activeSport = 0;
  public today = "";
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.sports = [
      {
        id: 1,
        name: "Football",
        type: "football"
      },
      {
        id: 4,
        name: "Tennis",
        type: "tennis",
      },
      {
        id: 3,
        name: "Basketball",
        type: "basketball",
      },
      {
        id: "other",
        name: "Other",
        type: "other"
      }
    ];

    let today = new Date();
    let y = today.getFullYear();
    let m = (today.getMonth() + 1) + '';
    let d = today.getDate() + '';
    m = (parseInt(m) > 9 ? m : '0' + m);
    d = (parseInt(d) > 9 ? d : '0' + d);
    this.today = d + "." + m + "." + y;
    this.today = "25.01.2021";

    this.getHightLightEvents(this.sports[0].id);
  }

  getMarkets(sportId) {
    this.appService.getMarkets(sportId)
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.markets = this.data.data;
        }
      },
      error => this.error = error);
  }

  getHightLightEvents(sportId) {
    this.activeSport = sportId;
    this.allHighlightEvents = [];
    let params = {state: 'live', sport_id: undefined, limit: 10};
    if(sportId != "other")
    {
      params.sport_id = sportId;
    }
    else
    {
      delete params.sport_id;
    }

    var ids = [];
    this.appService.getHighLights()
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.allHighlightEvents = this.data.data.events.slice(0, 10).filter((item, index) => {
            if(item.sport_id != sportId)
            {
              return false;
            }

            for(var j = 0;j < item.featured_markets.length;j ++)
            {
              if(ids.indexOf(item.featured_markets[j].market_type.id) == -1)
              {
                ids.push(item.featured_markets[j].market_type.id);
                this.markets.push(item.featured_markets[j]);
              }
            }
            return true;
          });
        }
      },
      error => this.error = error);
  }

  onChangeMarketOrder(marketId): void {
    let tmp = [];
    for(let i = 0;i < this.markets.length;i ++) {
      if(this.markets[i].id == marketId) {
        tmp.push(this.markets[i]);
        break;
      }
    }
    for(let i = 0;i < this.markets.length;i ++) {
      if(this.markets[i].id != marketId) {
        tmp.push(this.markets[i]);
      }
    }
    this.markets = tmp;
  }
}
