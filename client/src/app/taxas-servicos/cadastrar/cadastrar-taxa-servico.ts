import { Observer } from 'rxjs';

import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { InserirTaxaServicoRequest, TaxaServicoViewModel } from '../taxa-servico.models';
import { TaxaServicoService } from '../taxa-servico.service';

@Component({
  selector: 'app-cadastrar-taxa-servico',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './cadastrar-taxa-servico.html',
})
export class CadastrarTaxaServico {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly taxaServicoService = inject(TaxaServicoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected taxaServicoForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    precoFixo: [true, [Validators.required]],
  });

  get nome() {
    return this.taxaServicoForm.get('nome');
  }

  get preco() {
    return this.taxaServicoForm.get('preco');
  }

  get precoFixo() {
    return this.taxaServicoForm.get('precoFixo');
  }

  public cadastrar() {
    if (this.taxaServicoForm.invalid) return;

    const request: InserirTaxaServicoRequest = {
      nome: this.nome?.value,
      preco: this.preco?.value,
      precoFixo: this.precoFixo?.value,
    };

    const cadastroObserver: Observer<TaxaServicoViewModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `A taxa/serviço "${request.nome}" foi cadastrada com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/taxas-servicos']),
    };

    this.taxaServicoService.cadastrar(request).subscribe(cadastroObserver);
  }
}
