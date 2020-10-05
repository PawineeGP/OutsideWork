import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Laevel3Page } from './laevel3.page';

const routes: Routes = [
  {
    path: '',
    component: Laevel3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Laevel3PageRoutingModule {}
