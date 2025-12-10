import { Observer } from 'rxjs';
import { format, parse } from 'date-fns';

import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
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
import { AluguelViewModel, EditarAluguelRequest, TipoPlano } from '../aluguel.models';
import { AluguelService } from '../aluguel.service';
import { SelecionarCondutoresModel } from '../../condutores/condutor.models';
import { ListarVeiculoViewModel } from '../../veiculos/veiculo.models';
import { ListarPlanoCobrancaViewModel } from '../../planos-cobranca/plano-cobranca.models';
import { ListarTaxaServicoViewModel } from '../../taxas-servicos/taxa-servico.models';
import { ListarGrupoVeiculoViewModel } from '../../grupo-veiculos/grupo-veiculo.models';

@Component({
  selector: 'app-editar-aluguel',
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
  ],
  templateUrl: './editar-aluguel.html',
})
export class EditarAluguel implements OnInit {
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
  protected aluguelId?: string;

  protected tiposPlano = [
    { value: TipoPlano.Diario, label: 'Diário' },
    { value: TipoPlano.Controlado, label: 'Controlado' },
    { value: TipoPlano.Livre, label: 'Livre' },
  ];

  protected aluguelForm: FormGroup = this.formBuilder.group({
    condutorId: ['', [Validators.required]],
    grupoVeiculoId: ['', [Validators.required]],
    veiculoId: ['', [Validators.required]],
    dataSaida: ['', [Validators.required]],
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

    const aluguel = this.route.snapshot.data['aluguel'] as AluguelViewModel;

    if (!aluguel) {
      this.notificacaoService.erro('Aluguel não encontrado!');
      this.router.navigate(['/alugueis']);
      return;
    }

    if (aluguel.concluido) {
      this.notificacaoService.erro('Não é possível editar um aluguel já concluído!');
      this.router.navigate(['/alugueis']);
      return;
    }

    this.aluguelId = aluguel.id;

    // Find the vehicle's group
    const veiculo = this.veiculos.find((v) => v.id === aluguel.veiculoId);
    const grupoId = veiculo?.grupoVeiculoId || '';

    // Initialize taxas checkboxes
    this.initializeTaxasCheckboxes(aluguel.taxasServicosIds);

    // Filter vehicles by group
    if (grupoId) {
      this.filtrarVeiculos(grupoId);
    }

    // Patch form values
    this.aluguelForm.patchValue({
      condutorId: aluguel.condutorId,
      grupoVeiculoId: grupoId,
      veiculoId: aluguel.veiculoId,
      dataSaida: format(new Date(aluguel.dataSaida), 'dd/MM/yyyy'),
      dataRetornoPrevista: format(new Date(aluguel.dataRetornoPrevista), 'dd/MM/yyyy'),
      planoCobrancaId: aluguel.planoCobrancaId,
      tipoPlanoSelecionado: aluguel.tipoPlanoSelecionado,
      kmInicial: aluguel.kmInicial,
      seguroCliente: aluguel.seguroCliente,
      seguroTerceiros: aluguel.seguroTerceiros,
      valorSeguroPorDia: aluguel.valorSeguroPorDia,
    });

    // Watch for grupo changes
    this.aluguelForm.get('grupoVeiculoId')?.valueChanges.subscribe((grupoId) => {
      this.filtrarVeiculos(grupoId);
      this.aluguelForm.patchValue({ veiculoId: '' });
    });
  }

  private initializeTaxasCheckboxes(taxasSelecionadasIds: string[]): void {
    const taxasArray = this.aluguelForm.get('taxasSelecionadas') as FormArray;
    this.taxasServicos.forEach((taxa) => {
      const isSelected = taxasSelecionadasIds.includes(taxa.id);
      taxasArray.push(this.formBuilder.control(isSelected));
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

  protected calcularValorTotal(): number {
    return 1000; // Placeholder
  }

  public editar() {
    if (this.aluguelForm.invalid || !this.aluguelId) return;

    const taxasIds: string[] = [];
    this.taxasSelecionadas.controls.forEach((control, index) => {
      if (control.value) {
        taxasIds.push(this.taxasServicos[index].id);
      }
    });

    const request: EditarAluguelRequest = {
      id: this.aluguelId,
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

    const edicaoObserver: Observer<AluguelViewModel> = {
      next: () => this.notificacaoService.sucesso('Aluguel editado com sucesso!'),
      error: (err) => {
        if (err.error && Array.isArray(err.error)) {
          err.error.forEach((msg: string) => this.notificacaoService.erro(msg));
        } else {
          this.notificacaoService.erro('Erro ao editar aluguel.');
        }
      },
      complete: () => this.router.navigate(['/alugueis']),
    };

    this.aluguelService.editar(this.aluguelId, request).subscribe(edicaoObserver);
  }
}
