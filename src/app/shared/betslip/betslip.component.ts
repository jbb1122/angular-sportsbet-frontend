import { Component, OnDestroy, OnInit } from '@angular/core';

import { 
  AppService,
  MarketType, 
  Odd, } from '../../app.service';
import { CommonData } from '../../common/global-constants';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.css']
})
export class BetslipComponent implements OnInit, OnDestroy {
  public betSlip = CommonData.betSlip;
  public betCalcInfo = CommonData.betCalcInfo;

  constructor(private appService: AppService) { 
    
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    
  }

  setBet(odd: Odd): void {
    this.appService.setBet(odd, false);
  }

  clearBetslip(): void {
    this.appService.clearBetslip();
  }

  changedFullBet(e: any): void {
    this.betCalcInfo.fullBet = e.target.value;
    this.betCalcInfo.possibleProfite = e.target.value * this.betCalcInfo.betAmount;
  }
}
