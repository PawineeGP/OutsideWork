import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooesLevelPageRoutingModule } from './chooes-level-routing.module';

import { ChooesLevelPage } from './chooes-level.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooesLevelPageRoutingModule
  ],
  declarations: [ChooesLevelPage]
})
export class ChooesLevelPageModule {}
