import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  redirect(op) : void {
    switch(op){
      case 1 : {
        this.navCtrl.setRoot(LoginPage);
        break;
      }
      case 2 : {
        this.navCtrl.setRoot(SignUpPage);
        break;
      }
    }
  }

}
