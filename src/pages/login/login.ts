import { DashboardPage } from './../dashboard/dashboard';
import { SignUpPage } from './../sign-up/sign-up';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserHttpProvider } from '../../providers/user-http/user-http';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  fg : FormGroup;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private api : UserHttpProvider,) {
    this.fg = new FormGroup({
      username: new FormControl (null, [Validators.required,Validators.pattern(/[A-Za-z]+/)]),
      password: new FormControl (null, [Validators.required]),
    })
  }

  ionViewDidLoad() {
  }

  /**
   * Metodo que toma los valores del form y los envia al servicio
   * para que realize la peticion al servidor y compruebe el usuario
   * @returns Void
   */
  login() : void {
    console.log(this.fg.value);
    if(this.fg.valid){
      console.log("Entrando hacer la peticion");
      this.api.login(this.fg.value)
        .subscribe(res => {
          if(res.status == 200){
            console.log("Inicio de sesion satisfactorio");
            //this.change(1);
          } else {
            console.log("Ocurrio un error");
            this.presentAlert();
          }
        }, err => {
          console.log(err);
        });
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert() : void {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Invalid user or password',
      buttons: [{
        text : "Accept",
        role : "Accept",
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
  change(op) : void {
    switch(op){
      case 1 : {
        this.navCtrl.setRoot(SignUpPage);
        break;
      }
      case 2 : {
        this.navCtrl.setRoot(DashboardPage);
        break;
      }
    }
  }
}
