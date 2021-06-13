import { Component, ElementRef, OnInit } from '@angular/core';
import { AppService, HttpResponseInterface, Sport } from '../../app.service';

declare var $: any;

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.css'],
  providers: [AppService]
})
export class SportsListComponent implements OnInit {
  data: HttpResponseInterface;
  sports: Sport[];
  error: any;
  sportsChecked = false;

  constructor(private appService: AppService) { }

  toggle(event: any) {
    let elm = event.target;
    if($(elm).hasClass('top')){
        var parent = $(elm).parent().parent().parent().find('input');
        $(elm).parent().removeClass('self');
        if($(elm).is(':checked')){
            $(parent).prop('checked', true);
        }else{
            $(parent).prop('checked', false);
        }
    }else{

        var ul_parent = $(elm).parent().parent().parent();

        var input_count = $(ul_parent).find('input').length;
        var input_checked_count = $(ul_parent).find('input:checked').length;
        var input_un_checked_count = $(ul_parent).find('input:not(:checked)').length;

        var parent = $(ul_parent).parent().parent().find('.top');

        if(input_count==input_checked_count){
            $(parent).prop('checked', true);
        }
        if(input_checked_count < input_count && input_un_checked_count>0){
            $(parent).parent().addClass('self');
            $(parent).prop('checked', false);
        }

        if(input_checked_count<=0){
            $(parent).parent().removeClass('self');
        }
    }

    var total_count = $('.sidebar input:not(.top):checked').length;

    if(total_count>0){
        this.sportsChecked = true;
    }else{
        this.sportsChecked = false;
    }
  }

  ngOnInit(): void {
    this.appService.getSportsWithRegionsAndLeagues()
      .subscribe((data: HttpResponseInterface) => {
        this.data = {...data}
        if(this.data.code == 200) {
          this.sports = this.data.data;
        }
      },
      error => this.error = error);
  }

  clear() {
    this.data = undefined;
    this.error = undefined;
    this.sports = undefined;
  }
}
