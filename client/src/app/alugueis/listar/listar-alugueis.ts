import { combineLatest, filter, map } from 'rxjs';

import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ListarAluguelViewModel, TipoPlano } from '../aluguel.models';
import { SelecionarCondutoresModel } from '../../condutores/condutor.models';
import { ListarVeiculoViewModel } from '../../veiculos/veiculo.models';

@Component({
  selector: 'app-listar-alugueis',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatTooltipModule,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './listar-alugueis.html',
})
export class ListarAlugueis {
  protected readonly route = inject(ActivatedRoute);

  protected readonly dados$ = combineLatest([
    this.route.data.pipe(
      filter((data) => data['alugueis']),
      map((data) => data['alugueis'] as ListarAluguelViewModel[]),
    ),
    this.route.data.pipe(
      filter((data) => data['condutores']),
      map((data) => data['condutores'] as SelecionarCondutoresModel[]),
    ),
    this.route.data.pipe(
      filter((data) => data['veiculos']),
      map((data) => data['veiculos'] as ListarVeiculoViewModel[]),
    ),
  ]).pipe(
    map(([alugueis, condutores, veiculos]) => {
      return alugueis.map((aluguel) => {
        const condutor = condutores.find((c) => c.id === aluguel.condutorId);
        const veiculo = veiculos.find((v) => v.id === aluguel.veiculoId);
        return {
          ...aluguel,
          condutorNome: condutor ? condutor.nome : 'Condutor Removido',
          veiculoNome: veiculo ? `${veiculo.marca} ${veiculo.modelo}` : 'Veículo Removido',
          veiculoPlaca: veiculo?.placa,
        };
      });
    }),
  );

  protected getTipoPlanoLabel(tipo: TipoPlano): string {
    switch (tipo) {
      case TipoPlano.Diario:
        return 'Diário';
      case TipoPlano.Controlado:
        return 'Controlado';
      case TipoPlano.Livre:
        return 'Livre';
      default:
        return 'Desconhecido';
    }
  }
}
