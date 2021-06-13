import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { TopLeaguesComponent } from './shared/top-leagues/top-leagues.component';
import { SportsListComponent } from './shared/sports-list/sports-list.component';
import { RanFormatComponent } from './shared/ran-format/ran-format.component';
import { BetslipComponent } from './shared/betslip/betslip.component';
import { HomeComponent } from './components/home/home.component';
import { AllSportsComponent } from './components/all-sports/all-sports.component';
import { HomeMenuComponent } from './components/home/menu/menu.component';
import { HomeLiveBetsComponent } from './components/home/home-live-bets/home-live-bets.component';
import { HomeImportantWelcomesComponent } from './components/home/home-important-welcomes/home-important-welcomes.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { MenuHistoriesComponent } from './shared/menu-histories/menu-histories.component';
import { BetItemComponent } from './shared/bet-item/bet-item.component';
import { MarketBarComponent } from './shared/market-bar/market-bar.component';
import { SportComponent } from './components/sport/sport.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    TopLeaguesComponent,
    SportsListComponent,
    RanFormatComponent,
    BetslipComponent,
    HomeComponent,
    AllSportsComponent,
    HomeMenuComponent,
    HomeLiveBetsComponent,
    HomeImportantWelcomesComponent,
    CompetitionsComponent,
    MenuHistoriesComponent,
    BetItemComponent,
    MarketBarComponent,
    SportComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
