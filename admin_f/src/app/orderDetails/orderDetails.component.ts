import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'orderDetails',
  templateUrl: './orderDetails.template.html'
})
export class OrderDetailsPage  {
    data: any[] ;
    order:any;
    show=false;
    showDialog:any=false;
    selectedStatus:any;
    
    constructor(private http:Http, private route: ActivatedRoute,router:Router){

         let id = this.route.snapshot.paramMap.get('id');

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/order/admin/get/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res order', result)
           this.show= true;
           this.order = result.data;

        
         })

         

}

updateOrderStatus(){
  this.showDialog  =  !this.showDialog;
  

}
submitUpdateOrderStatus(){
  console.log("staus",this.selectedStatus);

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:4700/api/v1/order/admin/update',
        {_id:this.order._id,
          status:this.selectedStatus
        },options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res cool', result)
           this.show= true;
           this.showDialog = !this.showDialog;
           this.order.status = this.selectedStatus;
           alert("Order Status Updated Successfully");

        
         })
}




}


