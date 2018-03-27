import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';
import { AuthGuard } from './authGuard';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuard] },
   
    { path: 'brandDetail-page/:id' , loadChildren:'../brandDetail/brandDetail.module.ts#BrandDetailModule',canActivate: [AuthGuard]},
    { path: 'customer-page' ,loadChildren:'../customer/customer.module.ts#CustomerModule',canActivate: [AuthGuard]},
    { path: 'feedbacks-page' , loadChildren:'../feedbacks/feedbacks.module.ts#FeedbacksModule',canActivate: [AuthGuard]},
    { path:'productDetail-page/:id', loadChildren:'../productDetails/productDetails.module.ts#ProductDetailsModule',canActivate: [AuthGuard]},
    {path: 'addProduct-page/:id', loadChildren:"../addProduct/addProduct.module.ts#AddProductModule",canActivate: [AuthGuard]},
    { path: 'addBrand-page', loadChildren:'../addBrand/addBrand.module.ts#AddBrandModule',canActivate: [AuthGuard]},
    {path:'interests-page',loadChildren:'../interests/interests.module.ts#InterestsModule',canActivate: [AuthGuard]},
    {path:'orders-page',loadChildren:'../orders/orders.module.ts#OrdersModule',canActivate: [AuthGuard]},
    {path:'products-page/:id',loadChildren:'../products/products.module.ts#ProductsModule',canActivate: [AuthGuard]},
    {path:'addInterest-page',loadChildren:'../addInterest/addInterest.module.ts#AddInterestModule',canActivate: [AuthGuard]},
    { path:'customerDetails-page/:id', loadChildren:'../customerDetails/customerDetails.module.ts#CustomerDetailsModule',canActivate: [AuthGuard]},
    {path:'feedbackDetails-page/:id', loadChildren:'../feedbackDetails/feedbackDetails.module.ts#FeedbackDetailsModule',canActivate: [AuthGuard]},
    {path:'orderDetails-page/:id',loadChildren:'../orderDetails/orderDetails.module.ts#OrderDetailsModule',canActivate: [AuthGuard]}

    
  ]}
];

export const ROUTES = RouterModule.forChild(routes);

