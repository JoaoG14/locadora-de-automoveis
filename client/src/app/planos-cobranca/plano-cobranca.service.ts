import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  EditarPlanoCobrancaViewModel,
  InserirPlanoCobrancaViewModel,
  ListarPlanoCobrancaViewModel,
  PlanoCobranca,
} from './plano-cobranca.models';

@Injectable({
  providedIn: 'root',
})
export class PlanoCobrancaService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl + '/planos-cobranca';

  public cadastrar(registro: InserirPlanoCobrancaViewModel): Observable<PlanoCobranca> {
    return this.http.post<PlanoCobranca>(this.apiUrl, registro);
  }

  public editar(id: string, registro: EditarPlanoCobrancaViewModel): Observable<PlanoCobranca> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<PlanoCobranca>(url, registro);
  }

  public excluir(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  public selecionarTodos(): Observable<ListarPlanoCobrancaViewModel[]> {
    return this.http.get<ListarPlanoCobrancaViewModel[]>(this.apiUrl);
  }

  public selecionarPorId(id: string): Observable<ListarPlanoCobrancaViewModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map((item) => ({
        id: item.id || item.Id,
        grupoVeiculoId: item.grupoVeiculoId || item.GrupoVeiculoId,
        precoDiarioPlanoDiario: item.precoDiarioPlanoDiario ?? item.PrecoDiarioPlanoDiario ?? 0,
        precoPorKmPlanoDiario: item.precoPorKmPlanoDiario ?? item.PrecoPorKmPlanoDiario ?? 0,
        precoDiarioPlanoControlado:
          item.precoDiarioPlanoControlado ?? item.PrecoDiarioPlanoControlado ?? 0,
        limiteKmPlanoControlado: item.limiteKmPlanoControlado ?? item.LimiteKmPlanoControlado ?? 0,
        precoPorKmExtrapoladoPlanoControlado:
          item.precoPorKmExtrapoladoPlanoControlado ??
          item.PrecoPorKmExtrapoladoPlanoControlado ??
          0,
        precoDiarioPlanoLivre: item.precoDiarioPlanoLivre ?? item.PrecoDiarioPlanoLivre ?? 0,
      })),
    );
  }
}
