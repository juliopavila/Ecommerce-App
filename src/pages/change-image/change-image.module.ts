import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangeImagePage } from './change-image';

@NgModule({
  declarations: [
    ChangeImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChangeImagePage),
  ],
})
export class ChangeImagePageModule {}
