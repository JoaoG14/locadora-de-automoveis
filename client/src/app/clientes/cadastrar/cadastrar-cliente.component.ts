import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  InserirPessoaFisicaViewModel,
  InserirPessoaJuridicaViewModel,
  TipoCliente,
} from '../cliente.models';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastrar-cliente',
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
    NgIf,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="cadastrar()" class="mx-auto max-w-2xl mt-6">
      <mat-card class="p-6">
        <mat-card-header class="mb-4">
          <mat-card-title>Cadastrar Cliente</mat-card-title>
        </mat-card-header>

        <mat-card-content class="flex flex-col gap-4">
          <!-- Nome -->
          <mat-form-field class="w-full">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="nome" placeholder="Ex: João da Silva" />
            <mat-icon matSuffix>person</mat-icon>
            <mat-error *ngIf="nome?.hasError('required')">O nome é obrigatório</mat-error>
            <mat-error *ngIf="nome?.hasError('minlength')"
              >O nome deve ter no mínimo 3 caracteres</mat-error
            >
          </mat-form-field>

          <!-- Telefone -->
          <mat-form-field class="w-full">
            <mat-label>Telefone</mat-label>
            <input matInput formControlName="telefone" placeholder="(00) 00000-0000" />
            <mat-icon matSuffix>phone</mat-icon>
            <mat-error *ngIf="form.get('telefone')?.hasError('required')"
              >O telefone é obrigatório</mat-error
            >
          </mat-form-field>

          <!-- Endereço -->
          <mat-form-field class="w-full">
            <mat-label>Endereço Completo</mat-label>
            <input
              matInput
              formControlName="endereco"
              placeholder="Rua, Número, Bairro, Cidade - UF"
            />
            <mat-icon matSuffix>location_on</mat-icon>
            <mat-error *ngIf="form.get('endereco')?.hasError('required')"
              >O endereço é obrigatório</mat-error
            >
          </mat-form-field>

          <!-- Tipo de Cliente -->
          <div class="mt-2 mb-2">
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
                <input matInput formControlName="cpf" placeholder="000.000.000-00" />
                <mat-error *ngIf="form.get('cpf')?.hasError('required')"
                  >O CPF é obrigatório</mat-error
                >
              </mat-form-field>

              <mat-form-field>
                <mat-label>RG</mat-label>
                <input matInput formControlName="rg" placeholder="0.000.000" />
                <mat-error *ngIf="form.get('rg')?.hasError('required')"
                  >O RG é obrigatório</mat-error
                >
              </mat-form-field>

              <mat-form-field>
                <mat-label>CNH</mat-label>
                <input matInput formControlName="cnh" placeholder="00000000000" />
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
                <input matInput formControlName="cnpj" placeholder="00.000.000/0000-00" />
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
            Gravar
          </button>
        </mat-card-actions>
      </mat-card>
    </form>
  `,
})
export class CadastrarClienteComponent implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly clienteService = inject(ClienteService);
  protected readonly notificacaoService = inject(NotificacaoService);
  protected readonly TipoCliente = TipoCliente;

  protected form: FormGroup = this.formBuilder.group({
    tipo: [TipoCliente.PessoaFisica, [Validators.required]],
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
    this.form.get('tipo')?.valueChanges.subscribe((valor) => {
      this.atualizarValidadores(valor);
    });

    // Inicializa validadores
    this.atualizarValidadores(this.tipo);
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
      cnpjControl?.setValue('');
    } else {
      cpfControl?.clearValidators();
      cpfControl?.setValue('');
      rgControl?.clearValidators();
      rgControl?.setValue('');
      cnhControl?.clearValidators();
      cnhControl?.setValue('');

      cnpjControl?.setValidators([Validators.required]);
    }

    cpfControl?.updateValueAndValidity();
    rgControl?.updateValueAndValidity();
    cnhControl?.updateValueAndValidity();
    cnpjControl?.updateValueAndValidity();
  }

  public cadastrar() {
    if (this.form.invalid) return;

    if (this.isPessoaFisica) {
      const request: InserirPessoaFisicaViewModel = {
        nome: this.form.value.nome,
        telefone: this.form.value.telefone,
        endereco: this.form.value.endereco,
        cpf: this.form.value.cpf,
        rg: this.form.value.rg,
        cnh: this.form.value.cnh,
      };

      this.clienteService.cadastrarPessoaFisica(request).subscribe({
        next: () => this.sucesso(),
        error: (err) => this.erro(err),
      });
    } else {
      const request: InserirPessoaJuridicaViewModel = {
        nome: this.form.value.nome,
        telefone: this.form.value.telefone,
        endereco: this.form.value.endereco,
        cnpj: this.form.value.cnpj,
      };

      this.clienteService.cadastrarPessoaJuridica(request).subscribe({
        next: () => this.sucesso(),
        error: (err) => this.erro(err),
      });
    }
  }

  private sucesso() {
    this.notificacaoService.sucesso('Cliente cadastrado com sucesso!');
    this.router.navigate(['/clientes']);
  }

  private erro(err: any) {
    this.notificacaoService.erro(
      err.error?.errors?.[0] ?? err.message ?? 'Erro ao cadastrar cliente',
    );
  }
}
