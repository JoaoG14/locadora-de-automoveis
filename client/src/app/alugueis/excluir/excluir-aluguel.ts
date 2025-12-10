import { Observer } from 'rxjs';

import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { AluguelViewModel, TipoPlano } from '../aluguel.models';
import { AluguelService } from '../aluguel.service';
import { SelecionarCondutoresModel } from '../../condutores/condutor.models';
import { ListarVeiculoViewModel } from '../../veiculos/veiculo.models';

@Component({
  selector: 'app-excluir-aluguel',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './excluir-aluguel.html',
})
export class ExcluirAluguel implements OnInit {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly aluguelService = inject(AluguelService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected aluguel?: AluguelViewModel;
  protected condutorNome?: string;
  protected veiculoNome?: string;

  ngOnInit(): void {
    this.aluguel = this.route.snapshot.data['aluguel'] as AluguelViewModel;
    const condutores = this.route.snapshot.data['condutores'] as SelecionarCondutoresModel[];
    const veiculos = this.route.snapshot.data['veiculos'] as ListarVeiculoViewModel[];

    if (!this.aluguel) {
      this.notificacaoService.erro('Aluguel não encontrado!');
      this.router.navigate(['/alugueis']);
      return;
    }

    if (!this.aluguel.concluido) {
      this.notificacaoService.erro('Não é possível excluir um aluguel ainda não concluído!');
      this.router.navigate(['/alugueis']);
      return;
    }

    const condutor = condutores.find((c) => c.id === this.aluguel!.condutorId);
    const veiculo = veiculos.find((v) => v.id === this.aluguel!.veiculoId);

    this.condutorNome = condutor?.nome || 'Condutor Removido';
    this.veiculoNome = veiculo ? `${veiculo.marca} ${veiculo.modelo}` : 'Veículo Removido';
  }

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

  public excluir() {
    if (!this.aluguel) return;

    const exclusaoObserver: Observer<void> = {
      next: () => this.notificacaoService.sucesso('Aluguel excluído com sucesso!'),
      error: (err) => {
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this.notificacaoService.erro(err.error[0]);
        } else {
          this.notificacaoService.erro('Erro ao excluir aluguel.');
        }
      },
      complete: () => this.router.navigate(['/alugueis']),
    };

    this.aluguelService.excluir(this.aluguel.id).subscribe(exclusaoObserver);
  }
}
