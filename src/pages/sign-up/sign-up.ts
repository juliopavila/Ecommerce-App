import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginPage } from '../login/login';
import { UserHttpProvider } from '../../providers/user-http/user-http';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  fg: FormGroup;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingController: LoadingController,
    private api: UserHttpProvider,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
  ) {
    this.fg = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z]+/)]),
      lastname: new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z]+/)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
      username: new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl(null, [Validators.required]),
      confPass: new FormControl(null, [Validators.required]),
    }, this.passwordMatchValidator)
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(false);
  }

  /**
 * Metodo para que muestre un spinner de alerta
 * mientra realiza la peticion
 */
presentLoadingDefault() {
  this.loading = this.loadingController.create({
    content: 'Please wait...'
  });
  this.loading.present();
}
  /**
   * Metodo para evaluar si las claves son las mismas
   * @param fg Recibe como parametro el FormGroup
   */
  passwordMatchValidator = function (fg: FormGroup) {
    return fg.get('password').value === fg.get('confPass').value ? null : { 'mismatch': true };
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para crear un usuario
   * @returns void
   */
  register(): void {
    if (this.fg.valid) {
      this.api.postSignUp(this.fg.value)
        .subscribe(res => {
          console.log(res.status);
          if (res.status == 200) {
            this.loading.dismiss();
            this.presentAlert();
          } else {
            this.loading.dismiss();
            this.errorAlert();
          }
        }, err => {
          this.errorAlert();
        });
    }
    else {
      console.log("No es valido");
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Successfully',
      subTitle: 'Account succesfully created',
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.redirect(1);
        }
      }]
    });
    alert.present();
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  errorAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'The account cannot be created, try again.',
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
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
  redirect(op): void {
    switch (op) {
      case 1: {
        this.navCtrl.setRoot(LoginPage);
        break;
      }
      case 2: {
        this.navCtrl.setRoot(HomePage);
        break;
      }
    }
  }

}
