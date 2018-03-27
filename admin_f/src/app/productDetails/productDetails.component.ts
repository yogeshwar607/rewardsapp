import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'productDetails',
  templateUrl: './productDetails.template.html',
  styleUrls:['./productDetails.style.scss']
})
export class ProductDetailsPage {
showFileNames:any;
editorContent:any;
productId:any;
name:any;
videoLink:any;
videoLinkList:any=[];
category:any;
categoryList:any=[];
nAvailable:any;
fbLink:any;
linkedInLink:any;
twitterLink:any;
location:any;
locationList:any=[];
model:any;
permonthperuser:any;
perweekperuser:any;
perdayperuser:any;
brandId:any;
survey:any;
surveyList:any=[];
minAge:any;
maxAge:any;
description:any;
images:any;
activeImg:any;
gender:any;
brandName:any;
showVideo:any=false;
videoUrl:any;
is_active:any=true;
constructor(private route: ActivatedRoute,private http:Http,public sanitizer: DomSanitizer){
     this.editorContent = 'My Document\'s Description'

}
  selectActiveImg(i){

    this.activeImg = i;
    this.showVideo = false;

  }

ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.productId = id;
   console.log(id);

               let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    
 
        this.http.get('http://localhost:4700/api/v1/product/get/'+this.productId,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res pro', result)
           this.category = result.data.category;
           this.description = result.data.description;
           this.fbLink = result.data.fbLink;
           this.nAvailable = result.data.no_of_available_items;
           this.name = result.data.name;
           this.videoLinkList = result.data.videos;
           this.images = result.data.images;
           this.minAge = result.data.target_audience.age.min;
           this.maxAge = result.data.target_audience.age.max;
           this.survey = result.data.survey;
           this.location = result.data.target_audience.location;
           this.gender=result.data.target_audience.gender;
           this.brandName = result.data.brand.name;
           this.is_active = result.data.is_active;
//            this.permonthperuser= result.data.rules.permonthperuser;
// this.perweekperuser= result.data.rules.perweekperuser;
// this.perdayperuser= result.data.rules.perdayperuser;

           this.images = this.images.map(i =>{
             return "http://localhost:4700"+i.slice(i.indexOf("/"))
           })
           this.activeImg = this.images[0];
          // this.data = result.data.brands;

        })
  }

  showVid(i){

    this.showVideo = true;
    this.videoUrl = "https://www.youtube.com/embed/"+i;

  }
    activate(){
    this.is_active = !this.is_active;
  }

}
