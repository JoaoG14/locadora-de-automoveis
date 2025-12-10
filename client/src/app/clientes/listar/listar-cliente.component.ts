import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { ClienteViewModel, TipoCliente } from '../cliente.models';

@Component({
  selector: 'app-listar-cliente',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    RouterLink,
    AsyncPipe,
  ],
  template: `
    <section class="mx-auto max-w-screen-xl px-4">
      <div class="py-6">
        <h2 class="text-2xl font-semibold">Clientes</h2>

        <!-- Ações -->
        <div class="mt-4 flex justify-end">
          <a mat-flat-button color="primary" class="h-10 px-6" routerLink="../cadastrar">
            <mat-icon class="mr-2">add</mat-icon>
            Cadastrar
          </a>
        </div>

        <hr class="my-6 border-muted/30" />

        <mat-card class="overflow-hidden">
          <table mat-table [dataSource]="(clientes$ | async) ?? []" class="w-full">
            <!-- Nome -->
            <ng-container matColumnDef="nome">
              <th mat-header-cell *matHeaderCellDef class="text-primary font-medium">Nome</th>
              <td mat-cell *matCellDef="let cliente">{{ cliente.nome }}</td>
            </ng-container>

            <!-- Telefone -->
            <ng-container matColumnDef="telefone">
              <th mat-header-cell *matHeaderCellDef class="text-primary font-medium">Telefone</th>
              <td mat-cell *matCellDef="let cliente">{{ cliente.telefone }}</td>
            </ng-container>

            <!-- Documentos -->
            <ng-container matColumnDef="documentos">
              <th mat-header-cell *matHeaderCellDef class="text-primary font-medium">Documento</th>
              <td mat-cell *matCellDef="let cliente">
                @if (cliente.tipo === TipoCliente.PessoaFisica) {
                  <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2"
                    >CPF</span
                  >
                  {{ cliente.cpf }}
                } @else {
                  <span
                    class="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-bold mr-2"
                    >CNPJ</span
                  >
                  {{ cliente.cnpj }}
                }
              </td>
            </ng-container>

            <!-- Tipo -->
            <ng-container matColumnDef="tipo">
              <th mat-header-cell *matHeaderCellDef class="text-primary font-medium">Tipo</th>
              <td mat-cell *matCellDef="let cliente">
                @if (cliente.tipo === TipoCliente.PessoaFisica) {
                  Pessoa Física
                } @else {
                  Pessoa Jurídica
                }
              </td>
            </ng-container>

            <!-- Ações -->
            <ng-container matColumnDef="acoes">
              <th
                mat-header-cell
                *matHeaderCellDef
                class="text-right text-primary font-medium pr-6"
              >
                Ações
              </th>
              <td mat-cell *matCellDef="let cliente" class="text-right pr-4">
                <a
                  [routerLink]="['editar', cliente.id]"
                  mat-icon-button
                  color="accent"
                  matTooltip="Editar"
                >
                  <mat-icon>edit</mat-icon>
                </a>
                <a
                  [routerLink]="['excluir', cliente.id]"
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

            <tr class="mat-row" *matNoDataRow>
              <td
                class="mat-cell text-center py-8 text-gray-500"
                [attr.colspan]="displayedColumns.length"
              >
                Nenhum cliente cadastrado.
              </td>
            </tr>
          </table>
        </mat-card>
      </div>
    </section>
  `,
})
export class ListarClienteComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly TipoCliente = TipoCliente;
  protected readonly displayedColumns: string[] = [
    'nome',
    'telefone',
    'documentos',
    'tipo',
    'acoes',
  ];

  protected readonly clientes$ = this.route.data.pipe(
    map((data) => data['clientes'] as ClienteViewModel[]),
  );
}
