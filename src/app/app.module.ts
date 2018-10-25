import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FileUploadModule} from 'ng2-file-upload';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {WidgetsModule} from './widgets/widgets.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import {AuthGuard} from './auth-guard.service';
import {PcGuard} from './auth-guard-pc';
import {Interceptor} from './Interceptor';
import {IndexComponent} from './index/index.component';
import {ClipboardModule} from 'ngx-clipboard/dist';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {TeammangeComponent} from './teammange/teammange.component';
import {PersonalComponent} from './personal/personal.component';
import {TransactionComponent} from './transaction/transaction.component';
import {SelectivePreloadingStrategy} from './selective-preloading-strategy';

const root: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: '', canActivate: [PcGuard], children: [
        {path: 'login', component: LoginComponent},
        {path: 'register', loadChildren: './tuiguang/tuiguang.module#TuiguangModule'},
        {
            path: '',
            canActivate: [AuthGuard],
            children: [
                {path: 'index', component: IndexComponent},
                {path: 'teammange', component: TeammangeComponent},
                {path: 'personal', component: PersonalComponent},
                {path: 'transaction', component: TransactionComponent},
                {path: 'editpass', loadChildren: './editpass/editpass.module#EditpassModule', canLoad: [AuthGuard]},
                // canLoad会保护路由守卫的惰性加载，不能被预加载
                {path: 'team', loadChildren: './team/team.module#TeamModule'},
                {path: 'recharge', loadChildren: './recharge/recharge.module#RechargeModule', data: {preload: true}},
                {path: 'liushui', loadChildren: './liushui/liushui.module#LiushuiModule'},
                {path: 'stored', loadChildren: './stored/stored.module#StoredModule'},
                {path: 'buy', loadChildren: './buy/buy.module#BuyModule', data: {preload: true}},
                {path: 'give', loadChildren: './give/give.module#GiveModule', data: {preload: true}},
                {path: 'transfers', loadChildren: './transfers/transfers.module#TransfersModule', data: {preload: true}},
                {path: 'release', loadChildren: './release/release.module#ReleaseModule'},
                {path: 'ann', loadChildren: './ann/ann.module#AnnModule'},
                {path: 'info', loadChildren: './info/info.module#InfoModule'},
                {path: 'second', loadChildren: './second/second.module#SecondModule'},
                {path: 'trading', loadChildren: './trading/trading.module#TradingModule'},
                {path: '**', component: IndexComponent}
            ]
        },
    ]}
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        IndexComponent,
        TeammangeComponent,
        PersonalComponent,
        TransactionComponent,
    ],
    imports: [
        FormsModule,
        BrowserModule,
        WidgetsModule,
        FileUploadModule,
        HttpModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgxQRCodeModule,
        ClipboardModule,
        RouterModule.forRoot(root, {preloadingStrategy: SelectivePreloadingStrategy})
    ],
    providers: [AuthGuard, PcGuard, {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
    }, SelectivePreloadingStrategy],
    bootstrap: [AppComponent]
})
export class AppModule {
}
