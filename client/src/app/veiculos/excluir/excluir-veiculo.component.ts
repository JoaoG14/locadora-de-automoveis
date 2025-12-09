import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, map, Observer, switchMap, take } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { VeiculoViewModel } from '../veiculo.models';
import { VeiculoService } from '../veiculo.service';

@Component({
  selector: 'app-excluir-veiculo',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, AsyncPipe],
  template: `
    <div class="mx-auto max-w-lg mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Excluir Veículo</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          @if (veiculo$ | async; as veiculo) {
            <p class="text-lg">
              Tem certeza que deseja excluir o veículo
              <strong>{{ veiculo.modelo }} ({{ veiculo.placa }})</strong>?
            </p>
            <p
              class="text-sm text-yellow-600 mt-2 bg-yellow-50 p-2 rounded border border-yellow-200"
            >
              Esta ação não poderá ser desfeita.
            </p>
          }
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2">
          <a routerLink="/veiculos" mat-button>Cancelar</a>
          <button mat-raised-button color="warn" (click)="excluir()">Excluir</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class ExcluirVeiculoComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly router = inject(Router);
  protected readonly veiculoService = inject(VeiculoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly veiculo$ = this.route.data.pipe(
    filter((data) => data['veiculo']),
    map((data) => data['veiculo'] as VeiculoViewModel),
  );

  public excluir() {
    const observer: Observer<void> = {
      next: () => this.notificacaoService.sucesso(`Veículo excluído com sucesso!`),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/veiculos']),
    };

    this.veiculo$
      .pipe(
        take(1),
        switchMap((veiculo) => this.veiculoService.excluir(veiculo.id)),
      )
      .subscribe(observer);
  }
}
