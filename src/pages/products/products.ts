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
  upfg : FormGroup;
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
      user_id: new FormControl(null, [Validators.required]),
    });
    this.upfg = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      stock: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      user_id: new FormControl(null, [Validators.required]),
      product_id: new FormControl(null, [Validators.required])
    })

  }

  ionViewDidLoad() {
    this.id.id.map(p => {
      this.uId = p;
    });
    this.getProducts();
  }

  /**
   * Metodo para realizar la peticion para subir una imagen creando un producto
  */
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

  showLoader(): any {
    return this.loadingCtrl.create({ content: 'Uploading product...' });
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
          this.update();
        }
      }]
    });
    alert.present();
  }

  /**
   * Metodo para obtener los productos del usuario realizando la peticion
   * al provider
   */
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

  /**
   * Metodo para obtener eliminar un producto del usuario
   */
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
   * Metodo para obtener actualizar un producto del usuario
   * agregandole todos los campos
   */
  update(){
    if (this.upfg.valid) {
      console.log(this.upfg.value);
      this.api.updateFile(this.upfg.value, this.image)
        .then((res: any) => {
          if (res === 200) {
            alert('Update Succesfully');
            this.change(1);
          } else {
            console.log("error")
          }
        })
    }
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
