import { Observer } from 'rxjs';

import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { TaxaServicoViewModel } from '../taxa-servico.models';
import { TaxaServicoService } from '../taxa-servico.service';

@Component({
  selector: 'app-excluir-taxa-servico',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    RouterLink,
    CurrencyPipe,
  ],
  templateUrl: './excluir-taxa-servico.html',
})
export class ExcluirTaxaServico implements OnInit {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly taxaServicoService = inject(TaxaServicoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected taxaServico?: TaxaServicoViewModel;

  ngOnInit(): void {
    this.taxaServico = this.route.snapshot.data['taxaServico'] as TaxaServicoViewModel;

    if (!this.taxaServico) {
      this.notificacaoService.erro('Taxa/Serviço não encontrada!');
      this.router.navigate(['/taxas-servicos']);
    }
  }

  public excluir() {
    if (!this.taxaServico) return;

    const exclusaoObserver: Observer<void> = {
      next: () =>
        this.notificacaoService.sucesso(
          `A taxa/serviço "${this.taxaServico!.nome}" foi excluída com sucesso!`,
        ),
      error: (err) => {
        if (err.error && Array.isArray(err.error) && err.error.length > 0) {
          this.notificacaoService.erro(err.error[0]);
        } else {
          this.notificacaoService.erro('Erro ao excluir taxa/serviço.');
        }
      },
      complete: () => this.router.navigate(['/taxas-servicos']),
    };

    this.taxaServicoService.excluir(this.taxaServico.id).subscribe(exclusaoObserver);
  }
}
