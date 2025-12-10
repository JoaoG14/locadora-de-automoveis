import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { CadastrarAluguel } from './cadastrar/cadastrar-aluguel';
import { EditarAluguel } from './editar/editar-aluguel';
import { ExcluirAluguel } from './excluir/excluir-aluguel';
import { DevolverAluguel } from './devolver/devolver-aluguel';
import { AluguelService } from './aluguel.service';
import { ListarAlugueis } from './listar/listar-alugueis';
import { CondutorService } from '../condutores/condutor.service';
import { VeiculoService } from '../veiculos/veiculo.service';
import { PlanoCobrancaService } from '../planos-cobranca/plano-cobranca.service';
import { TaxaServicoService } from '../taxas-servicos/taxa-servico.service';
import { GrupoVeiculoService } from '../grupo-veiculos/grupo-veiculo.service';

export const listarAlugueisResolver = () => {
  return inject(AluguelService).selecionarTodos();
};

export const detalhesAluguelResolver = (route: ActivatedRouteSnapshot) => {
  const aluguelService = inject(AluguelService);

  if (!route.paramMap.get('id')) throw new Error('O parâmetro id não foi fornecido.');

  const aluguelId = route.paramMap.get('id')!;

  return aluguelService.selecionarPorId(aluguelId);
};

export const condutoresResolver = () => {
  return inject(CondutorService).selecionarTodos();
};

export const veiculosResolver = () => {
  return inject(VeiculoService).selecionarTodos();
};

export const planosCobrancaResolver = () => {
  return inject(PlanoCobrancaService).selecionarTodos();
};

export const taxasServicosResolver = () => {
  return inject(TaxaServicoService).selecionarTodos();
};

export const gruposVeiculosResolver = () => {
  return inject(GrupoVeiculoService).selecionarTodos();
};

export const aluguelRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarAlugueis,
        resolve: {
          alugueis: listarAlugueisResolver,
          condutores: condutoresResolver,
          veiculos: veiculosResolver,
        },
      },
      {
        path: 'cadastrar',
        component: CadastrarAluguel,
        resolve: {
          condutores: condutoresResolver,
          veiculos: veiculosResolver,
          planosCobranca: planosCobrancaResolver,
          taxasServicos: taxasServicosResolver,
          gruposVeiculos: gruposVeiculosResolver,
        },
      },
      {
        path: 'editar/:id',
        component: EditarAluguel,
        resolve: {
          aluguel: detalhesAluguelResolver,
          condutores: condutoresResolver,
          veiculos: veiculosResolver,
          planosCobranca: planosCobrancaResolver,
          taxasServicos: taxasServicosResolver,
          gruposVeiculos: gruposVeiculosResolver,
        },
      },
      {
        path: 'excluir/:id',
        component: ExcluirAluguel,
        resolve: {
          aluguel: detalhesAluguelResolver,
          condutores: condutoresResolver,
          veiculos: veiculosResolver,
        },
      },
      {
        path: 'devolver/:id',
        component: DevolverAluguel,
        resolve: {
          aluguel: detalhesAluguelResolver,
          condutores: condutoresResolver,
          veiculos: veiculosResolver,
        },
      },
    ],
    providers: [
      AluguelService,
      CondutorService,
      VeiculoService,
      PlanoCobrancaService,
      TaxaServicoService,
      GrupoVeiculoService,
    ],
  },
];
