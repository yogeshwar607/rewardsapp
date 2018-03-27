import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from './authGuard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadChildren: '../home/home.module#HomeModule' },
   
    { path: 'brandDetail-page/:id' , loadChildren:'../brandDetail/brandDetail.module.ts#BrandDetailModule'},
    { path: 'allBrand-page' ,loadChildren:'../allBrand/allBrand.module.ts#AllBrandModule'},
    { path: 'allProducts-page' , loadChildren:'../allProducts/allProducts.module.ts#AllProductsModule'},
    { path:'productDetail-page/:id', loadChildren:'../productDetails/productDetails.module.ts#ProductDetailModule'},
    {path: 'cart-page', loadChildren:"../cart/cart.module.ts#CartModule"},
    { path: 'account-page', loadChildren:'../account/account.module.ts#AccountModule',canActivate: [AuthGuard]},
    { path:'allCategory-page',loadChildren:'../allCategory/allCategory.module.ts#AllCategoryModule'}
  ]}
];

export const ROUTES = RouterModule.forChild(routes);

