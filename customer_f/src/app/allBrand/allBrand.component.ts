import { Component } from '@angular/core';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'allBrand',
  templateUrl: './allBrand.template.html',
  styleUrls:['./allBrand.style.scss']
})
export class AllBrandPage {
 data:any;
 constructor(private http:Http, private route: ActivatedRoute,router:Router){
    //  this.editorContent = 'My Document\'s Description'
              let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/brand/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.data = result.data.brands;

        })

          let id = this.route.snapshot.paramMap.get('id');
   console.log(id);

}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
   console.log(id);
  }
    

}
