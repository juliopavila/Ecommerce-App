import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProvider } from '../user/user';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

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
export class CommentsProvider {

  constructor(public http: HttpClient, public user: UserProvider, public url: UrlProvider) {
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
   * Metodo de enviar la peticion para agregar un comentario
   * @returns Observable con la respuesta del servidor
   */
  addComment(body): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDComments`;
    return this.http.post(url, body, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Metodo para realizar la peticion al servidor de los comentarios
  * @returns Retorna un json con todos los comentarios
  */
  getComments(id): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDComments?product_id=${id}`;
    return this.http.get(url, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Metodo para realizar la peticion al servidor de eliminar un comentario
  * @returns Retorna un json con el status
  */
  deleteComments(comment_id): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDComments?comment_id=${comment_id}`;
    return this.http.delete(url, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
  * Metodo de enviar la peticion para agregar un comentario
  * @returns Observable con la respuesta del servidor
  */
  update(body): Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/CRUDComments`;
    return this.http.put(url, body, httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

}
