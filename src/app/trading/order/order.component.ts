import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Pagination} from '../../widgets/pagination/pageconfig';
import {HttpClient} from '@angular/common/http';
import {HeaderComponent} from '../../widgets/header/header.component';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    model: any = [];
    // 传出分页总数
    @Output() public pagination: Pagination = Pagination.defaultPagination;
    @ViewChild(HeaderComponent) header: HeaderComponent;

    constructor(public http: HttpClient) {

    }

    public ngOnInit(): void {
        // this.header.Title = '交易中心';
        // this.header.route = '/transaction';
        this.pagination.currentPage = 1;
        this.initList();
        this.pagination.changePage = (() => {
            this.initList();
        });
    }

    private initList(): void {
        const page = this.pagination.currentPage;
        const url = sessionStorage['http'] + '/action/orders/GetBuy?num=' + page;
        this.http.get(url)
            .subscribe(data => {
                this.model = JSON.parse(data['data']);
                this.pagination.totalItems = data['Total'];
            });
    }

    getID(id) {
        return 'lml' + id;
    }

    GetTimes(time) {
        try {
            if (time != null) {
                return time.split('T')[0];
            }
        } catch (e) {
            return time;
        }
    }

}
