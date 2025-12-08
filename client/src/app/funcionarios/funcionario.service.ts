import { map, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {
  CadastrarFuncionarioModel,
  CadastrarFuncionarioResponseModel,
  DetalhesFuncionarioModel,
  EditarFuncionarioModel,
  EditarFuncionarioResponseModel,
  InserirFuncionarioRequest,
  SelecionarFuncionariosModel,
  SelecionarFuncionariosResponseModel,
} from './funcionario.models';

@Injectable()
export class FuncionarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/funcionarios';

  public cadastrar(
    funcionarioModel: CadastrarFuncionarioModel,
  ): Observable<CadastrarFuncionarioResponseModel> {
    const request: InserirFuncionarioRequest = {
      Nome: funcionarioModel.nomeCompleto,
      DataAdmissao: funcionarioModel.admissaoEmUtc,
      Salario: funcionarioModel.salario,
    };

    return this.http.post<CadastrarFuncionarioResponseModel>(this.apiUrl, request);
  }

  public editar(
    id: string,
    funcionarioModel: EditarFuncionarioModel,
  ): Observable<EditarFuncionarioResponseModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.put<EditarFuncionarioResponseModel>(urlCompleto, funcionarioModel);
  }

  public excluir(id: string): Observable<null> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.delete<null>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<DetalhesFuncionarioModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;

    return this.http.get<DetalhesFuncionarioModel>(urlCompleto);
  }

  public selecionarTodos(): Observable<SelecionarFuncionariosModel[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) =>
        res.map((item) => ({
          id: item.id,
          nomeCompleto: item.nome,
          email: '',
          salario: item.salario,
          admissaoEmUtc: item.dataAdmissao,
        })),
      ),
    );
  }
}
