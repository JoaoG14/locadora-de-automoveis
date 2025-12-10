import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  EditarTaxaServicoRequest,
  InserirTaxaServicoRequest,
  ListarTaxaServicoViewModel,
  TaxaServicoViewModel,
} from './taxa-servico.models';

@Injectable()
export class TaxaServicoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/taxas-servicos';

  public cadastrar(request: InserirTaxaServicoRequest): Observable<TaxaServicoViewModel> {
    return this.http.post<TaxaServicoViewModel>(this.apiUrl, request);
  }

  public editar(id: string, request: EditarTaxaServicoRequest): Observable<TaxaServicoViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.put<TaxaServicoViewModel>(urlCompleto, request);
  }

  public excluir(id: string): Observable<void> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<TaxaServicoViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.get<TaxaServicoViewModel>(urlCompleto);
  }

  public selecionarTodos(): Observable<ListarTaxaServicoViewModel[]> {
    return this.http.get<ListarTaxaServicoViewModel[]>(this.apiUrl);
  }
}
