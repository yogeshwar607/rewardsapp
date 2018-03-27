import { Component } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {Http, Response,RequestOptions,Headers} from '@angular/http';
import { AppState } from '../app.service';

@Component({
  selector: 'allProducts',
  templateUrl: './allProducts.template.html',
  styleUrls:['./allProducts.style.scss']
})
export class AllProductsPage {

   data: any;
    brandId:any;
    productList:any;
    brandName:any;
    config:any;
    allInt:any=[];
    allBrands:any=[];
    constructor( private route: ActivatedRoute,private http:Http,appState:AppState,private router:Router){
      this.config = appState;

     
    }

    ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.brandId = id;
   console.log(id);

               let headers = new Headers();

       let options = new RequestOptions({ headers: headers });
   
       this.http.get('http://localhost:4700/api/v1/product/getAll/search?search=sid',options)
        .map(res => res.json())
        .subscribe(result =>{
          console.log("seaerch --- ", result);
        })

       

          this.http.get('http://localhost:4700/api/v1/brand/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
          console.log('res brands', result)
          this.allBrands = result.data.brands;

           this.route.queryParams.subscribe(params => {
          let brand= params['brand'];
          let category = params['category'];
          let search = params['search'];

     if(brand == undefined && category == undefined && search == undefined){
        let headers = new Headers();

       let options = new RequestOptions({ headers: headers });

       this.http.get('http://localhost:4700/api/v1/product/getAll/'+"all",options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res products', result)
          this.productList = result.data.products;
               this.productList = result.data.products.filter((item,i) =>{
            return item.images.filter((img,i) =>{
            return item.images[i] = "http://localhost:4700"+item.images[i].slice(item.images[i].indexOf("/"));
            })
          });
          // this.data = result.data.brands;

        })

    }else if(brand == undefined && category == undefined && search != undefined){

         let headers = new Headers();

       let options = new RequestOptions({ headers: headers });

           this.http.get('http://localhost:4700/api/v1/product/getAll/'+"search",{params: {search:search }})
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res products search', result)
           this.productList = result.data.products;
                 this.productList = result.data.products.filter((item,i) =>{
            return item.images.filter((img,i) =>{
            return item.images[i] = "http://localhost:4700"+item.images[i].slice(item.images[i].indexOf("/"));
            })
          });
        //  this.router.navigate(['/app/allProducts-page'], { queryParams: {brand: brands, category: categories} });

          // this.data = result.data.brands;

        })
      
    }else{
       let headers = new Headers();

       let options = new RequestOptions({ headers: headers });

           this.http.get('http://localhost:4700/api/v1/product/getAll/'+"some",{params: {brand: brand, category: category}})
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res products filter', result)
           this.productList = result.data.products;
                 this.productList = result.data.products.filter((item,i) =>{
            return item.images.filter((img,i) =>{
            return item.images[i] = "http://localhost:4700"+item.images[i].slice(item.images[i].indexOf("/"));
            })
          });
        //  this.router.navigate(['/app/allProducts-page'], { queryParams: {brand: brands, category: categories} });

          // this.data = result.data.brands;

        })

    }

    if(brand instanceof Array){

      brand.forEach(item => {
        // console.log(item,this.allBrands);
          this.allBrands.forEach((i,index) =>{
             if(item == i._id){
               i.checked = true;
             }
          })
      })

    }else{

      this.allBrands.forEach((i,index) =>{
             if(brand == i._id){
               this.allBrands[index].checked = true;
             }
          })

    }

     
    console.log("----params",brand,category);
});
          

        })

            this.http.get('http://localhost:4700/api/v1/category/getAll',options)
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res', result)
          this.allInt = result.data.category;
          console.log("all init",this.allInt);
          this.route.queryParams.subscribe(params => {
              let brand= params['brand'];
              let category = params['category'];
             if(category instanceof Array){

              category.forEach(item => {
                console.log(item,this.allInt);
                  this.allInt.forEach((i,ii) =>{

                i.sub_category.forEach((a,aa) =>{

                    if(item == a.name){
                      this.allInt[ii].sub_category[aa].checked = true;
                    }
                })
                })
              })

            }else{

              this.allInt.forEach((i,ii) =>{

                i.sub_category.forEach((a,aa) =>{

                    if(category == a.name){
                      this.allInt[ii].sub_category[aa].checked = true;
                    }
                })
                })
                

          }
    console.log("----params",brand,category);
});

        })
    }

     addToCart(i){


console.log(i); 
let arr=[];

let ls:any = localStorage.getItem("cart");
if(ls == null){

  arr.push(i);
  localStorage.setItem("cart",JSON.stringify(arr));

}else{
  ls = JSON.parse(ls);
  ls.push(i);
  localStorage.setItem("cart",JSON.stringify(ls));
  
}
console.log("ls",localStorage.getItem("cart"));
this.config.setCart();



    }

    submit(){

      console.log(this.allInt);
      let categories=[];
      let brands=[];
      let x =this.allInt.filter(item => { 
         item.sub_category.filter(i => {
         if(i.checked){
          categories.push(i.name);
         }
       })
       
      });
      
      this.allBrands.filter(item =>{
        if(item.checked == true){
          brands.push(item._id);
        }
      })
        console.log(categories,brands);
             let headers = new Headers();

       let options = new RequestOptions({ headers: headers });


        this.http.get('http://localhost:4700/api/v1/product/getAll/'+"some",{params: {brand: brands, category: categories}})
        .map(res => res.json())
        .subscribe(result =>{
           console.log('res products filter', result)
           this.productList = result.data.products;
                 this.productList = result.data.products.filter((item,i) =>{
            return item.images.filter((img,i) =>{
            return item.images[i] = "http://localhost:4700"+item.images[i].slice(item.images[i].indexOf("/"));
            })
          });
         this.router.navigate(['/app/allProducts-page'], { queryParams: {brand: brands, category: categories} });

          // this.data = result.data.brands;

        })

    }


}
