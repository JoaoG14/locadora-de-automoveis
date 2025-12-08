import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EditarGrupoVeiculoRequest,
  GrupoVeiculoViewModel,
  InserirGrupoVeiculoRequest,
  ListarGrupoVeiculoViewModel,
} from './grupo-veiculo.models';

@Injectable()
export class GrupoVeiculoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/grupos-veiculos';

  public cadastrar(registro: InserirGrupoVeiculoRequest): Observable<GrupoVeiculoViewModel> {
    return this.http.post<GrupoVeiculoViewModel>(this.apiUrl, registro);
  }

  public editar(
    id: string,
    registro: EditarGrupoVeiculoRequest,
  ): Observable<GrupoVeiculoViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<GrupoVeiculoViewModel>(url, registro);
  }

  public excluir(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public selecionarTodos(): Observable<ListarGrupoVeiculoViewModel[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) =>
        res.map((item) => ({
          id: item.id,
          nome: item.nome,
        })),
      ),
    );
  }

  public selecionarPorId(id: string): Observable<GrupoVeiculoViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<GrupoVeiculoViewModel>(url);
  }
}
