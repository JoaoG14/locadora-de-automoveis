import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ListarVeiculoViewModel } from '../veiculo.models';
import { GrupoVeiculoService } from '../../grupo-veiculos/grupo-veiculo.service';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';

@Component({
  selector: 'app-listar-veiculo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    MatFormFieldModule,
    RouterLink,
    AsyncPipe,
  ],
  providers: [GrupoVeiculoService],
  template: `
    <section class="mx-auto max-w-screen-xl px-4">
      <div class="py-6">
        <h2 class="text-2xl font-semibold">Veículos</h2>

        <!-- Ações e Filtro -->
        <div
          class="mt-4 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center"
        >
          <a
            mat-flat-button
            class="flex items-center justify-center gap-2 h-10 w-full md:w-auto"
            routerLink="../cadastrar"
          >
            <mat-icon class="!text-base">add</mat-icon>
            Novo Veículo
          </a>

          <mat-form-field appearance="outline" class="w-full md:w-64 -mb-5">
            <mat-label>Filtrar por Grupo</mat-label>
            <mat-select (selectionChange)="filtrarPorGrupo($event.value)">
              <mat-option [value]="null">Todos</mat-option>
              @for (grupo of grupos$ | async; track $index) {
                <mat-option [value]="grupo.id">{{ grupo.nome }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
        </div>

        <hr class="my-6 border-muted/30" />

        <div class="overflow-auto bg-white rounded-lg border border-gray-200 shadow-sm">
          <table mat-table [dataSource]="dataSource" class="w-full">
            <!-- Colunas -->
            <ng-container matColumnDef="placa">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-left">Placa</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4">{{ row.placa }}</td>
            </ng-container>

            <ng-container matColumnDef="modelo">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-left">Modelo</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4">{{ row.modelo }}</td>
            </ng-container>

            <ng-container matColumnDef="marca">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-left">Marca</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4">{{ row.marca }}</td>
            </ng-container>

            <ng-container matColumnDef="cor">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-left">Cor</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4">{{ row.cor }}</td>
            </ng-container>

            <ng-container matColumnDef="tipoCombustivel">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-left">Combustível</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4">{{ row.tipoCombustivel }}</td>
            </ng-container>

            <!-- Ações -->
            <ng-container matColumnDef="acoes">
              <th mat-header-cell *matHeaderCellDef class="px-6 py-3 text-right">Ações</th>
              <td mat-cell *matCellDef="let row" class="px-6 py-4 text-right whitespace-nowrap">
                <a
                  [routerLink]="['../editar', row.id]"
                  mat-icon-button
                  color="accent"
                  matTooltip="Editar"
                >
                  <mat-icon>edit</mat-icon>
                </a>
                <a
                  [routerLink]="['../excluir', row.id]"
                  mat-icon-button
                  color="warn"
                  matTooltip="Excluir"
                >
                  <mat-icon>delete</mat-icon>
                </a>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>

          @if (dataSource.data.length === 0) {
            <div class="p-6 text-center text-gray-500">Nenhum veículo encontrado.</div>
          }
        </div>
      </div>
    </section>
  `,
})
export class ListarVeiculoComponent implements OnInit {
  protected readonly route = inject(ActivatedRoute);
  protected readonly grupoService = inject(GrupoVeiculoService);

  protected dataSource = new MatTableDataSource<ListarVeiculoViewModel>();
  protected displayedColumns = ['placa', 'modelo', 'marca', 'cor', 'tipoCombustivel', 'acoes'];

  protected grupos$ = this.grupoService.selecionarTodos();
  private todosVeiculos: ListarVeiculoViewModel[] = [];

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data['veiculos'] as ListarVeiculoViewModel[]))
      .subscribe((veiculos) => {
        this.todosVeiculos = veiculos;
        this.dataSource.data = veiculos;
      });
  }

  protected filtrarPorGrupo(grupoId: string | null) {
    if (!grupoId) {
      this.dataSource.data = this.todosVeiculos;
    } else {
      this.dataSource.data = this.todosVeiculos.filter((v) => v.grupoVeiculoId === grupoId);
    }
  }
}
