import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
  }

  id = [];

  /**
   * Metodo para almacenar el id del usuario en un arreglo
   * @param {any} data Recibira como parametro el id del usuario.
   * @returns Void
   */
  add(data) : void {
    console.log("Recibi -> "+data);
    this.id.push(data);
  }

  /**
   * Metodo para limpiar el arreglo
   * @returns Void
   */
  clean() : void {
    this.id = [];
  }
}
