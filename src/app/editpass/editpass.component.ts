import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router, ActivatedRoute} from '@angular/router';
import {HeaderComponent} from "../widgets/header/header.component";

@Component({
    selector: 'app-editpass',
    templateUrl: './editpass.component.html',
    styleUrls: ['./editpass.component.scss']
})
export class EditpassComponent implements OnInit {

    @ViewChild(HeaderComponent) header: HeaderComponent;
    formModel: FormGroup;

    constructor(public fb: FormBuilder, public http: HttpClient, public router: Router, public info: ActivatedRoute) {
        this.formModel = fb.group({
            ID: [localStorage['ID']],
            oldPass: ['', [Validators.required, Validators.pattern('^.{6,16}$')]],
            PassWord: ['', [Validators.required, Validators.pattern('^.{6,16}$')]],
            Confirm: ['', [Validators.required, Validators.pattern('^.{6,16}$')]],
        }, {
            validator: this.MatchPassword
        });
    }

    ngOnInit() {

        this.header.Title = '修改密码';
        this.header.route = '/personal';

    }

    onSubmit(e) {
        e.target.disabled = true;
        this.http.put(sessionStorage['http'] + '/action/Users/EditPass', this.formModel.value).subscribe(data => {
            this.router.navigate(['/personal']);
        }, error2 => {
            alert(error2.error.Message);
            e.target.disabled = false;
        });
    }

    MatchPassword(AC: AbstractControl) {
        const password = AC.get('PassWord').value; // to get value in input tag
        const confirmPassword = AC.get('Confirm').value; // to get value in input tag
        if (password != confirmPassword) {
            AC.get('Confirm').setErrors({MatchPassword: true});
        } else {
            return null;
        }
    }

}
