import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';
import { ListarPlanoCobrancaViewModel } from '../plano-cobranca.models';

@Component({
  selector: 'app-listar-plano-cobranca',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
  ],
  template: `
    <section class="mx-auto max-w-screen-xl px-4">
      <div class="py-6">
        <h2 class="text-2xl font-semibold">Planos de Cobrança</h2>

        <!-- Ações -->
        <div class="mt-4 flex justify-end">
          <a mat-flat-button color="primary" class="h-10 px-6" routerLink="../cadastrar">
            <mat-icon class="mr-2">add</mat-icon>
            Cadastrar
          </a>
        </div>

        <hr class="my-6 border-muted/30" />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (item of dados$ | async; track item.plano.id) {
            <mat-card class="flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
              <mat-card-header class="bg-gray-50 p-4 border-b">
                <mat-card-title class="text-lg font-bold text-gray-800">
                  {{ item.grupoNome }}
                </mat-card-title>
                <mat-card-subtitle class="text-xs text-gray-500 uppercase tracking-wide mt-1">
                  Grupo de Veículos
                </mat-card-subtitle>
              </mat-card-header>

              <mat-card-content class="flex-grow p-4 space-y-4">
                <!-- Plano Diário -->
                <div>
                  <h3 class="text-sm font-semibold text-primary mb-2 flex items-center">
                    <mat-icon class="text-lg mr-1 scale-75">calendar_today</mat-icon>
                    Plano Diário
                  </h3>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="block text-gray-500 text-xs">Diária</span>
                      <span class="font-medium">{{
                        item.plano.precoDiarioPlanoDiario | currency: 'BRL'
                      }}</span>
                    </div>
                    <div>
                      <span class="block text-gray-500 text-xs">Por Km</span>
                      <span class="font-medium">{{
                        item.plano.precoPorKmPlanoDiario | currency: 'BRL'
                      }}</span>
                    </div>
                  </div>
                </div>

                <hr class="border-gray-100" />

                <!-- Plano Controlado -->
                <div>
                  <h3 class="text-sm font-semibold text-primary mb-2 flex items-center">
                    <mat-icon class="text-lg mr-1 scale-75">speed</mat-icon>
                    Plano Controlado
                  </h3>
                  <div class="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span class="block text-gray-500 text-xs">Diária</span>
                      <span class="font-medium">{{
                        item.plano.precoDiarioPlanoControlado | currency: 'BRL'
                      }}</span>
                    </div>
                    <div>
                      <span class="block text-gray-500 text-xs">Km Disp.</span>
                      <span class="font-medium">{{ item.plano.limiteKmPlanoControlado }} km</span>
                    </div>
                    <div class="col-span-2">
                      <span class="block text-gray-500 text-xs">Km Extra</span>
                      <span class="font-medium">{{
                        item.plano.precoPorKmExtrapoladoPlanoControlado | currency: 'BRL'
                      }}</span>
                    </div>
                  </div>
                </div>

                <hr class="border-gray-100" />

                <!-- Plano Livre -->
                <div>
                  <h3 class="text-sm font-semibold text-primary mb-2 flex items-center">
                    <mat-icon class="text-lg mr-1 scale-75">all_inclusive</mat-icon>
                    Plano Livre
                  </h3>
                  <div class="text-sm">
                    <div>
                      <span class="block text-gray-500 text-xs">Diária</span>
                      <span class="font-medium">{{
                        item.plano.precoDiarioPlanoLivre | currency: 'BRL'
                      }}</span>
                    </div>
                  </div>
                </div>
              </mat-card-content>

              <mat-card-actions class="p-2 border-t flex justify-end gap-2">
                <a
                  [routerLink]="['editar', item.plano.id]"
                  mat-icon-button
                  color="accent"
                  matTooltip="Editar"
                >
                  <mat-icon>edit</mat-icon>
                </a>
                <a
                  [routerLink]="['excluir', item.plano.id]"
                  mat-icon-button
                  color="warn"
                  matTooltip="Excluir"
                >
                  <mat-icon>delete</mat-icon>
                </a>
              </mat-card-actions>
            </mat-card>
          } @empty {
            <div
              class="col-span-full text-center py-12 text-gray-500 bg-gray-50 rounded-lg dashed border-2 border-gray-200"
            >
              <mat-icon class="text-5xl mb-2 opacity-30">folder_off</mat-icon>
              <p class="text-lg">Nenhum plano de cobrança cadastrado.</p>
              <a mat-button color="primary" routerLink="../cadastrar" class="mt-2"
                >Cadastre o primeiro</a
              >
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ListarPlanoCobrancaComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly dados$ = combineLatest([
    this.route.data.pipe(map((data) => data['planos'] as ListarPlanoCobrancaViewModel[])),
    this.route.data.pipe(map((data) => data['grupos'] as ListarGrupoVeiculoViewModel[])),
  ]).pipe(
    map(([planos, grupos]) => {
      return planos.map((plano) => {
        const grupo = grupos.find((g) => g.id === plano.grupoVeiculoId);
        return {
          plano,
          grupoNome: grupo ? grupo.nome : 'Grupo Removido',
        };
      });
    }),
  );
}
