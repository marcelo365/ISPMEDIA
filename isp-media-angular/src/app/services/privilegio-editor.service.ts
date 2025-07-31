import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PrivilegioEditor } from '../models/PrivilegioEditor';
import { SharedDataService } from './shared-data.service';

@Injectable({
  providedIn: 'root'
})
export class PrivilegioEditorService {

  constructor() { }

  private sharedDataService = inject(SharedDataService);
  private baseUrl = `http://${this.sharedDataService.ipServidor}:8080/PrivilegioEditor`;
  private httpClient = inject(HttpClient);

  savePrivilegioEditor(privilegioEditor: PrivilegioEditor) {
    return this.httpClient.post<PrivilegioEditor>(`${this.baseUrl}/save`, privilegioEditor);
  }

  deletePrivilegioEditor(privilegioEditor: PrivilegioEditor) {
    return this.httpClient.delete<void>(`${this.baseUrl}/delete`, { body: privilegioEditor });
  }

  deleteByConcedenteAndBeneficiario(concedenteId: number, beneficiarioId: number) {
    return this.httpClient.delete<void>(
      `${this.baseUrl}/deleteByConcedenteAndBeneficiario`,
      {
        params: {
          concedenteId: concedenteId.toString(),
          beneficiarioId: beneficiarioId.toString()
        }
      }
    );
  }

  getAllPrivilegiosEditores() {
    return this.httpClient.get<PrivilegioEditor[]>(`${this.baseUrl}/getAll`);
  }

  getPrivilegioEditorById(id: number) {
    return this.httpClient.get<PrivilegioEditor>(`${this.baseUrl}/getPrivilegioEditorById?id=${id}`);
  }

  getPrivilegiosEditoresByConcedenteId(idConcedente: number) {
    return this.httpClient.get<PrivilegioEditor[]>(`${this.baseUrl}/getPrivilegiosEditoresByConcedenteId?idConcedente=${idConcedente}`);
  }

  getPrivilegiosEditoresByBeneficiarioId(idBeneficiario: number) {
    return this.httpClient.get<PrivilegioEditor[]>(`${this.baseUrl}/getPrivilegiosEditoresByBeneficiarioId?idBeneficiario=${idBeneficiario}`);
  }
}
