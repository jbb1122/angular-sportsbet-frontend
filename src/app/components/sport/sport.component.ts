import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  AppService, 
  HttpResponseInterface, 
  Sport,
  BetEventItem } from '../../app.service';

@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  data: HttpResponseInterface;
  sportId: number;
  sport: Sport;
  error: any;
  pathNames  : object[];
  allEvents: BetEventItem[];

  public markets = [];
  public liveSports = [];
  public activeSport = 0;
  public today = "";
  
  constructor(
      private actRoute: ActivatedRoute, 
      private appService: AppService
  ) {
    this.allEvents = [];
    this.sportId   = this.actRoute.snapshot.params.sport_id;
  }

  ngOnInit(): void {
    this.pathNames = [
      {
        text: "HOME",
        link: "/"
      }];
    
    this.appService.getSport(this.sportId, {})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.sport = this.data.data;

          this.pathNames.push({
            text: this.sport.name.toUpperCase(),
            link: "/sport/" + this.sport.id
          });

          this.pathNames.push({
            text: "NOW & NEXT"
          });

          this.getEvents(this.sport.id);
        }
      },
      error => this.error = error);

    // this.getCoupons();
      
    let today = new Date();
    let y = today.getFullYear();
    let m = (today.getMonth() + 1) + '';
    let d = today.getDate() + '';
    m = (parseInt(m) > 9 ? m : '0' + m);
    d = (parseInt(d) > 9 ? d : '0' + d);
    this.today = d + "." + m + "." + y;
    this.today = "25.01.2021";
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

  getCoupons() {
    this.appService.getCoupons({token: "21cbd9f5a0c990740fcd4d60af3b1514"})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data};
        if(this.data.code == 200) {
          console.log(this.data);
        }
      });
  }

  getEvents(sportId) {
    this.activeSport = sportId;
    let me = this;
    this.allEvents = [];
    this.appService.getEvents({sport_id: sportId, state: "early", limit: 20})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.allEvents = this.data.data.slice(0, 20);
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
        }
      },
      error => this.error = error);
  }

  clear() {
    this.data = undefined;
    this.error = undefined;
    this.sport = undefined;
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
