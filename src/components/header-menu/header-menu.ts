import { Component } from '@angular/core';
import { MenuController, App, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { ProfilePage } from '../../pages/profile/profile';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';
import { UserHttpProvider } from '../../providers/user-http/user-http';
import { ProductsPage } from '../../pages/products/products';


@Component({
  selector: 'header-menu',
  templateUrl: 'header-menu.html'
})
export class HeaderMenuComponent {

  activeMenu: string;

  constructor(
    public menuCtrl: MenuController,
    public app: App,
    public id : UserProvider,
    private api: UserHttpProvider,
  ) {
  }

  menuActive() {
    this.activeMenu = 'menu1';
    this.menuCtrl.enable(true, 'menu1');
    this.menuCtrl.enable(false, 'LoginPage');
  }

  /**
   * Metodo del Side Menu para realizar logout
   * @returns Void
   */
  exitapp() : void {
    this.menuCtrl.close();
    this.api.logout()
    .subscribe(res => {
      if(res.status == 200){
        this.id.clean();
        let nav = this.app.getRootNav();
        nav.setRoot(HomePage);
      }
    })
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
      case 2 : {
        nav.setRoot(ProductsPage);
        break;
      }
      case 3 : {
        nav.setRoot(ProfilePage);
        break;
      }
    }
  }
}
