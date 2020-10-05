import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Laevel2Page } from './laevel2.page';

const routes: Routes = [
  {
    path: '',
    component: Laevel2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Laevel2PageRoutingModule {}
