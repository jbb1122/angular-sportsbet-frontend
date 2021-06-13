import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { 
  AppService, 
  HttpResponseInterface, 
  Sport,
  Region,
  League,
  BetEventItem} from '../../app.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: [
                '../../shared/layout/layout.component.css',
                '../../shared/sports-list/sports-list.component.css',
                './event.component.css', 
              ]
})
export class EventComponent implements OnInit {
  data: HttpResponseInterface;
  sportId: number;
  regionId: number;
  leagueId: number;
  eventId: number;
  sport: Sport;
  region: Region;
  league: League;
  error: any;
  pathNames  : object[];
  allEvents: BetEventItem[];
  currentEvent: BetEventItem;

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
    this.regionId   = this.actRoute.snapshot.params.region_id;
    this.leagueId   = this.actRoute.snapshot.params.league_id;
    this.eventId   = this.actRoute.snapshot.params.event_id;
  }

  ngOnInit(): void {
    this.pathNames = [
      {
        text: "HOME",
        link: "/"
      }];
      this.appService.getSport(this.sportId, {with_regions_and_leagues: true})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.sport = this.data.data;

          this.pathNames.push({
            text: this.sport.name.toUpperCase(),
            link: "/sport/" + this.sport.id
          });

          this.region = this.sport.regions.filter(region => (region.id == this.regionId))[0];
          this.league = this.region.leagues.filter(league => (league.id == this.leagueId))[0];
          
          this.pathNames.push({
            text: this.region.name.toUpperCase()
          });

          this.pathNames.push({
            text: this.league.name.toUpperCase()
          });

          this.getEvents(this.sport.id);
        }
      },
      error => this.error = error);

    this.getCurrentEvent(this.eventId);

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

  getEvents(sportId) {
    this.activeSport = sportId;
    let me = this;
    this.allEvents = [];
    this.appService.getEvents({})
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

    this.getMarkets(sportId);
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

  getCurrentEvent(eventId): void {
    this.appService.getEvent({})
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.currentEvent = this.data.data;
          
          this.pathNames.push({
            text: this.currentEvent.name.toUpperCase()
          });

        }
      },
      error => this.error = error);
  }
}
