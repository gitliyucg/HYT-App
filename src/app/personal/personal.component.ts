import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-personal',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {

    userid = localStorage['un']

    constructor() {
    }

    ngOnInit() {
    }

    exit() {
        localStorage.clear();
        location.href = '/';
    }

    shiming(event){
        alert('暂未开放！');
    }

    kefu(event){
        alert('暂未开放！');
    }

}
