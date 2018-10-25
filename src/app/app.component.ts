import {Component} from '@angular/core';
import {environment} from '../environments/environment';

declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor() {
        if ($(window).width() > 768) {
            window.location.href = environment.pc;
        }
        sessionStorage['http'] = environment.ApiUrl;
    }
}
