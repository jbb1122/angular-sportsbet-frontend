import { Component, OnInit } from '@angular/core';

import { 
  AppService, 
  HttpResponseInterface, 
  Sport,
  BetEventItem } from '../../../app.service';

@Component({
  selector: 'app-home-live-bets',
  templateUrl: './home-live-bets.component.html',
  styleUrls: [
    './home-live-bets.component.css',
    '../home.component.css'
  ],
  providers: [AppService]
})
export class HomeLiveBetsComponent implements OnInit {
  // liveSports: object[];
  data: HttpResponseInterface;
  error: any;
  sport: Sport;
  allEvents: BetEventItem[];

  public markets = [];
  public liveSports = [];
  public activeSport = 0;
  public today = "";

  constructor(private appService: AppService) { 
    this.allEvents = [];
  }

  ngOnInit(): void {
    this.liveSports = [
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

    this.getSport(this.liveSports[0].id);
  }

  getSport(sportId) {
    this.appService.getSport(sportId, {})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.sport = this.data.data;
          this.getEvents(this.sport.id);
        }
      },
      error => this.error = error);
  }

  getMarketsBySportId(sport_id) {
    this.appService.getMarketsBySportId(sport_id)
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          console.log(this.data.data);
        }
      },
      error => this.error = error);
  }

  getMarkets(event_ids) {
    this.appService.getMarkets({event_ids: event_ids.join(",")})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.markets = this.data.data;
        }
      },
      error => this.error = error);
  }

  getEvents(sportId) {
    this.activeSport = sportId;
    this.allEvents = [];
    let params = {state: 'live', sport_id: undefined, limit: 10};
    if(sportId != "other")
    {
      params.sport_id = sportId;
    }
    else
    {
      delete params.sport_id;
    }
    this.appService.getEvents(params)
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.allEvents = this.data.data.slice(0, 10);
          var ids = [];
          this.markets = [];
          for(var i = 0;i < this.allEvents.length;i ++)
          {
            for(var j = 0;j < this.allEvents[i].featured_markets.length;j ++)
            {
              if(ids.indexOf(this.allEvents[i].featured_markets[j].market_type.id) == -1)
              {
                ids.push(this.allEvents[i].featured_markets[j].market_type.id);
                this.markets.push(this.allEvents[i].featured_markets[j]);
              }
            }
          }
          console.log(this.markets);
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
