import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppHome } from './home/home.component' 
import { AppMarket } from './market/market.component'
import { AppGallery } from './gallery/gallery.component'
import { AppProduct } from "./product/product.component";
import { AppFeature } from "./feature/feature.component";
import { AppContactSupplier } from "./contactSupplier/contactSupplierForm.component";
import { FeedComponent } from "./graphql-feed.component";
const appRoutes: Routes = [ 
   { path: 'Home', component: AppHome },
   { path: 'sample', component: FeedComponent },
   {path: 'Market', component: AppMarket },
   {path: 'Gallery/:id', component: AppGallery },
   { path: 'Feature', component: AppFeature },
   {path: 'Product/:id', component: AppProduct },
   {path: 'ContactSupplier/:id', component: AppContactSupplier },
   { path: '',redirectTo: 'Home',pathMatch: 'full'},
  // { path: 'Inventory', component: AppInventory }, 
];

@NgModule({
imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRouteModule {}

export const routableComponents = [AppHome,AppMarket,AppGallery,AppProduct,AppFeature,AppContactSupplier,FeedComponent];