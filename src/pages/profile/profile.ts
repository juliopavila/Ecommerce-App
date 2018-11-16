import { UserHttpProvider } from './../../providers/user-http/user-http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditUserPage } from '../edit-user/edit-user';
import { ChangePage } from '../change/change';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  dates: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: UserHttpProvider,
    private alertCtrl: AlertController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
  }

  /**
   * Metodo para al momento de cargar la vista guarde
   * en un arreglo el perfil del usuario
   */
  ngOnInit() {
    this.dates = [];
    this.api.getProfile()
      .subscribe(res => {
        this.dates = res;
        console.log(this.dates);
      }, err => {
        console.log(err);
      })
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para eliminar un usuario
   * y las almacene en un arreglo
   * @returns void
   */
  delete(): void {
    this.api.deleteProfile()
      .subscribe(res => {
        console.log(res);
        if (res.status == 200) {
          this.redirect(1);
        }
      }, err => {
        console.log(err);
      });
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  redirect(op): void {
    switch (op) {
      case 1: {
        this.navCtrl.setRoot(HomePage);
        break;
      }
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Do you want to delete your account?',
      message: 'This action cannot be undone',
      buttons: [{
        text: "Cancel",
        role: "Cancel",
        handler: () => {
        }
      }, {
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.delete();
        }
      }]
    });
    alert.present();
  }

  /**
  * Metodo para editar el perfil del usuario
  * redireccionado a la vista para editar
  * @returns void
  */
  edit(data): void {
    this.navCtrl.push(EditUserPage, data);
  }

  /**
  * Metodo para editar el perfil del usuario
  * redireccionado a la vista para editar
  * @returns void
  */
  changepass(body): void {
    this.navCtrl.push(ChangePage, body);
  }
}
