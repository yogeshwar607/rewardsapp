import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'orders',
  templateUrl: './orders.template.html'
})
export class OrdersPage {
    data: any[] ;

    constructor(private http:Http, private route: ActivatedRoute,router:Router){
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/order/admin/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res orders', result)
          this.data = result.data.orders;
         })

         

}

}
