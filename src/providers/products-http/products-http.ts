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

/**
 * Url del servidor
 */

@Injectable()
export class ProductsHttpProvider {

  path: string = '';

  constructor(
    public http: HttpClient,
    public user: UserProvider,
    private transfer: FileTransfer,
    public loadingCtrl : LoadingController,
    public url : UrlProvider
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

  uploadFile (body, base64Image) {
    return new Promise((res, rej) => {
      const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts`;
      //Create File Transfer Object
      const fileTransfer : FileTransferObject = this.transfer.create();
      //random int
      let random = Math.floor(Math.random() * 100);
      //options transfer
      let options : FileUploadOptions = {
        fileKey: 'file',
        fileName : 'img_'+random+".jpg",
        chunkedMode: false,
        httpMethod : 'POST',
        mimeType: "image/jpeg",
        headers: {},
        params : body
      }
      //file transfer action
      fileTransfer.upload(base64Image, url ,options)
      .then((data) => {
        res(200)
        console.log(data);
      }, (err) => {
        res(400);
        console.log(JSON.stringify(err));
      })
    })
  }

  getAllProducts () : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/GetAllProducts`;
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  getProducts () : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts?user_id=${this.user.id[0]}`;
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteProducts (user_id, product_id) : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts?user_id=${user_id}&product_id=${product_id}`;
    return this.http.delete(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateFile (body, base64Image) {
    return new Promise((res, rej) => {
      const url = `${this.url.getUrl()}/ShoppingCart/CRUDProducts`;
      //Create File Transfer Object
      const fileTransfer : FileTransferObject = this.transfer.create();
      //random int
      let random = Math.floor(Math.random() * 100);
      //options transfer
      let options : FileUploadOptions = {
        fileKey: 'file',
        fileName : 'img_'+random+".jpg",
        chunkedMode: false,
        httpMethod : 'PUT',
        mimeType: "image/jpeg",
        headers: {},
        params : body
      }
      //file transfer action
      fileTransfer.upload(base64Image, url ,options)
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
