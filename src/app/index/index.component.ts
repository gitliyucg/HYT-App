import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

declare var echarts: any;
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    ElementRef: any;
    value = environment.qrcode + '/' + localStorage['un'];
    userid = localStorage['un'];
    name = localStorage['name'];
    lasttime = localStorage['lasttime'];
    zichan = 0;
    bi = 0;
    cunchu = 0;
    moneys = 0;
    switch = 0;
    bizhi = 0;
    daisf = 0;
    echBiZhi = [];
    echTimes = [];
    public ann = [];

    constructor(public http: HttpClient) {
        http.get(sessionStorage['http'] + '/action/wallets/GetInfo/' + this.userid).subscribe(data => {
            if (data == null) {
                localStorage.clear();
                location.href = '/';
            }
            let json = JSON.parse(data['data']);
            this.zichan = json.zichan == null ? 0 : json.zichan;
            this.cunchu = json.HYT == null ? 0 : json.HYT;
            this.bi = json.HYB == null ? 0 : json.HYB;
            this.moneys = json['Moneys'] == null ? 0 : json['Moneys'];
            this.switch = json.Switch;
            this.daisf = json.daisf == null ? 0 : json.daisf;
            // this.faOn = data['faOn'];
        });
    }

    ngOnInit() {

        var myChart = echarts.init(document.getElementById('BiZhi'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '行情'
            },
            xAxis: {
                type: 'category',
                data: this.echTimes
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: this.echBiZhi,
                type: 'line'
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        this.http.get(sessionStorage['http'] + '/action/Markets/GetList').subscribe(response => {

            let echArr = [];
            for (let a in response) {
                echArr.push(response[i]);
            }

            for (var i = 0; i < echArr.length; i++) {
                this.echBiZhi.push(response[i]['BiZhi']);
                this.echTimes.push(response[i]['Times'].split('T')[0].split('-')[1] + '-' + response[i]['Times'].split('T')[0].split('-')[2]);
            }

            myChart.setOption({
                title: {
                    text: '行情'
                },
                xAxis: {
                    type: 'category',
                    data: this.echTimes
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: this.echBiZhi,
                    type: 'line'
                }]
            })
        });

        this.http.get(sessionStorage['http'] + '/action/Deposits/GetParams').subscribe(data => {
            this.bizhi = data['bi'];
        });

        this.http.get(sessionStorage['http'] + '/action/anns/getlist').subscribe(response => {
            for (var i in response){
                this.ann.push(response[i])
            }
        });

    }

    stop(e) {
        alert('此功能暂不开放');
        // this.switch = 1;
        // e.target.disabled = true;
        // this.http.put(sessionStorage['http'] + '/action/Users/switch?id=' + localStorage['ID'] + '&s=' + this.switch, {}).subscribe(data => {
        //
        // }, error2 => {
        //   this.switch = 0;
        // });
    }

    open(e) {
        alert('此功能暂不开放');
        // this.switch = 0;
        // e.target.disabled = true;
        // this.http.put(sessionStorage['http'] + '/action/Users/switch?id=' + localStorage['ID'] + '&s=' + this.switch, {}).subscribe(data => {
        //
        // }, error2 => {
        //   this.switch = 1;
        // });
    }

    copy() {
        alert('复制成功');
    }

}
