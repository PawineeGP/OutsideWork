import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Laevel1Page } from './laevel1.page';

const routes: Routes = [
  {
    path: '',
    component: Laevel1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Laevel1PageRoutingModule {}
