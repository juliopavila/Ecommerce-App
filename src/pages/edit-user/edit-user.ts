import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserHttpProvider } from '../../providers/user-http/user-http';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {

  profile: any[] = [];
  fg: FormGroup;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private api: UserHttpProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
    this.fg = new FormGroup({
      user_id: new FormControl(null, [Validators.required]),
      user_name: new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z]+/)]),
      user_lastname: new FormControl(null, [Validators.required, Validators.pattern(/[A-Za-z]+/)]),
      user_email: new FormControl(null, [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]),
    })
  }


  ionViewDidLoad() {
    let a = {
      'name': this.navParams.get('user_name'),
      'lastname': this.navParams.get('user_lastname'),
      'email': this.navParams.get('user_email'),
      'user_id': this.navParams.get('user_id')
    }
    this.profile.push(a);
  }

  /**
   * Metodo para solicitar al servicio que realice la peticion para actualizar las notas
   * @returns void
   */
  edit(): void {
    this.presentLoadingDefault();
    if (this.fg.valid) {
      this.api.updateProfile(this.fg.value)
        .subscribe(res => {
          if (res.status == 200) {
            this.loading.dismiss();
            this.presentAlert();
          }
        }, err => {
          this.loading.dismiss();
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
      title: 'Confirm Update Profile',
      message: 'Do you want to update your profile?',
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
            this.edit();
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
      subTitle: 'Note succesfully updated',
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.move(1);
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
        this.navCtrl.setRoot(ProfilePage);
        break;
      }
    }
  }

  /**
  * Metodo para que muestre un spinner de alerta
  * mientra realiza la peticion
  */
  presentLoadingDefault() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }
}
