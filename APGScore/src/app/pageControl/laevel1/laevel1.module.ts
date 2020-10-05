import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Laevel1PageRoutingModule } from './laevel1-routing.module';

import { Laevel1Page } from './laevel1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Laevel1PageRoutingModule
  ],
  declarations: [Laevel1Page]
})
export class Laevel1PageModule {}
