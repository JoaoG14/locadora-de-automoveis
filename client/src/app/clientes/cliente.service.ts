import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ClienteViewModel,
  EditarPessoaFisicaViewModel,
  EditarPessoaJuridicaViewModel,
  InserirPessoaFisicaViewModel,
  InserirPessoaJuridicaViewModel,
} from './cliente.models';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/clientes';

  public cadastrarPessoaFisica(
    registro: InserirPessoaFisicaViewModel,
  ): Observable<ClienteViewModel> {
    return this.http.post<ClienteViewModel>(`${this.apiUrl}/pessoa-fisica`, registro);
  }

  public cadastrarPessoaJuridica(
    registro: InserirPessoaJuridicaViewModel,
  ): Observable<ClienteViewModel> {
    return this.http.post<ClienteViewModel>(`${this.apiUrl}/pessoa-juridica`, registro);
  }

  public editarPessoaFisica(
    id: string,
    registro: EditarPessoaFisicaViewModel,
  ): Observable<ClienteViewModel> {
    const url = `${this.apiUrl}/pessoa-fisica/${id}`;
    return this.http.put<ClienteViewModel>(url, registro);
  }

  public editarPessoaJuridica(
    id: string,
    registro: EditarPessoaJuridicaViewModel,
  ): Observable<ClienteViewModel> {
    const url = `${this.apiUrl}/pessoa-juridica/${id}`;
    return this.http.put<ClienteViewModel>(url, registro);
  }

  public excluir(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public selecionarTodos(): Observable<ClienteViewModel[]> {
    return this.http.get<ClienteViewModel[]>(this.apiUrl);
  }

  public selecionarPorId(id: string): Observable<ClienteViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ClienteViewModel>(url);
  }
}
