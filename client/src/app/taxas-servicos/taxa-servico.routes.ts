import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { CadastrarTaxaServico } from './cadastrar/cadastrar-taxa-servico';
import { EditarTaxaServico } from './editar/editar-taxa-servico';
import { ExcluirTaxaServico } from './excluir/excluir-taxa-servico';
import { TaxaServicoService } from './taxa-servico.service';
import { ListarTaxasServicos } from './listar/listar-taxas-servicos';

export const listarTaxasServicosResolver = () => {
  return inject(TaxaServicoService).selecionarTodos();
};

export const detalhesTaxaServicoResolver = (route: ActivatedRouteSnapshot) => {
  const taxaServicoService = inject(TaxaServicoService);

  if (!route.paramMap.get('id')) throw new Error('O parâmetro id não foi fornecido.');

  const taxaServicoId = route.paramMap.get('id')!;

  return taxaServicoService.selecionarPorId(taxaServicoId);
};

export const taxaServicoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ListarTaxasServicos,
        resolve: { taxasServicos: listarTaxasServicosResolver },
      },
      {
        path: 'cadastrar',
        component: CadastrarTaxaServico,
      },
      {
        path: 'editar/:id',
        component: EditarTaxaServico,
        resolve: { taxaServico: detalhesTaxaServicoResolver },
      },
      {
        path: 'excluir/:id',
        component: ExcluirTaxaServico,
        resolve: { taxaServico: detalhesTaxaServicoResolver },
      },
    ],
    providers: [TaxaServicoService],
  },
];
