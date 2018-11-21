import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { LoadingController } from 'ionic-angular';
import { UrlProvider } from './../url/url';

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    })
};

@Injectable()
export class ProductsHttpProvider {

  path: string = '';

  constructor(
    public http: HttpClient,
    public user: UserProvider,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController,
    public url: UrlProvider
  ) {
  }

  /**
   * Metodo para manejar errores.
   * @param error Recibe como parametro el error que proviene de la peticion.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Maneja un error del lado del cliente o problemas de red
      console.error('An error occurred:', error.error.message);
    } else {
      // El Back-End devolvera un codigo de error
      // El body de respuesta puede manejar dichos errores
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Retorna un observable con un mensaje de error.
    return ('Something bad happened; please try again later.');
  }

  /**
   * Metodo para subir la imagen al servidor y crear un producto
   * @param body el form de los productos
   * @param base64Image el archivo con la imagen en base 64
   */
  uploadFile(body, base64Image) {
    return new Promise((res, rej) => {
      const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts`;
      //Creamos un objeto file transfer
      const fileTransfer: FileTransferObject = this.transfer.create();
      //Creamos un numero aleatorio que posteriormente sera el nombre de la imagen
      let random = Math.floor(Math.random() * 100);
      //Opciones de la transferencia
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'img_' + random + ".jpg",
        chunkedMode: false,
        httpMethod: 'POST',
        mimeType: "image/jpeg",
        headers: {},
        params: body
      }
      //Accion para ejecutar la peticion http al endpoint
      fileTransfer.upload(base64Image, url, options)
        .then((data) => {
          res(200)
          console.log(data);
        }, (err) => {
          res(400);
          console.log(JSON.stringify(err));
        })
    })
  }

  /**
   * Metodo para realizar la peticion al servidor de todos los productos
   * @returns Retorna un json con todos los productos
   */
  getAllProducts(): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/GetAllProducts`;
    return this.http.get(url, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Metodo para realizar la peticion al servidor de todos los productos
  * @returns Retorna un json con todos los productos
  */
  getProducts(): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts?user_id=${this.user.id[0]}`;
    return this.http.get(url, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Metodo para realizar la peticion al servidor de  los productos
  * @returns Retorna un json con los productos de un usuario
  */
  deleteProducts(user_id, product_id): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts?user_id=${user_id}&product_id=${product_id}`;
    return this.http.delete(url, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Metodo para subir la imagen al servidor y actualizar un producto
   * @param body el form de los productos
   * @param base64Image el archivo con la imagen en base 64
   */
  updateFile(body, base64Image) {
    return new Promise((res, rej) => {
      const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts`;
      //Creamos un objeto file transfer
      const fileTransfer: FileTransferObject = this.transfer.create();
      //Creamos un numero aleatorio que posteriormente sera el nombre de la imagen
      let random = Math.floor(Math.random() * 100);
      //Opciones de la transferencia
      let options: FileUploadOptions = {
        fileKey: 'file',
        fileName: 'img_' + random + ".jpg",
        chunkedMode: false,
        httpMethod: 'PUT',
        mimeType: "image/jpeg",
        headers: {},
        params: body
      }
      //Accion para ejecutar la peticion http al endpoint
      fileTransfer.upload(base64Image, url, options)
        .then((data) => {
          res(200)
          console.log(data);
        }, (err) => {
          res(400);
          console.log(JSON.stringify(err));
        })
    })
  }
}
