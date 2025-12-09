import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { combineLatest, filter, map, switchMap, take } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';
import { ListarPlanoCobrancaViewModel } from '../plano-cobranca.models';
import { PlanoCobrancaService } from '../plano-cobranca.service';

@Component({
  selector: 'app-excluir-plano-cobranca',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, AsyncPipe],
  template: `
    <div class="mx-auto max-w-lg mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Excluir Plano de Cobrança</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-2">
          @if (dados$ | async; as dados) {
            <div class="text-base text-gray-700">
              <p>
                Tem certeza que deseja excluir o plano de cobrança do grupo
                <strong>{{ dados.grupoNome }}</strong
                >?
              </p>
              <p class="text-sm text-gray-500 mt-2">Esta ação não poderá ser desfeita.</p>
            </div>
          }
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2 pt-4">
          <a routerLink="/planos-cobranca" mat-button>Cancelar</a>
          <button mat-raised-button color="warn" (click)="excluir()">Excluir</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class ExcluirPlanoCobrancaComponent {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly planoService = inject(PlanoCobrancaService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly dados$ = combineLatest([
    this.route.data.pipe(
      filter((d) => d['plano']),
      map((d) => d['plano'] as ListarPlanoCobrancaViewModel),
    ),
    this.route.data.pipe(
      filter((d) => d['grupos']),
      map((d) => d['grupos'] as ListarGrupoVeiculoViewModel[]),
    ),
  ]).pipe(
    map(([plano, grupos]) => {
      const grupo = grupos.find((g) => g.id === plano.grupoVeiculoId);
      return {
        plano,
        grupoNome: grupo ? grupo.nome : 'Desconhecido',
      };
    }),
  );

  public excluir() {
    this.dados$.pipe(take(1)).subscribe((dados) => {
      this.planoService.excluir(dados.plano.id).subscribe({
        next: () => {
          this.notificacaoService.sucesso('Plano de cobrança excluído com sucesso!');
          this.router.navigate(['/planos-cobranca']);
        },
        error: (err) => this.notificacaoService.erro(err),
      });
    });
  }
}
