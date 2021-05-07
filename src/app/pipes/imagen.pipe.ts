import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment.prod';
const URL = environment.url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(image: string, userId: string): string {
    return `${URL}/api/anuncio/imagen/${userId}/${image}`;
  }

}
