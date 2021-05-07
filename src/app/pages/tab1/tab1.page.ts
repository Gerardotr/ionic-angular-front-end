import { Component, OnInit } from '@angular/core';
import { AnunciosService } from '../../services/anuncios.service';
import { Anuncio } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  anuncios: Anuncio[] = [];

  online = true;

  constructor(private anuncioService: AnunciosService, private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.siguientes();
    this.anuncioService.newAnuncio.subscribe(anuncio => {

      this.anuncios.unshift(anuncio);

    });
  }

  logout() {
    this.anuncioService.paginaAnuncio = 0;
    this.usuarioService.logout();
  }

  siguientes(event?, pull: boolean = false) {

    this.anuncioService.getAnuncios(pull).subscribe(resp => {
      console.log(resp);
      this.anuncios.push(...resp.anuncios);

      if (event) {
        event.target.complete();

        if (resp.anuncios.length === 0) {
          event.target.disabled = true;
          this.online = false;
        }

      }
    });

  }

  refresh(event) {

    this.siguientes(event, true);
    this.online = true;
    this.anuncios = [];
  }

}
