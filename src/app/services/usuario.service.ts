import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment.prod';
import { of } from 'rxjs';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  token: string = null;

  private usuario: Usuario = {};


  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/api/user/login`, data).subscribe(async resp => {
        console.log(resp);

        if (resp['ok']) {

          await this.saveToken(resp['token']);
          resolve(true);

        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });

    });
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {

      this.http.post(`${URL}/api/user/create`, usuario)
        .subscribe(async resp => {
          console.log(resp);

          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }

        });


    });


  }



  getUsuario() {

    if (!this.usuario._id) {
      this.validateToken();
    }

    return { ...this.usuario };

  }


  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

    await this.validateToken();


  }

  async loadToken() {

    this.token = await this.storage.get('token') || null;

  }

  logoutSig() {
    this.token   = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', { animated: true });
  }


  async validateToken(): Promise<boolean> {

    await this.loadToken();

    if ( !this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }


    return new Promise<boolean>( resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${ URL }/api/user/`, { headers })
        .subscribe( resp => {

          if ( resp['ok'] ) {
            this.usuario = resp['usuario'];
            resolve(true);
          } else {
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }

        });


    });

  }




  async saveToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);

    this.validateToken();

  }
}
