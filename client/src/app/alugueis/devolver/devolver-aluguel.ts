import { Observer } from 'rxjs';
import { format, parse } from 'date-fns';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { AluguelViewModel, DevolucaoAluguelRequest, TipoPlano } from '../aluguel.models';
import { AluguelService } from '../aluguel.service';
import { SelecionarCondutoresModel } from '../../condutores/condutor.models';
import { ListarVeiculoViewModel } from '../../veiculos/veiculo.models';

@Component({
  selector: 'app-devolver-aluguel',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './devolver-aluguel.html',
})
export class DevolverAluguel implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly aluguelService = inject(AluguelService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected aluguel?: AluguelViewModel;
  protected condutorNome?: string;
  protected veiculoNome?: string;
  protected veiculoPlaca?: string;

  protected devolucaoForm: FormGroup = this.formBuilder.group({
    dataRetornoEfetiva: [format(new Date(), 'dd/MM/yyyy'), [Validators.required]],
    kmFinal: [0, [Validators.required, Validators.min(0)]],
    tanqueCheio: [false],
  });

  ngOnInit(): void {
    this.aluguel = this.route.snapshot.data['aluguel'] as AluguelViewModel;
    const condutores = this.route.snapshot.data['condutores'] as SelecionarCondutoresModel[];
    const veiculos = this.route.snapshot.data['veiculos'] as ListarVeiculoViewModel[];

    if (!this.aluguel) {
      this.notificacaoService.erro('Aluguel não encontrado!');
      this.router.navigate(['/alugueis']);
      return;
    }

    if (this.aluguel.concluido) {
      this.notificacaoService.erro('Este aluguel já foi concluído!');
      this.router.navigate(['/alugueis']);
      return;
    }

    const condutor = condutores.find((c) => c.id === this.aluguel!.condutorId);
    const veiculo = veiculos.find((v) => v.id === this.aluguel!.veiculoId);

    this.condutorNome = condutor?.nome || 'Condutor Removido';
    this.veiculoNome = veiculo ? `${veiculo.marca} ${veiculo.modelo}` : 'Veículo Removido';
    this.veiculoPlaca = veiculo?.placa;

    // Set km inicial as minimum for km final
    this.devolucaoForm
      .get('kmFinal')
      ?.setValidators([Validators.required, Validators.min(this.aluguel.kmInicial)]);
  }

  get dataRetornoEfetiva() {
    return this.devolucaoForm.get('dataRetornoEfetiva');
  }

  get kmFinal() {
    return this.devolucaoForm.get('kmFinal');
  }

  get tanqueCheio() {
    return this.devolucaoForm.get('tanqueCheio');
  }

  protected getTipoPlanoLabel(tipo: TipoPlano): string {
    switch (tipo) {
      case TipoPlano.Diario:
        return 'Diário';
      case TipoPlano.Controlado:
        return 'Controlado';
      case TipoPlano.Livre:
        return 'Livre';
      default:
        return 'Desconhecido';
    }
  }

  protected calcularMulta(): number {
    if (!this.aluguel || !this.dataRetornoEfetiva?.value) return 0;

    const dataRetorno = parse(this.dataRetornoEfetiva.value, 'dd/MM/yyyy', new Date());
    const dataPrevista = new Date(this.aluguel.dataRetornoPrevista);

    if (dataRetorno > dataPrevista) {
      return this.aluguel.valorTotal * 0.1; // 10% de multa
    }

    return 0;
  }

  protected calcularValorFinal(): number {
    if (!this.aluguel) return 0;
    return this.aluguel.valorTotal + this.calcularMulta();
  }

  public devolver() {
    if (this.devolucaoForm.invalid || !this.aluguel) return;

    const request: DevolucaoAluguelRequest = {
      aluguelId: this.aluguel.id,
      dataRetornoEfetiva: parse(this.dataRetornoEfetiva?.value, 'dd/MM/yyyy', new Date()),
      kmFinal: this.kmFinal?.value,
      tanqueCheio: this.tanqueCheio?.value || false,
    };

    const devolucaoObserver: Observer<AluguelViewModel> = {
      next: () => this.notificacaoService.sucesso('Aluguel devolvido com sucesso!'),
      error: (err) => {
        if (err.error && Array.isArray(err.error)) {
          err.error.forEach((msg: string) => this.notificacaoService.erro(msg));
        } else {
          this.notificacaoService.erro('Erro ao devolver aluguel.');
        }
      },
      complete: () => this.router.navigate(['/alugueis']),
    };

    this.aluguelService.concluirAluguel(request).subscribe(devolucaoObserver);
  }
}
