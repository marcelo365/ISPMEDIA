import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Upload`;
  private httpClient = inject(HttpClient);

  /**
   * Upload de imagem.
   * @param file O arquivo da imagem.
   * @param sobrescrever Se é para sobrescrever imagem existente.
   * @param caminhoAntigo Caminho da imagem antiga, se for sobrescrever.
   */
  uploadImagem(file: File, sobrescrever: boolean = false, caminhoAntigo?: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sobrescrever', sobrescrever.toString());
    if (sobrescrever && caminhoAntigo) {
      formData.append('caminhoAntigo', caminhoAntigo);
    }

    return this.httpClient.post(`${this.baseUrl}/imagem`, formData, {
      responseType: 'text'
    });
  }

  duplicarImagem(caminhoOriginal: string) {
    const params = new HttpParams().set('caminhoOriginal', caminhoOriginal);

    return this.httpClient.post(this.baseUrl + '/imagem/duplicar', null, {
      params,
      responseType: 'text' // porque o backend retorna apenas uma string
    });
  }

  /**
   * Upload de letra.
   * @param titulo Título da música.
   * @param letra Conteúdo da letra.
   * @param sobrescrever Se é para sobrescrever letra existente.
   * @param caminhoAntigo Caminho da letra antiga, se for sobrescrever.
   */
  uploadLetra(titulo: string, letra: string, sobrescrever: boolean = false, caminhoAntigo?: string) {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('letra', letra);
    formData.append('sobrescrever', sobrescrever.toString());
    if (sobrescrever && caminhoAntigo) {
      formData.append('caminhoAntigo', caminhoAntigo);
    }

    return this.httpClient.post(`${this.baseUrl}/letra`, formData, {
      responseType: 'text'
    });
  }

  duplicarLetra(caminhoOriginal: string) {
    const params = new HttpParams().set('caminhoOriginal', caminhoOriginal);
    return this.httpClient.post(`${this.baseUrl}/letra/duplicar`, null, {
      params,
      responseType: 'text'
    });
  }





}
