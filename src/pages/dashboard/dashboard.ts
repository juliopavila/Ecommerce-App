import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { ProductsHttpProvider } from '../../providers/products-http/products-http';
import { UrlProvider } from '../../providers/url/url';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  products: any[] = [];
  urlApi;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public id : UserProvider,
    private viewCtrl: ViewController,
    public menuCtrl: MenuController,
    public api: ProductsHttpProvider,
    public url: UrlProvider
  ) {
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    this.api.getAllProducts()
    .subscribe(res => {
      this.products = res;
      this.urlApi = this.url.getUrl();
      console.log(this.products);
    }, err => {
      console.log(err);
    })
  }

}
