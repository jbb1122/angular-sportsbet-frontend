import { 
    Inject, 
    Injectable, 
    InjectionToken  
} from '@angular/core';
import { 
    HttpClient, 
    HttpHeaders,
    HttpErrorResponse, 
    HttpResponse 
} from '@angular/common/http';

import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from './../environments/environment';
import { CommonData } from './common/global-constants';

export interface League {
    id: number,
    name: string,
    is_active: boolean,
    is_live_active: boolean,
    sport_id: number,
    region_id: number,
    type: string,
    sport: Sport,
    region: Region
}
export interface Region {
    id: number,
    name: string,
    is_active: boolean,
    is_live_active: boolean,
    priority: boolean,
    type: string,
    leagues: League[]
}
export interface Sport {
    id: number,
    name: string,
    is_active: boolean|null|undefined,
    is_live_active: boolean|null|undefined,
    regions_count: number|null|undefined,
    events_count: number|null|undefined,
    type: string,
    featured_market_odds_count: number|null|undefined,
    regions: Region[]|undefined
}
export interface TopLeagues {
    leagues: League[],
    sports: Sport[]
}
export interface TeamPivot {
    event_id: number,
    team_id: number,
    is_home: boolean
}
export interface Team {
    id: number,
    name: string,
    is_active: number,
    pivot: TeamPivot
}
export interface Stats {
    score: string,
    event_time_utc: string,
    current_minute: number,
    length: number,
    info: string,
    current_period: number,
    period_count: number,
    period_length: number|null,
    set_count: number|null,
    corner_score: string,
    red_card_score: number|null,
    yellow_card_score: number|null,
    shoot_on_target_score: string,
    shoot_off_target_score: string,
    dangerous_attack_score: string,
    penalty_score: string,
    free_kick_score: string,
    aces_score: number|null,
    extra_time_score: number|null,
    double_fault_score: number|null,
    period_score: number|null,
    game_score: number|null,
    additional_minutes: number,
    is_canceled: number|null,
    is_timeout: number|null,
    side: number|null,
    server: number,
    remaining_time: string|null,
    set1_yellow_card_score: string,
    set2_yellow_card_score: string,
    set1_corner_score: string,
    set2_corner_score: string,
    set1_red_card_score: string,
    set2_red_card_score: string,
    home_shirt_color: string| "000000",
    away_shirt_color: string| "000000",
    home_shorts_color: string| "000000",
    away_shorts_color: string| "000000",
    set_score: number|null,
    set_scores: string[],
    is_second_half: false
}
export interface MarketType {
    id: number,
    kind: string,
    is_handicap: boolean,
    is_over_under: boolean,
    is_active: boolean,
    odds_count: number,
    is_dynamic: boolean|null,
    type: number,
    priority: number
    name: string,
    sport_id: number
}
export interface OddType {
    id: number,
    name: string,
    kind: string,
    is_active: boolean,
    priority: number,
    market_type_id: number
}
export interface Odd {
    id: number,
    name: string,
    price: number,
    handicap: string,
    is_suspended: boolean,
    outcome: number,
    home_value: number|null,
    away_value: number|null,
    home_team: string,
    away_team: string,
    is_active: boolean,
    odd_type_id: number,
    sport_id: number,
    region_id: number,
    league_id: number,
    event_id: number,
    market_id: number,
    outcome_name: string,
    is_counter: boolean,
    odd_type: OddType
}
export interface FeaturedMarket {
    id: number,
    is_cash_out_available: boolean,
    is_suspended: boolean,
    handicap: number,
    sequence: number,
    point_sequence: number,
    home_score: number|null,
    away_score: number|null,
    is_active: number,
    sport_id: number,
    region_id: number,
    league_id: number,
    event_id: number,
    featured_event_id: number,
    market_type_id: number,
    name: string,
    type: number,
    odds_count: number,
    priority: number,
    is_over_under: boolean,
    is_handicap: boolean,
    market_type: MarketType,
    odds: Odd[]
}
export interface BetEventItem {
    id: number,
    status: number,
    live_status: number,
    start_at: string,
    is_active: boolean,
    is_live_active: boolean,
    is_started: boolean,
    is_live: boolean,
    sport_id: number,
    region_id: number,
    league_id: number,
    markets_count: number,
    name: string,
    home_team: Team,
    away_team: Team,
    live_status_name: string,
    status_name: string,
    start_at_date: string,
    start_at_hour: string,
    live_animation_url: string|null,
    stats: Stats,
    teams: Team[],
    sport: Sport,
    region: Region,
    league: League,
    featured_markets: FeaturedMarket[]
}
export interface BetEventData {
    date: string,
    sport: Sport,
    events: BetEventItem[]
}
export interface BetEvent {
    nodes: {
        sport: Sport,
        region: Region,
        league: League
    },
    events: BetEventData[]
}
export interface HttpResponseInterface {
    data: any,
    message: string,
    code: number
}

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
    providedIn: 'root',
    factory: () => localStorage
});

