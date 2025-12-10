import { Observer } from 'rxjs';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { EditarTaxaServicoRequest, TaxaServicoViewModel } from '../taxa-servico.models';
import { TaxaServicoService } from '../taxa-servico.service';

@Component({
  selector: 'app-editar-taxa-servico',
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
  templateUrl: './editar-taxa-servico.html',
})
export class EditarTaxaServico implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly taxaServicoService = inject(TaxaServicoService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected taxaServicoForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    preco: [0, [Validators.required, Validators.min(0.01)]],
    precoFixo: [true, [Validators.required]],
  });

  private taxaServicoId?: string;

  ngOnInit(): void {
    const taxaServico = this.route.snapshot.data['taxaServico'] as TaxaServicoViewModel;

    if (!taxaServico) {
      this.notificacaoService.erro('Taxa/Serviço não encontrada!');
      this.router.navigate(['/taxas-servicos']);
      return;
    }

    this.taxaServicoId = taxaServico.id;

    this.taxaServicoForm.patchValue({
      nome: taxaServico.nome,
      preco: taxaServico.preco,
      precoFixo: taxaServico.precoFixo,
    });
  }

  get nome() {
    return this.taxaServicoForm.get('nome');
  }

  get preco() {
    return this.taxaServicoForm.get('preco');
  }

  get precoFixo() {
    return this.taxaServicoForm.get('precoFixo');
  }

  public editar() {
    if (this.taxaServicoForm.invalid || !this.taxaServicoId) return;

    const request: EditarTaxaServicoRequest = {
      id: this.taxaServicoId,
      nome: this.nome?.value,
      preco: this.preco?.value,
      precoFixo: this.precoFixo?.value,
    };

    const edicaoObserver: Observer<TaxaServicoViewModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `A taxa/serviço "${request.nome}" foi editada com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/taxas-servicos']),
    };

    this.taxaServicoService.editar(this.taxaServicoId, request).subscribe(edicaoObserver);
  }
}
