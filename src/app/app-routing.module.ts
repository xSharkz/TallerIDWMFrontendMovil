import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/Auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab1',
    pathMatch: 'full',
  },
  {
    path: 'tab1',
    loadChildren: () =>
      import('./tab1/tab1.module').then((m) => m.Tab1PageModule),
  },
  {
    path: 'tab2',
    loadChildren: () =>
      import('./tab2/tab2.module').then((m) => m.Tab2PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tab3',
    loadChildren: () =>
      import('./tab3/tab3.module').then((m) => m.Tab3PageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'tab1',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
