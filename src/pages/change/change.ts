import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { UserHttpProvider } from '../../providers/user-http/user-http';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change',
  templateUrl: 'change.html',
})
export class ChangePage {

  fg: FormGroup;
  profile: any[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private api: UserHttpProvider,
    public id : UserProvider,
  ) {
    this.fg = new FormGroup({
      user_id: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confPass: new FormControl(null, [Validators.required])
    }, this.passwordMatchValidator)
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('user_id'))
    let a = {
      'user_id': this.navParams.get('user_id')
    }
    this.profile.push(a);
  }

  /**
 * Metodo para evaluar si las claves son las mismas
 * @param fg Recibe como parametro el FormGroup
 */
  passwordMatchValidator = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('confPass').value ? null : { 'mismatch': true };
  }

  /**
 * Metodo para solicitar al servicio que realice la peticion para actualizar las notas
 * @returns void
 */
  changePassword(): void {
    if (this.fg.valid) {
      this.api.updatePass(this.fg.value)
        .subscribe(res => {
          if (res.status == 200) {
            this.presentAlert();
          }
        }, err => {
          console.log(err);
        });
    }
    console.log(this.fg.value);
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentConfirm(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to change your password?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            this.profile = [];
            this.changePassword();
          }
        }
      ]
    });
    alert.present();
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Successfully',
      subTitle: 'Password succesfully changed',
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.move(1);
          this.id.clean();
        }
      }]
    });
    alert.present();
  }

  /**
   * Metodo para redireccionar a otra pagina
   * @param {any} op Recibe el caso evaluar a donde se va redireccionar
   * @returns Returns void
   */
  move(op) {
    switch (op) {
      case 1: {
        this.navCtrl.setRoot(HomePage);
        break;
      }
    }
  }
}
