import { Component, ViewEncapsulation } from '@angular/core';
import {AuthenticationService} from '../services/authenticate.service'
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {
  input:any;
password:any;
  constructor(private authenticationService:AuthenticationService,private router: Router) {

  }

  login(){
    console.log(this.input, this.password);
        this.authenticationService.login(this.input, this.password)
            .subscribe(result => {
              console.log(result,"res");
                if (result.success === true) {
                    // login successful
                   console.log("login sucewss");
                   this.router.navigate(['/app/dashboard']);

                
                } else {
                    // login failed
                  alert(result.msg);
                 
                }
            });



  }
}
