import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
const PEOPLE = [
  {
   
    'productName': 'Product 1',
    'category':'Category 1, Category 2',
    'brand': 'Brand Name'
    
  },
  {
   
   'productName': 'Product 2',
    'category':'Category 1, Category 2',
    'brand': 'Brand Name'
    
  }
  
];
@Component({
  selector: 'products',
  templateUrl: './products.template.html',
  styleUrls:['./products.style.scss']
})
export class ProductsPage {
    data: any[] = PEOPLE;
    brandId:any;
    productList:any;
    brandName:any;
    constructor( private route: ActivatedRoute,private http:Http){

    }

    ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.brandId = id;
   console.log(id);

               let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
    

        this.http.get('http://localhost:4700/api/v1/product/getAll/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res products', result)
          this.productList = result.data.products;
          // this.data = result.data.brands;

        })

          this.http.get('http://localhost:4700/api/v1/brand/get/'+id,options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)

           this.brandName = result.data.name;
      
        })
    }

}
