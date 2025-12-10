import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { filter, map, shareReplay, switchMap, take, tap } from 'rxjs';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  EditarPlanoCobrancaViewModel,
  ListarPlanoCobrancaViewModel,
} from '../plano-cobranca.models';
import { PlanoCobrancaService } from '../plano-cobranca.service';

@Component({
  selector: 'app-editar-plano-cobranca',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="editar()" class="mx-auto max-w-4xl mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Editar Plano de Cobrança</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-4">
          <!-- Grupo de Veículos -->
          <mat-form-field class="w-full">
            <mat-label>Grupo de Automóveis</mat-label>
            <mat-select formControlName="grupoVeiculoId">
              @for (grupo of grupos$ | async; track grupo.id) {
                <mat-option [value]="grupo.id">{{ grupo.nome }}</mat-option>
              }
            </mat-select>
            <mat-error *ngIf="grupoVeiculoId?.hasError('required')"
              >O grupo é obrigatório</mat-error
            >
          </mat-form-field>

          <!-- Configuração de Planos -->
          <div class="border rounded-lg p-4 mt-2">
            <h3 class="text-lg font-medium mb-3">Configuração de Planos</h3>

            <mat-tab-group
              mat-stretch-tabs="false"
              mat-align-tabs="start"
              dynamicHeight
              class="border rounded-md"
            >
              <!-- Plano Diário -->
              <mat-tab label="Plano Diário">
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <mat-form-field>
                    <mat-label>Preço Diária</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="precoDiarioPlanoDiario"
                      placeholder="0,00"
                    />
                    <span matTextPrefix>R$&nbsp;</span>
                    <mat-error *ngIf="form.get('precoDiarioPlanoDiario')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error *ngIf="form.get('precoDiarioPlanoDiario')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Preço por Km</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="precoPorKmPlanoDiario"
                      placeholder="0,00"
                    />
                    <span matTextPrefix>R$&nbsp;</span>
                    <mat-error *ngIf="form.get('precoPorKmPlanoDiario')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error *ngIf="form.get('precoPorKmPlanoDiario')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>
                </div>
              </mat-tab>

              <!-- Plano Controlado -->
              <mat-tab label="Plano Controlado">
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <mat-form-field>
                    <mat-label>Km Disponíveis</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="limiteKmPlanoControlado"
                      placeholder="0"
                    />
                    <span matTextSuffix>&nbsp;Km</span>
                    <mat-error *ngIf="form.get('limiteKmPlanoControlado')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error *ngIf="form.get('limiteKmPlanoControlado')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>

                  <mat-form-field>
                    <mat-label>Preço Diária</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="precoDiarioPlanoControlado"
                      placeholder="0,00"
                    />
                    <span matTextPrefix>R$&nbsp;</span>
                    <mat-error *ngIf="form.get('precoDiarioPlanoControlado')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error *ngIf="form.get('precoDiarioPlanoControlado')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>

                  <mat-form-field class="col-span-1 md:col-span-2">
                    <mat-label>Preço por Km Extrapolado</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="precoPorKmExtrapoladoPlanoControlado"
                      placeholder="0,00"
                    />
                    <span matTextPrefix>R$&nbsp;</span>
                    <mat-error
                      *ngIf="form.get('precoPorKmExtrapoladoPlanoControlado')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error
                      *ngIf="form.get('precoPorKmExtrapoladoPlanoControlado')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>
                </div>
              </mat-tab>

              <!-- Plano Livre -->
              <mat-tab label="Plano Livre">
                <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <mat-form-field>
                    <mat-label>Preço Diária</mat-label>
                    <input
                      matInput
                      type="number"
                      formControlName="precoDiarioPlanoLivre"
                      placeholder="0,00"
                    />
                    <span matTextPrefix>R$&nbsp;</span>
                    <mat-error *ngIf="form.get('precoDiarioPlanoLivre')?.hasError('required')"
                      >Obrigatório</mat-error
                    >
                    <mat-error *ngIf="form.get('precoDiarioPlanoLivre')?.hasError('min')"
                      >Valor inválido</mat-error
                    >
                  </mat-form-field>
                </div>
              </mat-tab>
            </mat-tab-group>
          </div>
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2 pt-4">
          <a routerLink="/planos-cobranca" mat-button>Cancelar</a>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Gravar
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class EditarPlanoCobrancaComponent implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly planoService = inject(PlanoCobrancaService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly grupos$ = this.route.data.pipe(
    map((data) => data['grupos'] as ListarGrupoVeiculoViewModel[]),
  );

  protected readonly plano$ = this.route.data.pipe(
    filter((data) => data['plano']),
    map((data) => data['plano'] as ListarPlanoCobrancaViewModel),
    tap((plano) => this.form.patchValue(plano)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  protected form: FormGroup = this.formBuilder.group({
    id: [''], // Hidden field for ID if needed, but we use route param too
    grupoVeiculoId: ['', [Validators.required]],

    // Diario
    precoDiarioPlanoDiario: [null, [Validators.required, Validators.min(0)]],
    precoPorKmPlanoDiario: [null, [Validators.required, Validators.min(0)]],

    // Controlado
    precoDiarioPlanoControlado: [null, [Validators.required, Validators.min(0)]],
    limiteKmPlanoControlado: [null, [Validators.required, Validators.min(0)]],
    precoPorKmExtrapoladoPlanoControlado: [null, [Validators.required, Validators.min(0)]],

    // Livre
    precoDiarioPlanoLivre: [null, [Validators.required, Validators.min(0)]],
  });

  get grupoVeiculoId() {
    return this.form.get('grupoVeiculoId');
  }

  ngOnInit() {
    // Subscribe to plano$ to trigger the tap operator that patches the form
    this.plano$.subscribe();
  }

  public editar() {
    if (this.form.invalid) return;

    this.plano$.pipe(take(1)).subscribe((plano) => {
      const request: EditarPlanoCobrancaViewModel = {
        ...this.form.value,
        id: plano.id,
      };

      this.planoService.editar(plano.id, request).subscribe({
        next: () => {
          this.notificacaoService.sucesso('Plano de cobrança editado com sucesso!');
          this.router.navigate(['/planos-cobranca']);
        },
        error: (err) => this.notificacaoService.erro(err),
      });
    });
  }
}
