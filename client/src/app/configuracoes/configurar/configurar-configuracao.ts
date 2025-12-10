import { forkJoin, Observable } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { ConfiguracaoService } from '../configuracao.service';
import { ConfiguracaoViewModel } from '../configuracao.models';

@Component({
  selector: 'app-configurar-configuracao',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './configurar-configuracao.html',
})
export class ConfigurarConfiguracao {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly configuracaoService = inject(ConfiguracaoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected configuracaoForm: FormGroup = this.formBuilder.group({
    gasolina: [0, [Validators.required, Validators.min(0.01)]],
    gas: [0, [Validators.required, Validators.min(0.01)]],
    diesel: [0, [Validators.required, Validators.min(0.01)]],
    alcool: [0, [Validators.required, Validators.min(0.01)]],
  });

  protected idsExistentes: {
    gasolina?: string;
    gas?: string;
    diesel?: string;
    alcool?: string;
  } = {};

  constructor() {
    this.carregarPrecosExistentes();
  }

  get gasolina() {
    return this.configuracaoForm.get('gasolina');
  }

  get gas() {
    return this.configuracaoForm.get('gas');
  }

  get diesel() {
    return this.configuracaoForm.get('diesel');
  }

  get alcool() {
    return this.configuracaoForm.get('alcool');
  }

  private carregarPrecosExistentes() {
    this.configuracaoService.selecionarTodos().subscribe({
      next: (configs) => {
        // Mapeia as configurações existentes
        // Como o backend não diferencia tipos de combustível, assumimos ordem: gasolina, gas, diesel, alcool
        // Em uma implementação futura, o backend poderia incluir um campo TipoCombustivel
        if (configs.length > 0) {
          this.idsExistentes.gasolina = configs[0]?.id;
          this.configuracaoForm.patchValue({ gasolina: configs[0]?.precoCombustivel || 0 });
        }
        if (configs.length > 1) {
          this.idsExistentes.gas = configs[1]?.id;
          this.configuracaoForm.patchValue({ gas: configs[1]?.precoCombustivel || 0 });
        }
        if (configs.length > 2) {
          this.idsExistentes.diesel = configs[2]?.id;
          this.configuracaoForm.patchValue({ diesel: configs[2]?.precoCombustivel || 0 });
        }
        if (configs.length > 3) {
          this.idsExistentes.alcool = configs[3]?.id;
          this.configuracaoForm.patchValue({ alcool: configs[3]?.precoCombustivel || 0 });
        }
      },
      error: (err) => {
        console.error('Erro ao carregar configurações:', err);
        this.notificacaoService.erro('Erro ao carregar configurações existentes');
      },
    });
  }

  public gravar() {
    if (this.configuracaoForm.invalid) return;

    const operacoes: Observable<ConfiguracaoViewModel>[] = [];

    // Gasolina
    if (this.idsExistentes.gasolina) {
      operacoes.push(
        this.configuracaoService.editar(this.idsExistentes.gasolina, this.gasolina?.value),
      );
    } else {
      operacoes.push(this.configuracaoService.cadastrar(this.gasolina?.value));
    }

    // Gás
    if (this.idsExistentes.gas) {
      operacoes.push(this.configuracaoService.editar(this.idsExistentes.gas, this.gas?.value));
    } else {
      operacoes.push(this.configuracaoService.cadastrar(this.gas?.value));
    }

    // Diesel
    if (this.idsExistentes.diesel) {
      operacoes.push(
        this.configuracaoService.editar(this.idsExistentes.diesel, this.diesel?.value),
      );
    } else {
      operacoes.push(this.configuracaoService.cadastrar(this.diesel?.value));
    }

    // Álcool
    if (this.idsExistentes.alcool) {
      operacoes.push(
        this.configuracaoService.editar(this.idsExistentes.alcool, this.alcool?.value),
      );
    } else {
      operacoes.push(this.configuracaoService.cadastrar(this.alcool?.value));
    }

    forkJoin(operacoes).subscribe({
      next: (configs) => {
        // Atualiza os IDs com os retornados pelo servidor
        if (configs.length > 0) this.idsExistentes.gasolina = configs[0].id;
        if (configs.length > 1) this.idsExistentes.gas = configs[1].id;
        if (configs.length > 2) this.idsExistentes.diesel = configs[2].id;
        if (configs.length > 3) this.idsExistentes.alcool = configs[3].id;
        this.notificacaoService.sucesso('Os preços dos combustíveis foram salvos com sucesso!');
      },
      error: (err) => this.notificacaoService.erro(err),
    });
  }

  public cancelar() {
    this.router.navigate(['/inicio']);
  }
}

