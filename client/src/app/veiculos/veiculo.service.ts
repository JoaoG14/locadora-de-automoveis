import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EditarVeiculoViewModel,
  InserirVeiculoViewModel,
  ListarVeiculoViewModel,
  VeiculoViewModel,
} from './veiculo.models';

@Injectable()
export class VeiculoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/veiculos';

  public cadastrar(registro: InserirVeiculoViewModel): Observable<VeiculoViewModel> {
    return this.http.post<VeiculoViewModel>(this.apiUrl, registro);
  }

  public editar(id: string, registro: EditarVeiculoViewModel): Observable<VeiculoViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<VeiculoViewModel>(url, registro);
  }

  public excluir(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public selecionarTodos(): Observable<ListarVeiculoViewModel[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((res) =>
        res.map((item) => ({
          id: item.id,
          placa: item.placa,
          marca: item.marca,
          cor: item.cor,
          modelo: item.modelo,
          tipoCombustivel: item.tipoCombustivel,
          ano: item.ano,
          grupoVeiculoId: item.grupoVeiculoId,
        })),
      ),
    );
  }

  public selecionarPorId(id: string): Observable<VeiculoViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<VeiculoViewModel>(url);
  }
}
