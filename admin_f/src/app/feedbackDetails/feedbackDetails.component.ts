import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'feedbackDetails',
  templateUrl: './feedbackDetails.template.html'
})
export class FeedbackDetailsPage  {
    data: any[] ;
    feedback:any;
    show=false;
    
    constructor(private http:Http, private route: ActivatedRoute,router:Router){

         let id = this.route.snapshot.paramMap.get('id');

        let headers = new Headers();
        let options = new RequestOptions({ headers: headers });
        this.http.get('http://localhost:4700/api/v1/feedback/admin/get/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res feedback', result)
           this.show= true;
          this.feedback = result.data;

          this.feedback.feedBack_given.forEach((element,index1) => {

            element.fileUrls.forEach((item,index2) => {
              
              this.feedback.feedBack_given[index1].fileUrls[index2] = "http://localhost:4700"+item.slice(item.indexOf("/"))
            });
            
          });
         })

         

}



}


