import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';

@Component({
  selector: 'addInterest',
  templateUrl: './addInterest.template.html',
  styleUrls:['./addInterest.style.scss']
})
export class AddInterestPage {

name:any;
category:any;
categoryList:any=[];

constructor(private http:Http){
  

}

submit(){

    let data={

        name:this.name,
        category:this.categoryList,
        updatedBy:undefined

    };
    let headers = new Headers();
    // headers.append('content-type', 'multipart/formdata');
    let options = new RequestOptions({ headers: headers });
   
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

        this.http.post('http://localhost:4700/api/v1/interest/create',data ,options)
        .map(res => res.json())
        .subscribe(result => {
              console.log(result);
              alert("Interest Created");
              this.categoryList=[];
              this.name="";
        }
       )
}
addCategory(){
    this.categoryList.push(this.category);
  }
  

}
