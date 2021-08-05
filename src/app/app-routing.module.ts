import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu/menu.page';

const routes: Routes = [
  { path: '', redirectTo: 'startup', pathMatch: 'full' },
  { path: 'parkingmanagement', redirectTo: 'startup', pathMatch: 'full' },
  { path: 'startup', loadChildren: () => import('./pages/startup/startup.module').then(m => m.startupModule) },

  {
    path: 'menu',
    component : MenuPage 
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.signupModule)
  },
  {
    path: 'vehicleSearch',
    loadChildren: () => import('./pages/vehicleSearch/vehicleSearch.module').then(m => m.vehicleSearchModule)
  },
  {
    path: 'contactlistwithvehicleinfo',
    loadChildren: () => import('./pages/contactListWithVehicleInfo/contactListWithVehicleInfo.module').then(m => m.contactListWithVehicleInfoModule)
  },
  {
    path: 'transactionHistory',
    loadChildren: () => import('./pages/transactionHistory/transactionHistory.module').then(m => m.transactionHistoryModule)
  },
  {
    path: 'applicationUserList',
    loadChildren: () => import('./pages/applicationUserList/applicationUserList.module').then(m => m.applicationUserListModule)
  },
  {
    path: 'rentPlanList',
    loadChildren: () => import('./pages/rentPlanList/rentPlanList.module').then(m => m.rentPlanListModule)
  },
  {
    path: 'vehicleInfoDetail',
    loadChildren: () => import('./pages/vehicleInfoDetail/vehicleInfoDetail.module').then(m => m.vehicleInfoDetailModule)
  },
  {
    path: 'billGenerate',
    loadChildren: () => import('./pages/billGenerate/billGenerate.module').then(m => m.billGenerateModule)
  }

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
