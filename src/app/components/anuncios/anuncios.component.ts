import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from '../../interfaces/interfaces';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.scss'],
})
export class AnunciosComponent implements OnInit {

  @Input() anuncios: Anuncio[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.anuncios);
  }

}
