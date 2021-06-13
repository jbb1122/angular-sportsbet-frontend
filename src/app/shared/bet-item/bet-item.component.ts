import { 
  Component, 
  OnInit, 
  Input
} from '@angular/core';
import { features } from 'process';

import { 
  BetEventItem, 
  MarketType, 
  Odd,
  BROWSER_STORAGE,
  AppService } from '../../app.service';

import { CommonData } from '../../common/global-constants';

@Component({
  selector: 'app-bet-item',
  templateUrl: './bet-item.component.html',
  styleUrls: ['./bet-item.component.css'],
  providers: [
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }
  ]
})
export class BetItemComponent implements OnInit {
  @Input() betEvent: BetEventItem;
  @Input() markets: MarketType[];
  public betSlip = CommonData.betSlip;

  constructor(private appService: AppService) { 
    
  }
  ngOnInit(): void {
    
  }

  setBet(odd: Odd, market_type: MarketType): void {
    this.appService.setBet(odd, market_type);
  }
}
