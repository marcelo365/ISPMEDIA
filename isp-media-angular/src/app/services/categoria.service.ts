import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Categoria } from '../models/Categoria';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }


  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/Categoria`;
  private http = inject(HttpClient);

  getAllCategorias() {
    return this.http.get<Categoria[]>(`${this.baseUrl}/getAll`);
  }

  getCategoriaByNome(nome: string) {
    return this.http.get<Categoria>(`${this.baseUrl}/getCategoriaByNome?nome=${nome}`);
  }

  getCategoriaByTipo(tipo: number) {
    return this.http.get<Categoria[]>(`${this.baseUrl}/getCategoriaByTipo?tipo=${tipo}`);
  }

  createCategoria(categoria: Categoria) {
    return this.http.post<Categoria>(`${this.baseUrl}/save`, categoria);
  }

  deleteCategoria(categoria: Categoria) {
    return this.http.request('delete', `${this.baseUrl}/delete`, {
      body: categoria
    });
  }

  getCategoriasByNomeContendo(nome: string) {
    return this.http.get<Categoria[]>(`${this.baseUrl}/getCategoriasByNomeContendo?nome=${nome}`);
  }

  getCategoriaById(id: number) {
    return this.http.get<Categoria>(`${this.baseUrl}/getCategoriaById?id=${id}`);
  }

}
