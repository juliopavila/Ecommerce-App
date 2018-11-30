import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CartServiceProvider {

  productsInCart: any[] = [];
  prod: any[] = [];

  constructor(public http: HttpClient, public alertCtrl: AlertController) {
  }

  getProductsInCart(p) {
    this.productsInCart = [];
    let quant = p;
    quant.forEach(element => {
      element.quantity = 0;
    });
    this.productsInCart.push(quant);
  }

  addToCart(p) {
    p.quantity++;
  }

  updateQuantity(p, number) {
    if (p.product_stock >= number) {
      p.quantity = number;
    } else {
      this.alert('Error','Unfortunately there is no in stock');
    }
  }

  cart() {
    this.prod = [];
    this.productsInCart.map(p => {
      p.map(t => {
        if (t.quantity != 0) {
          this.prod.push(t);
        }
      });
    })
  }

  removeItem(p) {
    p.quantity = 0;
  }

  /**
* Metodo para mostrar alerta de confirmacion
* @returns void
*/
  alert(t, msg): void {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: msg,
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
        }
      }]
    });
    alert.present();
  }
}
