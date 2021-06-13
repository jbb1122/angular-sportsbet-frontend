import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService, BetEventItem, HttpResponseInterface, League, Region, Sport } from 'src/app/app.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  regionId   : number;
  sportId    : number;
  leagueId   : number;

  data: HttpResponseInterface;
  allLeagueEvents: any[];
  allTeamEvents: any[];
  sport: Sport;
  region: Region;
  league: League;
  error: any;
  pathNames  : object[];

  public markets = [];
  public liveSports = [];
  public activeSport = 0;
  
  constructor(
    private actRoute: ActivatedRoute, 
    private appService: AppService) {
    this.regionId = this.actRoute.snapshot.params.region_id;
    this.sportId   = this.actRoute.snapshot.params.sport_id;
    this.leagueId  = this.actRoute.snapshot.params.league_id;

    this.allLeagueEvents = [];
    this.allTeamEvents = [];
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

            this.pathNames.push({
              text: "COMPETITIONS",
              link: "/sport/" + this.sportId
            });

            this.pathNames.push({
              text: this.region.name.toUpperCase(),
              link: "/competitions/" + this.sportId + "/" + this.regionId
            });

            if(this.leagueId)
            {
              this.league = this.region.leagues.filter(league => (league.id == this.leagueId))[0];
              this.pathNames.push({
                text: this.league.name.toUpperCase()
              });
            }
  
            this.getEvents(this.sport.id, "league|date");
          }
        },
        error => this.error = error);
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

  getEvents(sportId, group_by) {
    this.activeSport = sportId;
    this.allLeagueEvents = [];
    this.allTeamEvents = [];
    var cond = {
      sport_id: sportId, 
      region_id: this.regionId, 
      league_id: this.leagueId, 
      containing_match_result_odds: true,
      group_by: group_by,
      limit: 20, 
      state: "early"};

    if(!this.regionId)
    {
      delete cond.region_id;
    }

    if(!this.leagueId)
    {
      delete cond.league_id;
    }
    this.appService.getEvents(cond)
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          var allEvents = this.data.data.slice(0, 20);
          var ids = [];
          this.markets = [];
          
          if(group_by == "league|date")
          {
            for(var i = 0;i < allEvents.length;i ++)
            {
              for(var j = 0;j < allEvents[i].events.length;j ++)
              {
                for(var k = 0;k < allEvents[i].events[j].events.length;k ++)
                {
                  for(var l = 0;l < allEvents[i].events[j].events[k].featured_markets.length;l ++)
                  {
                    if(ids.indexOf(allEvents[i].events[j].events[k].featured_markets[l].market_type.id) == -1)
                    {
                      ids.push(allEvents[i].events[j].events[k].featured_markets[l].market_type.id);
                      this.markets.push(allEvents[i].events[j].events[k].featured_markets[l]);
                    }
                  }
                }
              }
            }
            this.allLeagueEvents = allEvents;
          }
          else
          {
            for(var i = 0;i < allEvents.length;i ++)
            {
              for(var j = 0;j < allEvents[i].events.length;j ++)
              {
                  for(var l = 0;l < allEvents[i].events[j].featured_markets.length;l ++)
                  {
                    if(ids.indexOf(allEvents[i].events[j].featured_markets[l].market_type.id) == -1)
                    {
                      ids.push(allEvents[i].events[j].featured_markets[l].market_type.id);
                      this.markets.push(allEvents[i].events[j].featured_markets[l]);
                    }
                  }
              }
            }

            this.allTeamEvents = allEvents;
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
