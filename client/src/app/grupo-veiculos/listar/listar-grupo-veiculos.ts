import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';
import { ListarGrupoVeiculoViewModel } from '../grupo-veiculo.models';

@Component({
  selector: 'app-listar-grupo-veiculos',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatCardModule, RouterLink, AsyncPipe],
  template: `
    <section class="mx-auto max-w-screen-xl px-4">
      <div class="py-6">
        <h2 class="text-2xl font-semibold">Grupos de Veículos</h2>

        <!-- Ações -->
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-2">
          <a
            mat-flat-button
            class="col-span-1 flex items-center justify-center gap-2 h-10"
            routerLink="../cadastrar"
          >
            <mat-icon class="!text-base">add</mat-icon>
            Cadastrar
          </a>
        </div>

        <hr class="my-6 border-muted/30" />

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          @for (grupo of grupos$ | async; track $index) {
            <mat-card class="p-3 rounded-2xl shadow-sm">
              <mat-card-header class="pb-2">
                <mat-card-title class="text-lg font-medium">
                  {{ grupo.nome }}
                </mat-card-title>
              </mat-card-header>

              <mat-card-actions align="end" class="flex items-center justify-end gap-2 pt-2">
                <a [routerLink]="['editar', grupo.id]" mat-icon-button aria-label="Editar">
                  <mat-icon>edit</mat-icon>
                </a>
                <a [routerLink]="['excluir', grupo.id]" mat-icon-button aria-label="Excluir">
                  <mat-icon>delete</mat-icon>
                </a>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </div>
    </section>
  `,
})
export class ListarGrupoVeiculos {
  protected readonly route = inject(ActivatedRoute);

  protected readonly grupos$ = this.route.data.pipe(
    filter((data) => data['grupos']),
    map((data) => data['grupos'] as ListarGrupoVeiculoViewModel[]),
  );
}
