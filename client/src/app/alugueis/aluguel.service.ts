import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import {
  AluguelViewModel,
  DevolucaoAluguelRequest,
  EditarAluguelRequest,
  InserirAluguelRequest,
  ListarAluguelViewModel,
} from './aluguel.models';

@Injectable()
export class AluguelService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/alugueis';

  public cadastrar(request: InserirAluguelRequest): Observable<AluguelViewModel> {
    return this.http.post<AluguelViewModel>(this.apiUrl, request);
  }

  public editar(id: string, request: EditarAluguelRequest): Observable<AluguelViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.put<AluguelViewModel>(urlCompleto, request);
  }

  public excluir(id: string): Observable<void> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(urlCompleto);
  }

  public selecionarPorId(id: string): Observable<AluguelViewModel> {
    const urlCompleto = `${this.apiUrl}/${id}`;
    return this.http.get<AluguelViewModel>(urlCompleto);
  }

  public selecionarTodos(): Observable<ListarAluguelViewModel[]> {
    return this.http.get<AluguelViewModel[]>(this.apiUrl).pipe(
      map((alugueis) =>
        alugueis.map((aluguel) => ({
          id: aluguel.id,
          condutorId: aluguel.condutorId,
          veiculoId: aluguel.veiculoId,
          planoCobrancaId: aluguel.planoCobrancaId,
          tipoPlanoSelecionado: aluguel.tipoPlanoSelecionado,
          dataSaida: aluguel.dataSaida,
          dataRetornoPrevista: aluguel.dataRetornoPrevista,
          valorTotal: aluguel.valorTotal,
          concluido: aluguel.concluido,
        })),
      ),
    );
  }

  public concluirAluguel(request: DevolucaoAluguelRequest): Observable<AluguelViewModel> {
    const urlCompleto = `${this.apiUrl}/${request.aluguelId}/concluir`;
    return this.http.post<AluguelViewModel>(urlCompleto, request);
  }
}
