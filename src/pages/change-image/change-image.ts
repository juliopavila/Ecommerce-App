import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ProductsHttpProvider } from '../../providers/products-http/products-http';
import { ProductsPage } from '../products/products';

@IonicPage()
@Component({
  selector: 'page-change-image',
  templateUrl: 'change-image.html',
})
export class ChangeImagePage {


  image: any;
  product_id;
  user_id;
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    public api: ProductsHttpProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    this.product_id = this.navParams.get('product_id');
    this.user_id = this.navParams.get('user_id');
  }

  /**
    * Metodo para mostrar alerta de donde se tomara la imagen
    * @returns void
  */
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takeFromLib();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  /**
   * Metodo para tomar una foto con la camara nativa del telefono
   */
  takePicture(): void {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  /**
   * Metodo para tomar la imagen de la galeria
   */
  takeFromLib() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle errory
    });
  }

  uploadImage() {
    this.presentLoadingDefault();
    let body = {
      "user_id": this.user_id,
      "product_id": this.product_id
    }
    this.api.updateFile(body, this.image)
      .then((res: any) => {
        if (res === 200) {
          this.loading.dismiss();
          this.uploadAlert('Confirmation', 'Upload Succesfully');
          this.change(1);
        } else {
          this.loading.dismiss();
          console.log("Error");
        }
      })
  }

  /**
* Metodo para redireccionar a otra pagina
* @param {any} op Recibe el caso evaluar a donde se va redireccionar
* @returns Returns void
*/
  change(op): void {
    switch (op) {
      case 1: {
        this.navCtrl.setRoot(ProductsPage);
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
      content: 'Please wait ...'
    });
    this.loading.present();
  }

  /**
* Metodo para mostrar alerta de confirmacion
* @returns void
*/
  uploadAlert(t, msg): void {
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: msg,
      buttons: [{
        text: "Accept",
        role: "Accept",
        handler: () => {
          this.change(1);
        }
      }]
    });
    alert.present();
  }
}
