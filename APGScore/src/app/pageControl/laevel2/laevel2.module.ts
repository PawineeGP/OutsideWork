import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Laevel2PageRoutingModule } from './laevel2-routing.module';

import { Laevel2Page } from './laevel2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Laevel2PageRoutingModule
  ],
  declarations: [Laevel2Page]
})
export class Laevel2PageModule {}
