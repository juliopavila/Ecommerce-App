import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsHttpProvider } from '../../providers/products-http/products-http';
import { UserProvider } from '../../providers/user/user';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { UrlProvider } from '../../providers/url/url';



@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  fg: FormGroup;
  products: string = "add";
  isAndroid: boolean = false;
  image: any;
  uId: any;
  products_data = [];
  urlApi

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    private camera: Camera,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public api: ProductsHttpProvider,
    public id: UserProvider,
    public loadingCtrl: LoadingController,
    public url: UrlProvider
  ) {
    this.isAndroid = platform.is('android');
    this.fg = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required])
    })
  }

  ionViewDidLoad() {
    this.id.id.map(p => {
      this.uId = p;
    });
    this.getProducts();
  }

  uploadImage() {
    if (this.fg.valid) {
      this.api.uploadFile(this.fg.value, this.image)
        .then((res: any) => {
          if (res === 200) {
            alert('Upload Succesfully');
            this.change(1);
          } else {
            console.log("error")
          }
        })
    }
  }

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

  showLoader(): any {
    return this.loadingCtrl.create({ content: 'Uploading product...' });
  }

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
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlert(user_id, product_id): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Do you want to delete this product?',
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
          this.delete(user_id, product_id);
        }
      }]
    });
    alert.present();
  }

  /**
  * Metodo para mostrar alerta de confirmacion
  * @returns void
  */
  presentAlertUpdate(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      subTitle: 'Do you want to update this product?',
      buttons: [{
        text: "Cancel",
        role: "Cancel",
        handler: () => {
        }
      }, {
        text: "Accept",
        role: "Accept",
        handler: () => {
        }
      }]
    });
    alert.present();
  }

  getProducts() {
    this.products_data = [];
    this.api.getProducts()
      .subscribe(res => {
        this.products_data = res;
        this.urlApi = this.url.getUrl();
        console.log(this.products);
      }, err => {
        console.log(err);
      })
  }

  delete(user_id, product_id) {
    this.api.deleteProducts(user_id, product_id)
    .subscribe(res => {
      if(res.status == 200){
        this.change(1);
      }
    }, err => {
      console.log(err);
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
}
