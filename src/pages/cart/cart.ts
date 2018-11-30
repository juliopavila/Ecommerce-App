import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { CartServiceProvider } from './../../providers/cart-service/cart-service';
import { ProductsHttpProvider } from './../../providers/products-http/products-http';
import { DashboardPage } from './../dashboard/dashboard';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  products: any[] = [];
  urlApi;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public url: UrlProvider,
    public cartService: CartServiceProvider,
    public alertCtrl: AlertController,
    public api: ProductsHttpProvider
  ) {
  }

  ionViewDidLoad() {
    this.products = [];
    this.urlApi = this.url.getUrl();
    let data = this.cartService.prod;
    data.map(d => {
      this.products.push(d);
    })
    console.log(this.products);
  }

  remove(p) {
    let index = this.products.indexOf(p);
    let del = this.cartService.prod.indexOf(p);
    let supr = this.cartService.productsInCart.indexOf(p);
    if (index > -1) {
      this.products.splice(index, 1);
    }
    if (del > -1 && supr > -1) {
      this.cartService.prod.splice(del, 1);
      this.cartService.productsInCart.splice(del, 1);
    }
    this.cartService.removeItem(p);
  }

  presentPrompt(p) {
    let alert = this.alertCtrl.create({
      title: 'Update quantity',
      inputs: [
        {
          name: 'quantity',
          placeholder: p.quantity
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          role: 'accept',
          handler: data => {
            this.cartService.updateQuantity(p, data.quantity);
          }
        }]
    });
    alert.present();
  }

  checkout() {
    let checkOutArray = [];
    let total = 0;
    // precio quantity, id
    checkOutArray = this.products.map(product => {
      total = total + ((parseInt(product.quantity)*product.product_price));
      return {
        product_id: product.product_id,
        product_quantity: parseInt(product.quantity),
        product_price: product.product_price,
      }
    });
    this.api.checkout(checkOutArray)
    .subscribe(res =>{
      if(res.status == 200){
        this.alert("Succesfully","Your orden has been place.","Your total is: $"+total);
      }
    })
  }

    /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
 alert(t, msg, text): void {
  let alert = this.alertCtrl.create({
    title: t,
    subTitle: msg,
    message: text,
    buttons: [{
      text: "Accept",
      role: "Accept",
      handler: () => {
        this.navCtrl.setRoot(DashboardPage);
      }
    }]
  });
  alert.present();
}

}
