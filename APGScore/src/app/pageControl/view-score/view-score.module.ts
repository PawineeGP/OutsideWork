import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewScorePageRoutingModule } from './view-score-routing.module';

import { ViewScorePage } from './view-score.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewScorePageRoutingModule
  ],
  declarations: [ViewScorePage]
})
export class ViewScorePageModule {}
