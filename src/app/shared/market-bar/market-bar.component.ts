import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MarketType } from '../../app.service';

@Component({
  selector: 'app-market-bar',
  templateUrl: './market-bar.component.html',
  styleUrls: ['./market-bar.component.css']
})
export class MarketBarComponent implements OnInit {
  @Input() markets: MarketType[];
  @Output() changeMarketOrder: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  public blanks = ["", "", "", "", "", "", "", "", "", "", ""];
  constructor() { }

  ngOnInit(): void {}

  getTotalOdds() {
    let result = 0;
    for(var i = 0;i < this.markets.length;i ++)
    {
      result += this.markets[i].odds_count * 1;
    }

    return result;
  }
}
