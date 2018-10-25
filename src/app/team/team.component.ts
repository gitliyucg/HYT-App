import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HeaderComponent} from "../widgets/header/header.component";
import 'ztree';

declare var $: any;

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

    @ViewChild(HeaderComponent) header: HeaderComponent;

    setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: 'id',
                pIdKey: 'pId',
                rootpId: ''
            }
        },
        // async: {
        //   enable: true,
        //   type: 'get',
        //   dataType: 'text',
        //   // contentType: 'application/json',
        //   //url: sessionStorage['http'] + '/action/Users/GetMember',
        //   autoParam: ['id'],
        // },
        view: {
            showIcon: false,
        }
    };
    zNodes;

    constructor(public http: HttpClient) {

    }

    ngOnInit() {
        this.databind();
        this.header.Title = '关系导图';
        this.header.route = '/teammange';
    }

    databind() {
        this.http.get(sessionStorage['http'] + '/action/Users/GetMember?id=' + localStorage['un']).subscribe(data => {
            this.zNodes = data;
            $.fn.zTree.init($('#treeid'), this.setting, this.zNodes);
        });
    }
}

