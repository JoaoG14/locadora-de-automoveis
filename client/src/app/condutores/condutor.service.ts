import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {
  CadastrarCondutorModel,
  CadastrarCondutorResponseModel,
  DetalhesCondutorModel,
  EditarCondutorModel,
  EditarCondutorResponseModel,
  SelecionarCondutoresModel,
} from './condutor.models';

@Injectable()
export class CondutorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/condutores';

  public cadastrar(
    condutorModel: CadastrarCondutorModel,
  ): Observable<CadastrarCondutorResponseModel> {
    const request = {
      Nome: condutorModel.nome,
      Email: condutorModel.email,
      CPF: condutorModel.cpf,
      CNH: condutorModel.cnh,
      ValidadeCNH: condutorModel.validadeCNH,
      Telefone: condutorModel.telefone,
      ClienteId: condutorModel.clienteId || null,
    };

    return this.http.post<CadastrarCondutorResponseModel>(this.apiUrl, request);
  }

  public editar(
    id: string,
    condutorModel: EditarCondutorModel,
  ): Observable<EditarCondutorResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    const request = {
      Id: id,
      Nome: condutorModel.nome,
      Email: condutorModel.email,
      CPF: condutorModel.cpf,
      CNH: condutorModel.cnh,
      ValidadeCNH: condutorModel.validadeCNH,
      Telefone: condutorModel.telefone,
      ClienteId: condutorModel.clienteId || null,
    };

    return this.http.put<EditarCondutorResponseModel>(urlCompleto, request);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesCondutorModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesCondutorModel>(urlCompleto);
  }

  public selecionarTodos(): Observable<SelecionarCondutoresModel[]> {
    return this.http.get<SelecionarCondutoresModel[]>(this.apiUrl);
  }
}
