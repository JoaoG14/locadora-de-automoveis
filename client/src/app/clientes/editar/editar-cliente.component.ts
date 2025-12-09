import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, take } from 'rxjs';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  ClienteViewModel,
  EditarPessoaFisicaViewModel,
  EditarPessoaJuridicaViewModel,
  TipoCliente,
} from '../cliente.models';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="editar()" class="mx-auto max-w-2xl mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Editar Cliente</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-4">
          <!-- Nome -->
          <mat-form-field class="w-full">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" />
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="nome?.hasError('required')">O nome é obrigatório</mat-error>
            <mat-error *ngIf="nome?.hasError('minlength')"
              >O nome deve ter no mínimo 3 caracteres</mat-error
            >
          </mat-form-field>

          <!-- Telefone -->
          <mat-form-field class="w-full">
            <mat-label>Telefone</mat-label>
            <input matInput formControlName="telefone" />
            <mat-icon matSuffix>phone</mat-icon>
            <mat-error *ngIf="form.get('telefone')?.hasError('required')"
              >O telefone é obrigatório</mat-error
            >
          </mat-form-field>

          <!-- Endereço -->
          <mat-form-field class="w-full">
            <mat-label>Endereço Completo</mat-label>
            <input matInput formControlName="endereco" />
            <mat-icon matSuffix>location_on</mat-icon>
            <mat-error *ngIf="form.get('endereco')?.hasError('required')"
              >O endereço é obrigatório</mat-error
            >
          </mat-form-field>

          <!-- Tipo de Cliente (Desabilitado na edição) -->
          <div class="mt-2 mb-2 opacity-75">
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo de Cliente:</label>
            <mat-radio-group formControlName="tipo" color="primary" class="flex gap-6">
              <mat-radio-button [value]="TipoCliente.PessoaFisica">Pessoa Física</mat-radio-button>
              <mat-radio-button [value]="TipoCliente.PessoaJuridica"
                >Pessoa Jurídica</mat-radio-button
              >
            </mat-radio-group>
          </div>

          <!-- Campos Pessoa Física -->
          @if (isPessoaFisica) {
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
              <mat-form-field>
                <mat-label>CPF</mat-label>
                <input matInput formControlName="cpf" />
                <mat-error *ngIf="form.get('cpf')?.hasError('required')"
                  >O CPF é obrigatório</mat-error
                >
              </mat-form-field>

              <mat-form-field>
                <mat-label>RG</mat-label>
                <input matInput formControlName="rg" />
                <mat-error *ngIf="form.get('rg')?.hasError('required')"
                  >O RG é obrigatório</mat-error
                >
              </mat-form-field>

              <mat-form-field>
                <mat-label>CNH</mat-label>
                <input matInput formControlName="cnh" />
                <mat-error *ngIf="form.get('cnh')?.hasError('required')"
                  >A CNH é obrigatória</mat-error
                >
              </mat-form-field>
            </div>
          }

          <!-- Campos Pessoa Jurídica -->
          @if (isPessoaJuridica) {
            <div class="grid grid-cols-1 gap-4 border-t pt-4">
              <mat-form-field class="w-full">
                <mat-label>CNPJ</mat-label>
                <input matInput formControlName="cnpj" />
                <mat-error *ngIf="form.get('cnpj')?.hasError('required')"
                  >O CNPJ é obrigatório</mat-error
                >
              </mat-form-field>
            </div>
          }
        </mat-card-content>

        <mat-card-actions align="end" class="gap-2 pt-4">
          <a routerLink="/clientes" mat-button>Cancelar</a>
          <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
            Salvar
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class EditarClienteComponent implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly clienteService = inject(ClienteService);
  protected readonly notificacaoService = inject(NotificacaoService);
  protected readonly TipoCliente = TipoCliente;

  protected form: FormGroup = this.formBuilder.group({
    id: [''],
    tipo: [{ value: TipoCliente.PessoaFisica, disabled: true }, [Validators.required]],
    nome: ['', [Validators.required, Validators.minLength(3)]],
    telefone: ['', [Validators.required]],
    endereco: ['', [Validators.required]],

    // PF
    cpf: [''],
    rg: [''],
    cnh: [''],

    // PJ
    cnpj: [''],
  });

  protected readonly cliente$ = this.route.data.pipe(
    map((data) => data['cliente'] as ClienteViewModel),
  );

  get nome() {
    return this.form.get('nome');
  }
  get tipo() {
    return this.form.get('tipo')?.value;
  }
  get isPessoaFisica() {
    return this.tipo === TipoCliente.PessoaFisica;
  }
  get isPessoaJuridica() {
    return this.tipo === TipoCliente.PessoaJuridica;
  }

  ngOnInit(): void {
    this.cliente$.pipe(take(1)).subscribe((cliente) => {
      this.form.patchValue(cliente);
      this.atualizarValidadores(cliente.tipo);
    });
  }

  private atualizarValidadores(tipo: TipoCliente) {
    const cpfControl = this.form.get('cpf');
    const rgControl = this.form.get('rg');
    const cnhControl = this.form.get('cnh');
    const cnpjControl = this.form.get('cnpj');

    if (tipo === TipoCliente.PessoaFisica) {
      cpfControl?.setValidators([Validators.required]);
      rgControl?.setValidators([Validators.required]);
      cnhControl?.setValidators([Validators.required]);
      cnpjControl?.clearValidators();
    } else {
      cpfControl?.clearValidators();
      rgControl?.clearValidators();
      cnhControl?.clearValidators();
      cnpjControl?.setValidators([Validators.required]);
    }

    cpfControl?.updateValueAndValidity();
    rgControl?.updateValueAndValidity();
    cnhControl?.updateValueAndValidity();
    cnpjControl?.updateValueAndValidity();
  }

  public editar() {
    if (this.form.invalid) return;

    if (this.isPessoaFisica) {
      const request: EditarPessoaFisicaViewModel = {
        id: this.form.value.id,
        nome: this.form.value.nome,
        telefone: this.form.value.telefone,
        endereco: this.form.value.endereco,
        cpf: this.form.value.cpf,
        rg: this.form.value.rg,
        cnh: this.form.value.cnh,
      };

      this.clienteService.editarPessoaFisica(request.id, request).subscribe({
        next: () => this.sucesso(),
        error: (err) => this.erro(err),
      });
    } else {
      const request: EditarPessoaJuridicaViewModel = {
        id: this.form.value.id,
        nome: this.form.value.nome,
        telefone: this.form.value.telefone,
        endereco: this.form.value.endereco,
        cnpj: this.form.value.cnpj,
      };

      this.clienteService.editarPessoaJuridica(request.id, request).subscribe({
        next: () => this.sucesso(),
        error: (err) => this.erro(err),
      });
    }
  }

  private sucesso() {
    this.notificacaoService.sucesso('Cliente editado com sucesso!');
    this.router.navigate(['/clientes']);
  }

  private erro(err: any) {
    this.notificacaoService.erro(err.error?.errors?.[0] ?? err.message ?? 'Erro ao editar cliente');
  }
}
