import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { GrupoVeiculoService } from './grupo-veiculo.service';
import { GrupoVeiculoViewModel } from './grupo-veiculo.models';
import { ListarGrupoVeiculos } from './listar/listar-grupo-veiculos';
import { CadastrarGrupoVeiculo } from './cadastrar/cadastrar-grupo-veiculo';
import { EditarGrupoVeiculo } from './editar/editar-grupo-veiculo';
import { ExcluirGrupoVeiculo } from './excluir/excluir-grupo-veiculo';

const grupoVeiculoResolver: ResolveFn<GrupoVeiculoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(GrupoVeiculoService).selecionarPorId(route.paramMap.get('id')!);
};

const listarGrupoVeiculosResolver: ResolveFn<any> = () => {
  return inject(GrupoVeiculoService).selecionarTodos();
};

export const grupoVeiculoRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarGrupoVeiculos,
    resolve: {
      grupos: listarGrupoVeiculosResolver,
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarGrupoVeiculo,
  },
  {
    path: 'editar/:id',
    component: EditarGrupoVeiculo,
    resolve: {
      grupo: grupoVeiculoResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExcluirGrupoVeiculo,
    resolve: {
      grupo: grupoVeiculoResolver,
    },
  },
];
