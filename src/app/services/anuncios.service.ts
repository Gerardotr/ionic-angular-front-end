import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { environment } from '../../environments/environment.prod';
import { Anuncio, AnuncioResp } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  paginaAnuncio = 0;
  newAnuncio = new EventEmitter<Anuncio>();

  constructor(private http: HttpClient, private usuarioService: UsuarioService,   private fileTransfer: FileTransfer) { }

  getAnuncios(pull: boolean = false) {

    if (pull) {
      this.paginaAnuncio = 0;
    }
    this.paginaAnuncio++;
    return this.http.get<AnuncioResp>(`${URL}/api/anuncio?pagina=${this.paginaAnuncio}`);
  }


  crearAnuncio( post ) {

    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/api/anuncio`, post, { headers })
        .subscribe( resp => {

          this.newAnuncio.emit( resp['anuncio'] );
          resolve(true);
        });
    });



  }

  subirImagen( img: string ) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.usuarioService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${ URL }api/anuncio/upload`, options )
      .then( data => {
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });

  }



}
