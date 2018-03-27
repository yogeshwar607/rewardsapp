import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'customerDetails',
  templateUrl: './customerDetails.template.html'
})
export class CustomerDetailsPage  {
    data: any[] ;
    customer:any;
    show=false;
   
    constructor(private http:Http, private route: ActivatedRoute,router:Router){

         let id = this.route.snapshot.paramMap.get('id');

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/customer/admin/get/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res customer', result)
           this.show= true;
          this.customer = result.data;
          this.calculateAge();
         })

         

}
calculateAge(){
    var birthdate:any = new Date(this.customer.dob);
    console.log(birthdate,this.customer.dob);
var cur:any = new Date();
var diff = cur - birthdate; // This is the difference in milliseconds
var age = Math.floor(diff/31557600000);
this.customer.age = age; 
console.log(age);
}

activateUser(){
    this.customer.is_active = !this.customer.is_active;
}


}


