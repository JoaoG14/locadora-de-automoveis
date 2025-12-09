import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observer } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { InserirVeiculoViewModel } from '../veiculo.models';
import { VeiculoService } from '../veiculo.service';
import { GrupoVeiculoService } from '../../grupo-veiculos/grupo-veiculo.service';

@Component({
  selector: 'app-cadastrar-veiculo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [GrupoVeiculoService],
  template: `
    <form [formGroup]="form" (ngSubmit)="cadastrar()" class="mx-auto max-w-3xl mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Cadastrar Veículo</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-4">
          <!-- Foto Preview -->
          <div class="flex flex-col items-center justify-center gap-2 mb-4">
            <div
              *ngIf="fotoPreview; else noPhoto"
              class="relative w-40 h-40 border rounded-lg overflow-hidden"
            >
              <img [src]="fotoPreview" class="w-full h-full object-cover" />
              <button
                type="button"
                mat-icon-button
                class="absolute top-1 right-1 bg-white/80"
                (click)="removerFoto()"
              >
                <mat-icon color="warn">close</mat-icon>
              </button>
            </div>
            <ng-template #noPhoto>
              <div
                class="w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400"
              >
                <mat-icon class="!w-12 !h-12 !text-5xl">image</mat-icon>
              </div>
            </ng-template>

            <button type="button" mat-stroked-button (click)="fileInput.click()">
              Selecionar Foto
            </button>
            <input
              #fileInput
              type="file"
              accept="image/*"
              class="hidden"
              (change)="onFileSelected($event)"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Grupo -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Grupo de Automóveis</mat-label>
              <mat-select formControlName="grupoVeiculoId">
                @for (grupo of grupos$ | async; track $index) {
                  <mat-option [value]="grupo.id">{{ grupo.nome }}</mat-option>
                }
              </mat-select>
              <mat-error *ngIf="grupoVeiculoId?.hasError('required')"
                >O grupo é obrigatório</mat-error
              >
            </mat-form-field>

            <!-- Modelo -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Modelo</mat-label>
              <input matInput formControlName="modelo" placeholder="Ex: Corolla XEi" />
              <mat-error *ngIf="modelo?.hasError('required')">O modelo é obrigatório</mat-error>
            </mat-form-field>

            <!-- Marca -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Marca</mat-label>
              <input matInput formControlName="marca" placeholder="Ex: Toyota" />
              <mat-error *ngIf="marca?.hasError('required')">A marca é obrigatória</mat-error>
            </mat-form-field>

            <!-- Cor -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Cor</mat-label>
              <input matInput formControlName="cor" placeholder="Ex: Preto" />
              <mat-error *ngIf="cor?.hasError('required')">A cor é obrigatória</mat-error>
            </mat-form-field>

            <!-- Tipo Combustível -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Tipo de Combustível</mat-label>
              <mat-select formControlName="tipoCombustivel">
                @for (tipo of tiposCombustivel; track $index) {
                  <mat-option [value]="tipo">{{ tipo }}</mat-option>
                }
              </mat-select>
              <mat-error *ngIf="tipoCombustivel?.hasError('required')"
                >O tipo de combustível é obrigatório</mat-error
              >
            </mat-form-field>

            <!-- Capacidade -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Capacidade em Litros</mat-label>
              <input
                matInput
                type="number"
                formControlName="capacidadeTanque"
                placeholder="Ex: 50"
              />
              <mat-error *ngIf="capacidadeTanque?.hasError('required')"
                >A capacidade é obrigatória</mat-error
              >
              <mat-error *ngIf="capacidadeTanque?.hasError('min')">Deve ser maior que 0</mat-error>
            </mat-form-field>

            <!-- Ano -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Ano</mat-label>
              <input matInput type="number" formControlName="ano" placeholder="Ex: 2024" />
              <mat-error *ngIf="ano?.hasError('required')">O ano é obrigatório</mat-error>
              <mat-error *ngIf="ano?.hasError('min')">Ano inválido</mat-error>
            </mat-form-field>

            <!-- Placa -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Placa</mat-label>
              <input matInput formControlName="placa" placeholder="Ex: ABC-1234" />
              <mat-error *ngIf="placa?.hasError('required')">A placa é obrigatória</mat-error>
            </mat-form-field>
          </div>
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2">
          <a routerLink="/veiculos" mat-button>Cancelar</a>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Gravar
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class CadastrarVeiculoComponent {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly veiculoService = inject(VeiculoService);
  protected readonly grupoService = inject(GrupoVeiculoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected readonly grupos$ = this.grupoService.selecionarTodos();
  protected readonly tiposCombustivel = ['Gasolina', 'Alcool', 'Diesel', 'Flex', 'Gas', 'Eletrico'];

  protected fotoPreview: string | null = null;

  protected form: FormGroup = this.formBuilder.group({
    placa: ['', [Validators.required]],
    marca: ['', [Validators.required]],
    cor: ['', [Validators.required]],
    modelo: ['', [Validators.required]],
    tipoCombustivel: ['', [Validators.required]],
    capacidadeTanque: [null, [Validators.required, Validators.min(1)]],
    ano: [null, [Validators.required, Validators.min(1900)]],
    grupoVeiculoId: ['', [Validators.required]],
    foto: [null], // Base64 string
  });

  // Getters for template access
  get placa() {
    return this.form.get('placa');
  }
  get marca() {
    return this.form.get('marca');
  }
  get cor() {
    return this.form.get('cor');
  }
  get modelo() {
    return this.form.get('modelo');
  }
  get tipoCombustivel() {
    return this.form.get('tipoCombustivel');
  }
  get capacidadeTanque() {
    return this.form.get('capacidadeTanque');
  }
  get ano() {
    return this.form.get('ano');
  }
  get grupoVeiculoId() {
    return this.form.get('grupoVeiculoId');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result.split(',')[1];
        this.fotoPreview = e.target.result; // For preview (includes data:image/...)
        this.form.patchValue({ foto: base64String }); // Send only base64 to server (check if server expects prefix)
        // Usually server just wants bytes, so split is correct.
        // Wait, checking ViewModel structure... usually byte[] maps to base64 string in JSON.
        // If I send "data:image/png;base64,..." it might fail if server expects raw base64.
        // I will send simple base64 without prefix.
        // HOWEVER, to be safe, I should verify if the server manually decodes or uses a framework feature.
        // Assuming standard behavior: pure base64.

        // Actually, if I look at `Veiculo.cs`, `byte[]? Foto`.
        // System.Text.Json handles Base64 string to byte[] conversion automatically.
        // It generally expects just the Base64 data.
      };
      reader.readAsDataURL(file);
    }
  }

  removerFoto() {
    this.fotoPreview = null;
    this.form.patchValue({ foto: null });
  }

  public cadastrar() {
    if (this.form.invalid) return;

    const request: InserirVeiculoViewModel = this.form.value;

    const observer: Observer<any> = {
      next: (veiculo) =>
        this.notificacaoService.sucesso(`Veículo "${veiculo.modelo}" cadastrado com sucesso!`),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/veiculos']),
    };

    this.veiculoService.cadastrar(request).subscribe(observer);
  }
}
