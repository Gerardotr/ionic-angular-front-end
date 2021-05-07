import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(private alerCtrl: AlertController) { }

  async infoAlert(message: string) {
    const alert = await this.alerCtrl.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();

  }

}
