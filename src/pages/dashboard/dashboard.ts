import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, MenuController, ModalController } from 'ionic-angular';
import { ProductsHttpProvider } from '../../providers/products-http/products-http';
import { UrlProvider } from '../../providers/url/url';
import { FormControl } from '@angular/forms';
import { ShoppingModalComponent } from '../../components/shopping-modal/shopping-modal';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  products: any[] = [];
  urlApi;
  searchTerm: string = '';
  items: any;
  searchControl: FormControl;
  keySearch: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public id: UserProvider,
    private viewCtrl: ViewController,
    public menuCtrl: MenuController,
    public api: ProductsHttpProvider,
    public url: UrlProvider,
    public modalCtrl: ModalController
  ) {
    this.searchControl = new FormControl();
  }

  /**
   * Metodo para no mostrar el back-button
  */
  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

  /**
   * Metodo para al cargar la vista ejecute estos metodos
   */
  ionViewDidLoad() {
    this.menuCtrl.enable(true);
    this.getProducts();
  }

  /**
   * Metodo para relizar la solicitud al provider para
   * ejecutar la peticion
   */
  getProducts() {
    this.products = [];
    this.api.getAllProducts()
      .subscribe(res => {
        this.products = res;
        this.products.forEach(p => p.state = true);
        this.urlApi = this.url.getUrl();
        console.log(this.products);
      }, err => {
        console.log(err);
      })
  }

  /**
   * Metodo para realizar la busqueda del searchbar cada 3 letras
   * y si consigue realiza cambio de estados
   * @param key Recibe como parametro el texto
  */
  filterProducts(key: string) {
    if (((key).split("")).length === 3) {
      this.products.forEach(p => {
        if (((p.product_title).toLowerCase()).includes(((key).trim()).toLowerCase())) {
          p.state = true;
        } else {
          console.log('The product was not found :(');
          p.state = false
        }
      })
    }
  }

  /**
   *  Metodo para cambiar de estado del evento
   * @param e Recibe como parametro el evento
   */
  onCancel(e) {
    if (e.target.value == "") {
      this.products.forEach(p => p.state = true);
    }
  }

  presentCommentsModal(product, owner){
    let data = {
      product_id : product,
      user_id : this.id.id[0],
      owner_id : owner
    }
    console.log(data);
    let modal = this.modalCtrl.create(ShoppingModalComponent, data);
    modal.present();
  }
}
