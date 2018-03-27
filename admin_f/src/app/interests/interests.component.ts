import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
declare let jQuery: any;
@Component({
  selector: 'interests',
  templateUrl: './interests.template.html'
})
export class InterestsPage {
    interestList: any[]=[] ;
    categoryList: any[]=[] ;
    sub_categoryList:any[]=[];
    categoryListSend:any=[];
    notActive:any=true;
    active:any=false;
    
    subCategory:any;
    interestName:any;
    categoryName:any;
    interestShow:any;
    categoryShow:any;
    showDialog:any=false;
    constructor(private http:Http, private route: ActivatedRoute,router:Router){
    //  this.editorContent = 'My Document\'s Description'
              let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/interest/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.interestList = result.data.interests;

        })
         this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res category', result)
          this.categoryList = result.data.category;

        })

          let id = this.route.snapshot.paramMap.get('id');
   console.log(id);

}

 showInterst(){
   this.interestShow = true;
   this.categoryShow  = false;
    this.showDialog = !this.showDialog;
    // this.state ="dsdad";
  }
   showCategory(){
   this.interestShow = false;
   this.categoryShow  = true;
    this.showDialog = !this.showDialog;
    // this.state ="dsdad";
  }

  addInterest(){


    let data={

        name:this.interestName,
        category:this.categoryListSend,
        updated_by:undefined,
        created_by:undefined

    };
    let headers = new Headers();
    // headers.append('content-type', 'multipart/formdata');
    let options = new RequestOptions({ headers: headers });
   
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

        this.http.post('http://localhost:4700/api/v1/interest/create',data ,options)
        .map(res => res.json())
        .subscribe(result => {


        this.http.get('http://localhost:4700/api/v1/interest/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.interestList = result.data.interests;
             console.log(result);
              alert("Interest Created");
              // this.categoryList=[];
              this.interestName="";
    this.showDialog = !this.showDialog;

        })
           
        }
       )

  }

  addCategory(){


    let data={

        name:this.categoryName,
        sub_category:this.sub_categoryList,
        updated_by:undefined,
        created_by:undefined

    };
    let headers = new Headers();
    // headers.append('content-type', 'multipart/formdata');
    let options = new RequestOptions({ headers: headers });
   
    // formData.append("uploads[]", files[0], files[0]['name']);
    // this.address.documents = files.toString();

        this.http.post('http://localhost:4700/api/v1/category/create',data ,options)
        .map(res => res.json())
        .subscribe(result => {
             this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res category', result)
          this.categoryList = result.data.category;
           console.log(result);
           this.showDialog=!this.showDialog;
              alert("Category Created");
              // this.categoryList=[];
              this.categoryName="";
              this.sub_categoryList = [];

        })
             
        }
       )

  }




addSubCategory(){
  this.sub_categoryList.push({name:this.subCategory});
}
activate(i,event){
  console.log(this.categoryListSend);
  // this.active = !this.notActive;
if(i.active == true){


jQuery(event.target).css('background-color',"white");
 i.active = false;

 this.categoryListSend.find((x,index) =>{ 
   console.log(index);
 this.categoryListSend.splice(index,1);
   
   });
//  this.categoryListSend.splice(,1);


}else{
jQuery(event.target).css('background-color',"lightgrey");
 i.active = true;
  this.categoryListSend.push(i);

}

  
  console.log(this.categoryListSend);

}


}
