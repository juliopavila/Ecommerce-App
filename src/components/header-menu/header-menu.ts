import { Component } from '@angular/core';
import { MenuController, App, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { DashboardPage } from '../../pages/dashboard/dashboard';

/**
 * Generated class for the HeaderMenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  constructor(
    public menuCtrl: MenuController,
    public app: App,
  ) {
  }

  /**
   * Metodo del Side Menu para realizar logout
   * @returns Void
   */
  exitapp() : void {
    this.menuCtrl.close();
    let nav = this.app.getRootNav();
    nav.setRoot(HomePage);
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  redirect(op) : void {
    this.menuCtrl.close();
    let nav = this.app.getRootNav();
    switch(op){
      case 1 : {
        nav.setRoot(DashboardPage);
        break;
      }
    }
  }
}