@Injectable({
    providedIn: 'root'
})
export class AppService {
    public urls = {
        highlights: environment.apiURL + "/highlights",
        sport: environment.apiURL + "/sport",
        sports: environment.apiURL + "/sports",
        event: environment.apiURL + "/event",
        events: environment.apiURL + "/events",
        results: environment.apiURL + "/results",
        markets: environment.apiURL + "/markets/by_market_type",
        markets_by_sport_id: environment.apiURL + "/sports/{sport_id}/markets",
        check: environment.apiURL + "/check",
        coupons: environment.apiURL + "/coupons",
        event_types: environment.apiURL + "/event_types",
    }

    constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) public storage: Storage) {
        
    }

    getHttpRequest(url, params) {
        let token = "1Iktsa40MbZ3FJmXyGZsYhdMdJEHq2EbYvTFzIaZJt5HehIA3hEjibuTt58tsWpubq6NnmOLZnIs5SWC";
        var headers_object = new HttpHeaders().set("Authorization", "Bearer " + token);
        return this.http.get<HttpResponseInterface>(url, {
            headers: headers_object,
            params: params
        }).pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    getHighLights() {
        return this.getHttpRequest(this.urls["highlights"], {});
    }

    getSportsWithRegionsAndLeagues() {
        return this.getHttpRequest(this.urls["sports"], {with_regions_and_leagues: true});
    }

    getSports() {
        return this.getHttpRequest(this.urls["sports"], {});
    }

    getEvent(params) {
        return this.getHttpRequest(this.urls["event"], params);
    }

    getEvents(params) {
        return this.getHttpRequest(this.urls["events"], params);
    }

    getSport(sport_id, params) {
        return this.getHttpRequest(this.urls["sports"] + "/" + sport_id, params);
    }

    getResults() {
        return this.getHttpRequest(this.urls["results"], {});
    }

    getMarkets(params) {
        let url = this.urls["markets"];
        return this.getHttpRequest(url, params);
    }

    getMarketsBySportId(sport_id) {
        let url = this.urls['markets_by_sport_id'].replace("{sport_id}", sport_id);
        return this.getHttpRequest(url, {});
    }

    getCheck() {
        return this.getHttpRequest(this.urls["check"], {});
    }

    getEventTypes() {
        return this.getHttpRequest(this.urls["event_types"], {});
    }

    getCoupons(params) {
        return this.getHttpRequest(this.urls['coupons'], params);
    }

    getLocal(key: string) {
        return this.storage.getItem(key);
    }
    
    setLocal(key: string, value: string) {
        this.storage.setItem(key, value);
    }

    removeLocal(key: string) {
        this.storage.removeItem(key);
    }

    clearLocal() {
        this.storage.clear();
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend retured code ${error.status}, ` + 
            `body was: ${error.error}`);
        }

        return throwError(
            'Something bad happend; please try again later.');
    }

    makeIntentionalError() {
        return this.http.get('not/a/real/url')
            .pipe(
                catchError(this.handleError)
            );
    }

    setBet(odd: Odd, market_type: any) {
        let betslip = CommonData.betSlip;
        
        if(betslip.selected[odd.id])
        {
            delete betslip.selected[odd.id];
            let tmp = [];
            for(let i = 0;i < betslip.betslip.length;i ++) {
                if(betslip.betslip[i].id != odd.id) {
                tmp.push(betslip.betslip[i]);
                }
            }
            betslip.betslip = tmp;
        }
        else
        {
            betslip.selected[odd.id] = true;
            betslip.betslip.push(odd);
        }

        if(market_type !== false)
        {
            betslip.markets[market_type.id] = market_type;
        }
        
        CommonData.setCalcInfo();

        this.setLocal('betslip', JSON.stringify(betslip));
    }

    clearBetslip() {
        CommonData.betSlip.selected = {};
        CommonData.betSlip.betslip = [];
        CommonData.betSlip.markets = {};
        
        CommonData.setCalcInfo();

        this.setLocal('betslip', JSON.stringify(CommonData.betSlip));
    }
}