import { Component } from '@angular/core';
import { AppService } from './app.service';

import { CommonData } from './common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'theme';
  constructor(private appService: AppService) {
    CommonData.betSlip = JSON.parse(this.appService.getLocal('betslip')) 
                            || {selected: {}, betslip: [], markets: {}};
    CommonData.betCalcInfo = {};
    CommonData.setCalcInfo();
  }
}
