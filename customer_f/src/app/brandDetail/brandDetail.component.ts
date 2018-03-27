import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'brandDetail',
  templateUrl: './brandDetail.template.html',
  styleUrls:['./brandDetail.style.scss']
})
export class BrandDetailPage {
brandId:any;

description:any;
name:any;
images:any;
videoLinkList:any=[];
category:any=[];
// brandId:any;
headquaters:any;
fbLink:any;
linkedInLink:any;
twitterLink:any;
activeImg:any;
_id:any;
showVideo:any=false;
videoUrl:any;
constructor(private route: ActivatedRoute,private http:Http,public sanitizer: DomSanitizer){

}

ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.brandId = id;
   console.log(id);

               let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/brand/get/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
           this.category = result.data.category;
           this.description = result.data.description;
           this.fbLink = result.data.fbLink;
           this.twitterLink = result.data.twitterLink;
           this.name = result.data.name;
           this.videoLinkList = result.data.videos;
           this.images = result.data.images;
           this.headquaters = result.data.headquaters;
           this.linkedInLink = result.data.linkedInLink;
this._id = result.data._id;
           this.images = this.images.map(i =>{
             return "http://localhost:4700"+i.slice(i.indexOf("/"))
           })
           this.activeImg = this.images[0];
          // this.data = result.data.brands;

        })
  }
  selectActiveImg(i){

    this.activeImg = i;
        this.showVideo = false;


  }
  showVid(i){

    this.showVideo = true;
    this.videoUrl = "https://www.youtube.com/embed/"+i;

  }
}
