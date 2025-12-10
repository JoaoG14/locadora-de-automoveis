import { Observer } from 'rxjs';
import { format, parse } from 'date-fns';
import { CurrencyPipe } from '@angular/common';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';

import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import { AluguelViewModel, InserirAluguelRequest, TipoPlano } from '../aluguel.models';
import { AluguelService } from '../aluguel.service';
import { SelecionarCondutoresModel } from '../../condutores/condutor.models';
import { ListarVeiculoViewModel } from '../../veiculos/veiculo.models';
import { ListarPlanoCobrancaViewModel } from '../../planos-cobranca/plano-cobranca.models';
import { ListarTaxaServicoViewModel } from '../../taxas-servicos/taxa-servico.models';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';

@Component({
  selector: 'app-cadastrar-aluguel',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTabsModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,
    CurrencyPipe,
  ],
  templateUrl: './cadastrar-aluguel.html',
})
export class CadastrarAluguel implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly aluguelService = inject(AluguelService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected condutores: SelecionarCondutoresModel[] = [];
  protected veiculos: ListarVeiculoViewModel[] = [];
  protected planosCobranca: ListarPlanoCobrancaViewModel[] = [];
  protected taxasServicos: ListarTaxaServicoViewModel[] = [];
  protected gruposVeiculos: ListarGrupoVeiculoViewModel[] = [];
  protected veiculosFiltrados: ListarVeiculoViewModel[] = [];

  protected tiposPlano = [
    { value: TipoPlano.Diario, label: 'Diário' },
    { value: TipoPlano.Controlado, label: 'Controlado' },
    { value: TipoPlano.Livre, label: 'Livre' },
  ];

  protected aluguelForm: FormGroup = this.formBuilder.group({
    condutorId: ['', [Validators.required]],
    grupoVeiculoId: ['', [Validators.required]],
    veiculoId: ['', [Validators.required]],
    dataSaida: [format(new Date(), 'dd/MM/yyyy'), [Validators.required]],
    dataRetornoPrevista: ['', [Validators.required]],
    valorGarantia: [{ value: 1000, disabled: true }],
    planoCobrancaId: ['', [Validators.required]],
    tipoPlanoSelecionado: [TipoPlano.Diario, [Validators.required]],
    kmInicial: [0, [Validators.required, Validators.min(0)]],
    seguroCliente: [false],
    seguroTerceiros: [false],
    valorSeguroPorDia: [0, [Validators.min(0)]],
    taxasSelecionadas: this.formBuilder.array([]),
  });

  ngOnInit(): void {
    this.condutores = this.route.snapshot.data['condutores'] || [];
    this.veiculos = this.route.snapshot.data['veiculos'] || [];
    this.planosCobranca = this.route.snapshot.data['planosCobranca'] || [];
    this.taxasServicos = this.route.snapshot.data['taxasServicos'] || [];
    this.gruposVeiculos = this.route.snapshot.data['gruposVeiculos'] || [];

    // Watch for grupo changes to filter vehicles
    this.aluguelForm.get('grupoVeiculoId')?.valueChanges.subscribe((grupoId) => {
      this.filtrarVeiculos(grupoId);
      this.aluguelForm.patchValue({ veiculoId: '' });
    });

    // Initialize taxas checkboxes
    this.initializeTaxasCheckboxes();
  }

  private initializeTaxasCheckboxes(): void {
    const taxasArray = this.aluguelForm.get('taxasSelecionadas') as FormArray;
    this.taxasServicos.forEach(() => {
      taxasArray.push(this.formBuilder.control(false));
    });
  }

  private filtrarVeiculos(grupoId: string): void {
    if (grupoId) {
      this.veiculosFiltrados = this.veiculos.filter((v) => v.grupoVeiculoId === grupoId);
    } else {
      this.veiculosFiltrados = [];
    }
  }

  get condutorId() {
    return this.aluguelForm.get('condutorId');
  }

  get grupoVeiculoId() {
    return this.aluguelForm.get('grupoVeiculoId');
  }

  get veiculoId() {
    return this.aluguelForm.get('veiculoId');
  }

  get dataSaida() {
    return this.aluguelForm.get('dataSaida');
  }

  get dataRetornoPrevista() {
    return this.aluguelForm.get('dataRetornoPrevista');
  }

  get planoCobrancaId() {
    return this.aluguelForm.get('planoCobrancaId');
  }

  get tipoPlanoSelecionado() {
    return this.aluguelForm.get('tipoPlanoSelecionado');
  }

  get kmInicial() {
    return this.aluguelForm.get('kmInicial');
  }

  get valorSeguroPorDia() {
    return this.aluguelForm.get('valorSeguroPorDia');
  }

  get taxasSelecionadas() {
    return this.aluguelForm.get('taxasSelecionadas') as FormArray;
  }

  getTaxaControl(index: number): FormControl {
    return this.taxasSelecionadas.at(index) as FormControl;
  }

  protected calcularValorTotal(): number {
    // This is a simplified calculation - the backend will do the real calculation
    return 1000; // Placeholder
  }

  public cadastrar() {
    if (this.aluguelForm.invalid) return;

    const taxasIds: string[] = [];
    this.taxasSelecionadas.controls.forEach((control, index) => {
      if (control.value) {
        taxasIds.push(this.taxasServicos[index].id);
      }
    });

    const request: InserirAluguelRequest = {
      condutorId: this.condutorId?.value,
      veiculoId: this.veiculoId?.value,
      planoCobrancaId: this.planoCobrancaId?.value,
      tipoPlanoSelecionado: this.tipoPlanoSelecionado?.value,
      dataSaida: parse(this.dataSaida?.value, 'dd/MM/yyyy', new Date()),
      dataRetornoPrevista: parse(this.dataRetornoPrevista?.value, 'dd/MM/yyyy', new Date()),
      kmInicial: this.kmInicial?.value,
      seguroCliente: this.aluguelForm.get('seguroCliente')?.value || false,
      seguroTerceiros: this.aluguelForm.get('seguroTerceiros')?.value || false,
      valorSeguroPorDia: this.valorSeguroPorDia?.value || 0,
      taxasServicosIds: taxasIds,
    };

    const cadastroObserver: Observer<AluguelViewModel> = {
      next: () => this.notificacaoService.sucesso('Aluguel cadastrado com sucesso!'),
      error: (err) => {
        if (err.error && Array.isArray(err.error)) {
          err.error.forEach((msg: string) => this.notificacaoService.erro(msg));
        } else {
          this.notificacaoService.erro('Erro ao cadastrar aluguel.');
        }
      },
      complete: () => this.router.navigate(['/alugueis']),
    };

    this.aluguelService.cadastrar(request).subscribe(cadastroObserver);
  }
}
