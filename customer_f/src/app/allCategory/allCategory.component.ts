import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'allCategory',
  templateUrl: './allCategory.template.html',
  styleUrls:['./allCategory.style.scss']
})
export class AllCategoryPage {
 data:any;
 constructor(private http:Http, private route: ActivatedRoute,router:Router){
    //  this.editorContent = 'My Document\'s Description'
              let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.data = result.data.category;

        })

          let id = this.route.snapshot.paramMap.get('id');
   console.log(id);

}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
   console.log(id);
  }
    

}
