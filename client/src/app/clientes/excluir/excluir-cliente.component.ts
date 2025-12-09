import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, take } from 'rxjs';
import { ClienteViewModel } from '../cliente.models';
import { ClienteService } from '../cliente.service';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';

@Component({
  selector: 'app-excluir-cliente',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, AsyncPipe],
  template: `
    <div class="mx-auto max-w-lg mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Excluir Cliente</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-2">
          @if (cliente$ | async; as cliente) {
            <div class="text-base text-gray-700">
              <p>
                Tem certeza que deseja excluir o cliente <strong>{{ cliente.nome }}</strong
                >?
              </p>
              <p class="text-sm text-gray-500 mt-2">Esta ação não poderá ser desfeita.</p>
            </div>
          }
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2 pt-4">
          <a routerLink="/clientes" mat-button>Cancelar</a>
          <button mat-raised-button color="warn" (click)="excluir()">Excluir</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
})
export class ExcluirClienteComponent {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly clienteService = inject(ClienteService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly cliente$ = this.route.data.pipe(
    map((data) => data['cliente'] as ClienteViewModel),
  );

  public excluir() {
    this.cliente$.pipe(take(1)).subscribe((cliente) => {
      this.clienteService.excluir(cliente.id).subscribe({
        next: () => {
          this.notificacaoService.sucesso('Cliente excluído com sucesso!');
          this.router.navigate(['/clientes']);
        },
        error: (err) => this.notificacaoService.erro(err),
      });
    });
  }
}
