import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'pick-up-order-page',
    loadChildren: () => import('./pick-up-order-page/pick-up-order-page.module').then( m => m.PickUpOrderPagePageModule)
  },
  {
    path: 'delivery-order-page',
    loadChildren: () => import('./delivery-order-page/delivery-order-page.module').then( m => m.DeliveryOrderPagePageModule)
  },
  {
    path: 'delivery-item-details/:id',
    loadChildren: () => import('./delivery-item-details/delivery-item-details.module').then( m => m.DeliveryItemDetailsPageModule)
  },
  {
    path: 'pick-up-item-page',
    loadChildren: () => import('./pick-up-item-page/pick-up-item-page.module').then( m => m.PickUpItemPagePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
