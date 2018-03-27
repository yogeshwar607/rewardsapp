import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: '../home/home.module#HomeModule' },
   
    { path: 'brandDetail-page' , loadChildren:'../brandDetail/brandDetail.module.ts#BrandDetailModule'},
    { path: 'allBrand-page' ,loadChildren:'../allBrand/allBrand.module.ts#AllBrandModule'},
    { path: 'allProducts-page' , loadChildren:'../allProducts/allProducts.module.ts#AllProductsModule'},
    { path:'productDetail-page', loadChildren:'../productDetails/productDetails.module.ts#ProductDetailModule'},
    {path: 'cart-page', loadChildren:"../cart/cart.module.ts#CartModule"},
    { path: 'account-page', loadChildren:'../account/account.module.ts#AccountModule'}
  ]}
];

export const ROUTES = RouterModule.forChild(routes);

