import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController, NavController } from 'ionic-angular';
import { CommentsProvider } from './../../providers/comments/comments';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';


@Component({
  selector: 'shopping-modal',
  templateUrl: 'shopping-modal.html'
})
export class ShoppingModalComponent {

  fg: FormGroup;
  fgu: FormGroup;
  product_owner;
  product_id;
  user_id
  prodComments: any[] = [];
  canDelete = false;
  state = {};

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public api: CommentsProvider,
    public alertCtrl: AlertController,
    public user: UserProvider
  ) {
    this.fg = new FormGroup({
      user_id: new FormControl(null, [Validators.required]),
      product_id: new FormControl(null, [Validators.required]),
      comment_content: new FormControl(null, [Validators.required])
    });
    this.fgu = new FormGroup({
      comment_id: new FormControl(null, [Validators.required]),
      comment_content: new FormControl(null, [Validators.required])
    })
  }

  ionViewDidLoad() {
    this.product_owner = this.navParams.get('owner_id');
    this.user_id = this.navParams.get('user_id');
    this.product_id = this.navParams.get('product_id');
    console.log(this.product_owner);
    this.comment();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    if (this.fg.valid) {
      this.api.addComment(this.fg.value)
        .subscribe(res => {
          if (res.status == 200) {
            this.presentAlert('Comment succesfully added.');
          } else {
            console.log("Ocurrio un error");
          }
        })
    }
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert(msg): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: msg,
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.comment();
        }
      }]
    });
    alert.present();
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentDeleteAlert(comment_id): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to delete this comment?',
      buttons: [
        {
          text: "Cancel",
          role: "Cancel",
          handler: () => {
          }
        }, {
          text: "Accept",
          role: "Accept",
          handler: () => {
            this.delete(comment_id);
          }
        }]
    });
    alert.present();
  }

  /**
* Metodo para mostrar alerta de confirmacion
* @returns void
*/
  presentUpdateAlert(comment_id): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Do you want to update this comment?',
      buttons: [
        {
          text: "Cancel",
          role: "Cancel",
          handler: () => {
          }
        }, {
          text: "Accept",
          role: "Accept",
          handler: () => {
            this.update();
          }
        }]
    });
    alert.present();
  }

  /**
   *
   */
  comment() {
    this.prodComments = [];
    this.api.getComments(this.product_id)
      .subscribe(res => {
        this.prodComments = res;
        this.prodComments.forEach(p => {
          if (this.user.id[0] == this.product_owner) {
            p.owner = true;
          }
          else {
            p.owner = false;
          }
          if (this.user.id[0] == p.user_id) {
            p.state = true;
          }
          else {
            p.state = false;
          }
        });
      })
  }

  /**
   *
  */
  delete(id) {
    console.log(id);
    this.api.deleteComments(id)
      .subscribe(res => {
        if (res.status == 200) {
          this.presentAlert('Comment succesfully deleted.');
        } else {
          console.log("error");
        }
      })
  }

  /**
   * Update
   */
  update() {
    if (this.fgu.valid) {
      this.api.update(this.fgu.value)
        .subscribe(res => {
          if (res.status == 200) {
            this.presentAlert('Comment succesfully updated.');
          }
          else {
            console.log("Ocurrio un error");
          }
        })
    }
    else {
      this.presentAlert("Invalid text.");
    }
  }
}
