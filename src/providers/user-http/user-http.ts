import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { UserProvider } from '../user/user';
import { UrlProvider } from '../url/url';

/**
 * Objeto JSON que maneja las cabeceras
 */
const httpHeaders = {
  headers : new HttpHeaders(
    {
      'Content-Type' : 'application/json',
    })
};


@Injectable()
export class UserHttpProvider {

  constructor(public http: HttpClient, public user : UserProvider, public url : UrlProvider) {
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
   * Metodo de enviar la peticion para registrar un usuario
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  postSignUp(body) : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/SignUp`;
    return this.http.post(url,body,httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Metodo de enviar la peticion para iniciar sesion
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  login(body) : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/Login`;
    return this.http.post(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para cerrar sesion
   * @returns Observable con la respuesta del servidor
   */
  logout() : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/Logout`;
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para obtener las el perfil de un usuario
   * @returns Observable con la respuesta del servidor
   */
  getProfile() : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/UDusers?user_id=${this.user.id[0]}`;
    return this.http.get(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para obtener las el perfil de un usuario
   * @returns Observable con la respuesta del servidor
   */
  deleteProfile() : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/UDusers?user_id=${this.user.id[0]}`;
    return this.http.delete(url,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para actualizar los datos de un usuario
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  updateProfile(body) : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/UDusers`;
    return this.http.put(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Metodo de enviar la peticion para actualizar los datos de un usuario
   * @param body Recibe como parametro un Objeto JSON con la data que va a la BD
   * @returns Observable con la respuesta del servidor
   */
  updatePass(body) : Observable<any> {
    const url = `${this.url.getUrl()}/ShoppingCart/ChangePass`;
    return this.http.put(url,body,httpHeaders)
    .pipe(
      catchError(this.handleError)
    );
  }
}
