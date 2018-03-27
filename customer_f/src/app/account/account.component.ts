import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'account',
  templateUrl: './account.template.html',
  styleUrls:['./account.style.scss']
})
export class AccountPage {

    radioModel='descriptive';
    email:any;
    name:any;
    mobile_no:any;
    editName:any=false;
    editEmail:any=false;
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
addressess:any=[];
feedbackList:any=[];
orderList:any=[];
feedbackId:any;
showDialogFeedBack:any=false;
    editMobile:any=false;
    showDialog:any=false;
    feedBackProduct:any;
    showFileNames:any;
    filesToUpload:any;
    text:any;
     

    constructor(private http:Http, private route: ActivatedRoute,router:Router){

      let ls:any = localStorage.getItem("currentUser");
      ls=JSON.parse(ls);
      console.log("account ----- ",ls);
      if(ls != null){
     let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/customer/get/'+ls._id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
           this.name=result.data.name;
           this.mobile_no = result.data.mobile_no;
           this.email = result.data.email;
           this.addressess = result.data.addressess
        })
        

      }

      let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/order/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res order', result)
           this.orderList = result.data.orders;
          
        })
        this.http.get('http://localhost:4700/api/v1/feedback/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res feedbacks', result)
           this.feedbackList = result.data.feedbacks;
          this.feedBackProduct = this.feedbackList[0].product[0];
          console.log("feedBackProduct",this.feedBackProduct);
        })
   

      

}

clickEditName(){
  this.editName = !this.editName;
}

clickEditEmail(){
  this.editEmail = !this.editEmail;
}
clickEditMobile(){
  this.editMobile = !this.editMobile;
}

clickSave(){

  let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        let ls:any = localStorage.getItem("currentUser");
      ls=JSON.parse(ls);
        this.http.post('http://localhost:4700/api/v1/customer/update',{

          name:this.name,
          email:this.email,
          mobile_no:this.mobile_no,
          _id:ls._id
        },options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res saved success', result)
           if(this.editName == true){
             this.editName =false;
           }
           if(this.editMobile == true){
             this.editMobile =false;
           }
           if(this.editEmail == true){
             this.editEmail =false;
           }
         
        })

}
 addNewAddress(){

   this.showDialog = !this.showDialog;

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
           this.name=result.data.name;
           this.mobile_no = result.data.mobile_no;
           this.email = result.data.email;
           this.addressess = result.data.addressess
        })
          
        })

 }
 deleteAddress(i,a){

      let ls:any = localStorage.getItem("currentUser");
      ls=JSON.parse(ls);
     let headers = new Headers();
       let options = new RequestOptions({ headers: headers });
        this.http.post('http://localhost:4700/api/v1/customer/delete/address',{
          _id:ls._id,
          address:{
         _id:i._id

          }
        },options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res address del', result)
           alert("address deleted success");
           this.addressess.splice(a,1);
        })

 }

 showFeedBackDialog(i,a){
   this.showDialogFeedBack =  !this.showDialogFeedBack;
   this.feedBackProduct = i; 
   this.feedbackId = a._id;
 }

 submitFeedBack(){
    console.log("submitFeedBack",this.feedBackProduct);


    if(this.radioModel == 'descriptive'){
       let info = {
          feedbackId: this.feedbackId,
          obj:{
            product:this.feedBackProduct._id,
            text:this.text
          }
        };
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
         this.http.post('http://localhost:4700/api/v1/feedback/update', {data:info},options)
        .map(files => files.json())
        .subscribe(files => {
          this.showDialogFeedBack = !this.showDialogFeedBack;
          alert("feedback submitted");

          console.log('files', files)})

    }else if(this.radioModel == 'audio'){
       const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for(let i =0; i < files.length; i++){
        formData.append("imgStore", files[i], files[i]['name']);
    }
    
    console.log('form data variable :   '+ formData.toString());
      let info = {
          feedbackId: this.feedbackId,
          obj:{
            product:this.feedBackProduct._id,
          }
        };
        formData.append('data', JSON.stringify(info));
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
  

        this.http.post('http://localhost:4700/api/v1/feedback/update', formData,options)
        .map(files => files.json())
        .subscribe(files => {
          this.showDialogFeedBack = !this.showDialogFeedBack;
          alert("feedback submitted");

          console.log('files', files)})

    }else if(this.radioModel == 'ques'){

       let info = {
          feedbackId: this.feedbackId,
          obj:{
            product:this.feedBackProduct._id,
            survey:this.feedBackProduct.survey,
          }
        };
        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
         this.http.post('http://localhost:4700/api/v1/feedback/update', {data:info},options)
        .map(files => files.json())
        .subscribe(files => {
          this.showDialogFeedBack = !this.showDialogFeedBack;
          alert("feedback submitted");

          console.log('files', files)})


    }



       
          
          

    
 }

   onChange(event: any) {
    let files = [].slice.call(event.target.files);
    
    this.showFileNames = files;

     this.filesToUpload = <Array<File>>[].slice.call(event.target.files);
     console.log(this.filesToUpload);
     
    //  let files = [].slice.call(event.target.files);
  }


   


}
