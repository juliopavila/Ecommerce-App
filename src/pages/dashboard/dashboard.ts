import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public id : UserProvider,
    private viewCtrl: ViewController,
    public menuCtrl: MenuController,
  ) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
  }


}
