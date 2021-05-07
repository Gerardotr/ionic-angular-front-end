import { Component, Input, OnInit } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss'],
})
export class AnuncioComponent implements OnInit {

  slideOpt = {
    allowSlideNext: false,
    allowSlidePrev: false
  }

  slideOptsChip = {
    slidesPerView: 1.5,
  }

  @Input() anuncio: Anuncio = {};

  constructor() { }

  ngOnInit() { }

}
