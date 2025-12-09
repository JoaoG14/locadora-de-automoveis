import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { Observer } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { GrupoVeiculoViewModel, InserirGrupoVeiculoRequest } from '../grupo-veiculo.models';
import { GrupoVeiculoService } from '../grupo-veiculo.service';

@Component({
  selector: 'app-cadastrar-grupo-veiculo',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="cadastrar()" class="mx-auto max-w-lg mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Cadastrar Grupo de Veículos</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-2">
          <mat-form-field class="w-full">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" placeholder="Ex: SUV, Sedan Compacto" />
            <mat-error *ngIf="nome?.hasError('required')">O nome é obrigatório</mat-error>
            <mat-error *ngIf="nome?.hasError('minlength')"
              >O nome deve ter no mínimo 3 caracteres</mat-error
            >
          </mat-form-field>
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2">
          <a routerLink="/grupo-veiculos" mat-button>Cancelar</a>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Salvar
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class CadastrarGrupoVeiculo {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly grupoVeiculoService = inject(GrupoVeiculoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected form: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
  });

  get nome() {
    return this.form.get('nome');
  }

  public cadastrar() {
    if (this.form.invalid) return;

    const request: InserirGrupoVeiculoRequest = this.form.value;

    const observer: Observer<GrupoVeiculoViewModel> = {
      next: (grupo) =>
        this.notificacaoService.sucesso(`O grupo "${grupo.nome}" foi cadastrado com sucesso!`),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/grupo-veiculos']),
    };

    this.grupoVeiculoService.cadastrar(request).subscribe(observer);
  }
}
