import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideMain', { static: true }) slides: IonSlides;
  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  loginUser = {
    email: 'test@gmail.com',
    password: '12345678'
  }

  registeruser: Usuario = {

    email: 'test@gmail.com',
    password: '12345678',
    nombre: 'Test'

  }

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private uiservice: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(flogin: NgForm) {

    if (flogin.invalid) { return }

    const valid = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);
    if (valid) {
      // Ir al home
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

    } else {

      //show alert

      this.uiservice.infoAlert('Usuario y contraseña no son correctas');

    }

    console.log(flogin.valid);
    console.log(this.loginUser);

  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }
    const valid = await this.usuarioService.registro(this.registeruser);

    if (valid) {
      // Ir al home
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });

    } else {

      //show alert

      this.uiservice.infoAlert('El email ingresado ya esta registrado');

    }
  }

  showRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);
  }
  showLogin() {

    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }

}
