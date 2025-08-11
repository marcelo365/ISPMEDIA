import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class FicheiroService {

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `https://${this.sharedDataService.ipServidor}/api/ficheiros`;
  private httpClient = inject(HttpClient);

  uploadFicheiro(file: File, tipo: 'musica' | 'video') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipo', tipo);

    return this.httpClient.post<string>(`${this.baseUrl}/upload`, formData, {
      responseType: 'text' as 'json',
    });
  }

  duplicarArquivo(caminho: string, tipo: 'musica' | 'video') {
    const formData = new FormData();
    formData.append('caminho', caminho);
    formData.append('tipo', tipo);

    return this.httpClient.post(`${this.baseUrl}/duplicarArquivo`, formData, { responseType: 'text' });
  }

  baixarFicheiroOriginal(caminhoM3U8: string, extensaoOriginal: string) {
    const params = new HttpParams()
      .set('caminhoM3U8', caminhoM3U8)
      .set('extensaoOriginal', extensaoOriginal);

    return this.httpClient.post(`${this.baseUrl}/baixar`, null, {
      params,
      responseType: 'blob'
    });
  }


}