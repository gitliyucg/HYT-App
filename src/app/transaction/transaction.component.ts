import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

    info;

    constructor(
        public router: Router,
    ) {
    }

    ngOnInit() {
        this.info = JSON.parse(JSON.parse(JSON.stringify(localStorage['navigation'])));
    }

    TiQu(){
        if(this.info.TiQu == 0){
            this.router.navigate(['/release']);
        }else {
            alert('暂未开通！')
        };
    }

    buy(){
        if(this.info.BUYSwitch == 0){
            this.router.navigate(['/buy']);
        }else {
            alert('暂未开通！')
        };
    }

    give(){
        if(this.info.GiveSwitch == 0){
            this.router.navigate(['/give']);
        }else {
            alert('暂未开通！')
        };
    }

    liutong(){
        if(this.info.LTSwitch == 0){
            this.router.navigate(['/transfers']);
        }else {
            alert('暂未开通！')
        };
    }

}
