import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { ProductsHttpProvider } from '../../providers/products-http/products-http';
import { UrlProvider } from '../../providers/url/url';
import { FormControl } from '@angular/forms';
import { empty } from 'rxjs/Observer';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  products: any[] = [];
  urlApi;
  searchTerm: string = '';
  items: any;
  searchControl: FormControl;
  keySearch: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public id: UserProvider,
    private viewCtrl: ViewController,
    public menuCtrl: MenuController,
    public api: ProductsHttpProvider,
    public url: UrlProvider
  ) {
    this.searchControl = new FormControl();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.getProducts();
    this.searchControl.valueChanges.subscribe(search => {
    });
  }

  getProducts() {
    this.products = [];
    this.api.getAllProducts()
      .subscribe(res => {
        this.products = res;
        this.products.forEach(p => p.state = true);
        this.urlApi = this.url.getUrl();
        console.log(this.products);
      }, err => {
        console.log(err);
      })
  }

  filterProducts(key: string) {
    if (((key).split("")).length === 3) {
      this.products.forEach(p => {
        if (((p.product_title).toLowerCase()).includes(((key).trim()).toLowerCase())) {
          p.state = true;
        } else {
          console.log('The product was not found :(');
          p.state = false
        }
      })
    }
  }

  onCancel(e) {
    if (e.target.value == "") {
      this.products.forEach(p => p.state = true);
    }
  }
}
