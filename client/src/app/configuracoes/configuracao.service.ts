import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  ConfiguracaoViewModel,
  EditarConfiguracaoRequest,
  InserirConfiguracaoRequest,
  ListarConfiguracaoViewModel,
} from './configuracao.models';

@Injectable()
export class ConfiguracaoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/configuracoes';

  public cadastrar(precoCombustivel: number): Observable<ConfiguracaoViewModel> {
    const request: InserirConfiguracaoRequest = {
      PrecoCombustivel: precoCombustivel,
    };
    return this.http.post<ConfiguracaoViewModel>(this.apiUrl, request);
  }

  public editar(id: string, precoCombustivel: number): Observable<ConfiguracaoViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    const request: EditarConfiguracaoRequest = {
      Id: id,
      PrecoCombustivel: precoCombustivel,
    };
    return this.http.put<ConfiguracaoViewModel>(urlCompleto, request);
  }

  public excluir(id: string): Observable<void> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<ConfiguracaoViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.get<ConfiguracaoViewModel>(urlCompleto);
  }

  public selecionarTodos(): Observable<ListarConfiguracaoViewModel[]> {
    return this.http.get<ListarConfiguracaoViewModel[]>(this.apiUrl);
  }

}

