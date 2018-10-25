import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {Pagination} from '../widgets/pagination/pageconfig';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HeaderComponent} from "../widgets/header/header.component";
import {Vpconfig} from '../widgets/verify-pass/vpconfig';

@Component({
    selector: 'app-buy',
    templateUrl: './buy.component.html',
    styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {
    @ViewChild(HeaderComponent) header: HeaderComponent;
    model: any = [];
    // 传出分页总数
    @Output()
    public pagination: Pagination = Pagination.defaultPagination;
    formModel: FormGroup;
    bizhi = 0;
    jifen = 0;
    HYT = 0;
    max = 0;
    @Output() vpconfig: Vpconfig = Vpconfig.defaultVpconfig;

    constructor(public fb: FormBuilder, public http: HttpClient, private router: Router) {
        this.formModel = fb.group({
            UID: [localStorage['ID']],
            UserName: [localStorage['un']],
            Numbers: ['', [Validators.required, Validators.min(1)]],
        });
        http.get(sessionStorage['http'] + '/action/Coins/GetParams?u=' + localStorage['un']).subscribe(data => {
            this.HYT = JSON.parse(data['data'])[0]['HYB'];
            this.jifen = Number(JSON.parse(data['data'])[0]['Moneys']);
            this.bizhi = Number(data['Bi']);
            this.max = Math.floor(this.jifen / this.bizhi);
            this.formModel.get('Numbers').setValidators([Validators.required, Validators.min(1), Validators.max(this.max)]);
        });
    }

    public ngOnInit(): void {

        this.header.Title = '可用积分转流通HYT';
        this.header.route = '/transaction';

        this.pagination.currentPage = 1;
        this.initList();
        this.pagination.changePage = (() => {
            this.initList();
        });
    }

    private initList(): void {
        const page = this.pagination.currentPage;
        const url = sessionStorage['http'] + '/action/Coins/GetList?u=' + localStorage['un'] + '&num=' + page;
        this.http.get(url)
            .subscribe(data => {
                this.model = JSON.parse(data['data']);
                this.pagination.totalItems = data['Total'];
            });
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

    onSubmit(e) {
        this.vpconfig.show = true;
        // e.target.disabled = true;
        // this.http.post(sessionStorage['http'] + '/action/Coins/PostCoins', this.formModel.value).subscribe(data => {
        //     alert('购买成功');
        //     this.router.navigate(['/transaction']);
        // }, error2 => {
        //     alert(error2.error.Message);
        //     this.router.navigate(['/transaction']);
        // })
    }

    result(i: number) {
        if (i == 0) {
            this.http.post(sessionStorage['http'] + '/action/Coins/PostCoins', this.formModel.value).subscribe(data => {
                alert('购买成功');
                this.router.navigate(['/transaction']);
            }, error2 => {
                alert(error2.error.Message);
                this.router.navigate(['/transaction']);
            });
        }
    }

}
