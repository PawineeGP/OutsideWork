import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },  {
    path: 'login',
    loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'laevel1',
    loadChildren: () => import('./pageControl/laevel1/laevel1.module').then( m => m.Laevel1PageModule)
  },
  {
    path: 'laevel2',
    loadChildren: () => import('./pageControl/laevel2/laevel2.module').then( m => m.Laevel2PageModule)
  },
  {
    path: 'laevel3',
    loadChildren: () => import('./pageControl/laevel3/laevel3.module').then( m => m.Laevel3PageModule)
  },
  {
    path: 'video-tutorial',
    loadChildren: () => import('./pageControl/video-tutorial/video-tutorial.module').then( m => m.VideoTutorialPageModule)
  },
  {
    path: 'chooes-level',
    loadChildren: () => import('./pageControl/chooes-level/chooes-level.module').then( m => m.ChooesLevelPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
