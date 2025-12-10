import { format } from 'date-fns';
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

    return this.http.get<any>(urlCompleto).pipe(
      map((item) => ({
        id: item.id,
        nomeCompleto: item.nome || '',
        cpf: '', // Backend doesn't store CPF
        email: '', // Backend doesn't store email
        salario: item.salario || 0,
        admissaoEmUtc: item.dataAdmissao
          ? format(new Date(item.dataAdmissao), 'dd/MM/yyyy')
          : format(new Date(), 'dd/MM/yyyy'),
      })),
    );
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
