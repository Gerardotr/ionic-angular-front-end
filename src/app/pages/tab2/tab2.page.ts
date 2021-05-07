import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
declare var window: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {


  tempImgs: string[] = [];
  anuncio = {
    nombre: '',
    moneda: '',
    precio: 0,
    descripcion: '',
    cantidadBanos: 0,
    cantidadHabitaciones: 0,
    cantidadEstacionamientos: 0

  }

  constructor(private anuncioService: AnunciosService, private route: Router, private camera: Camera) { }

  async createAnuncio() {

    const saved = await this.anuncioService.crearAnuncio(this.anuncio);

    this.anuncio = {
      nombre: '',
      moneda: '',
      precio: 0,
      descripcion: '',
      cantidadBanos: 0,
      cantidadHabitaciones: 0,
      cantidadEstacionamientos: 0

    }
    this.tempImgs = [];

    this.route.navigateByUrl('/main/tabs/tab1');


  }

  Entrycamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    this.procImage(options);
  }



  librery() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.procImage(options);

  }

  procImage(options: CameraOptions) {

    this.camera.getPicture(options).then((imageData) => {

      const img = window.Ionic.WebView.convertFileSrc(imageData)
      this.anuncioService.subirImagen(imageData);
      this.tempImgs.push(img);
    }, (err) => {

    });

  }




}
