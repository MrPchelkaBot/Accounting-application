import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-client',
    loadChildren: () => import('./add-client/add-client.module').then(m => m.AddClientPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'info-client/:id',
    loadChildren: () => import('./info-client/info-client.module').then(m => m.InfoClientPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-order',
    loadChildren: () => import('./add-order/add-order.module').then( m => m.AddOrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'info-order/:id',
    loadChildren: () => import('./info-order/info-order.module').then( m => m.InfoOrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'costs',
    loadChildren: () => import('./costs/costs.module').then( m => m.CostsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-cost',
    loadChildren: () => import('./add-cost/add-cost.module').then( m => m.AddCostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'income',
    loadChildren: () => import('./income/income.module').then( m => m.IncomePageModule),
    canActivate: [AuthGuard]
  },








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
