import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    Title: string = '';
    route: string = '';

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    goback(route){
        this.router.navigate([route]);
    }

}
