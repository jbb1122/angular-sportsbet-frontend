import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { AllSportsComponent } from './components/all-sports/all-sports.component';
import { SportComponent } from './components/sport/sport.component';
import { EventComponent } from './components/event/event.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'competitions', component: CompetitionsComponent },
  { path: 'competitions/:sport_id', component: CompetitionsComponent },
  { path: 'competitions/:sport_id/:region_id', component: CompetitionsComponent },
  { path: 'competitions/:sport_id/:region_id/:league_id', component: CompetitionsComponent },
  { path: 'event/:sport_id/:region_id/:league_id/:event_id', component: EventComponent },
  { path: 'all-sports', component: AllSportsComponent },
  { path: 'sport/:sport_id', component: SportComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
