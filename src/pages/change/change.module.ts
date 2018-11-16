import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePage } from './change';

@NgModule({
  declarations: [
    ChangePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePage),
  ],
})
export class ChangePageModule {}
