import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-histories',
  templateUrl: './menu-histories.component.html',
  styleUrls: ['./menu-histories.component.css']
})
export class MenuHistoriesComponent implements OnInit {
  @Input() histories: object[];

  constructor() { }

  ngOnInit(): void {
  }

}
