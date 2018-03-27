import { Component } from '@angular/core';
// import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.template.html',
  styleUrls:['./cart.style.scss']
})
export class CartPage {
cartList:any=[];
config:any;
addressess:any=[];
addressType:any="Home";
nameAd:any;
mobile_noAd:any;
address:any;
state:any;
city:any;
country:any;
pincode:any
near_by:any;
label:any;
showDialog:any;
addressSelected:any;
  constructor(private http:Http, private route: ActivatedRoute,router:Router,appState:AppState){
this.config=appState;
    // let arr=[];
let ls:any = localStorage.getItem("cart");
if(ls != null){
  ls = JSON.parse(ls);
  this.cartList = ls;

}
console.log("cart",this.cartList);

console.log("ls",JSON.parse(localStorage.getItem("cart")));

      let lss:any = localStorage.getItem("currentUser");
      lss=JSON.parse(lss);
      console.log("account ----- ",lss);
      if(ls != null){
     let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/customer/get/'+lss._id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          
           this.addressess = result.data.addressess
        })
        

      }
   

  }

  remove(i){
    console.log(i);
    this.cartList.splice(i,1);
            this.config.downCart();

    localStorage.setItem("cart",JSON.stringify(this.cartList));

    // this.cartList =  this.cartList.splice(i,1);
    // let ls:any = localStorage.getItem("cart");
    // console.log(i,ls);
    
    //   if(ls != null){
    //     ls = JSON.parse(ls);
    //     ls = ls.splice(i,1);
    //     console.log("after remove",ls,i);
    //     localStorage.setItem("cart",JSON.stringify(ls));
    //     this.config.downCart();
    //     this.cartList =  this.cartList.splice(i,1);


    //   }
  }

  submitNewAddress(){
     let ls:any = localStorage.getItem("currentUser");
      ls=JSON.parse(ls);
     let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:4700/api/v1/customer/update',{
          _id:ls._id,
          obj:{
            name:this.nameAd,
            lable:this.label,
            address:this.address,
            mobile_no:this.mobile_noAd,
            address_type:this.addressType,
            state:this.state,
            city:this.city,
            country:this.country,
            pincode:this.country,
            near_by:this.near_by

          }
        },options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res address add', result)
           alert("address added success");
          this.showDialog = !this.showDialog;
          this.http.get('http://localhost:4700/api/v1/customer/get/'+ls._id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
           
           this.addressess = result.data.addressess
        })
          
        })

 }
 placeOrder(){
   if(this.addressSelected == undefined){
     alert("please select a address");
   }else{
      let lss:any = localStorage.getItem("currentUser");
      lss=JSON.parse(lss);
      let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:4700/api/v1/order/create/',{
          customer:lss._id,
          products:this.cartList,
          date_of_order:Date.now(),
          status:"Order Recieved",
          address:this.addressess.find(item => item._id == this.addressSelected)
        },options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res order', result);
           alert("order place success");
          //  this.cartList=[];
          
          //  this.addressess = result.data.addressess
        })

   }
   console.log("place",this.addressSelected );
 }
 addNewAddress(){

   this.showDialog = !this.showDialog;

 }

}
