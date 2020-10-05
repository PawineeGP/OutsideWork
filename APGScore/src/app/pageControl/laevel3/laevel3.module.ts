import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Laevel3PageRoutingModule } from './laevel3-routing.module';

import { Laevel3Page } from './laevel3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Laevel3PageRoutingModule
  ],
  declarations: [Laevel3Page]
})
export class Laevel3PageModule {}
