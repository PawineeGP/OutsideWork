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
  },
  {
    path: 'login',
    loadChildren: () => import('./Auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'video-tutorial',
    loadChildren: () => import('./pageControl/video-tutorial/video-tutorial.module').then( m => m.VideoTutorialPageModule)
  },
  {
    path: 'chooes-level',
    loadChildren: () => import('./pageControl/chooes-level/chooes-level.module').then( m => m.ChooesLevelPageModule)
  },
  {
    path: 'level1',
    loadChildren: () => import('./pageControl/level1/level1.module').then( m => m.Level1PageModule)
  },
  {
    path: 'level2',
    loadChildren: () => import('./pageControl/level2/level2.module').then( m => m.Level2PageModule)
  },
  {
    path: 'level3',
    loadChildren: () => import('./pageControl/level3/level3.module').then( m => m.Level3PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
