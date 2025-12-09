import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { VeiculoService } from './veiculo.service';
import { VeiculoViewModel } from './veiculo.models';
import { ListarVeiculoComponent } from './listar/listar-veiculo.component';
import { CadastrarVeiculoComponent } from './cadastrar/cadastrar-veiculo.component';
import { EditarVeiculoComponent } from './editar/editar-veiculo.component';
import { ExcluirVeiculoComponent } from './excluir/excluir-veiculo.component';

const veiculoResolver: ResolveFn<VeiculoViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(VeiculoService).selecionarPorId(route.paramMap.get('id')!);
};

const listarVeiculosResolver: ResolveFn<any> = () => {
  return inject(VeiculoService).selecionarTodos();
};

export const veiculoRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarVeiculoComponent,
    resolve: {
      veiculos: listarVeiculosResolver,
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarVeiculoComponent,
  },
  {
    path: 'editar/:id',
    component: EditarVeiculoComponent,
    resolve: {
      veiculo: veiculoResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExcluirVeiculoComponent,
    resolve: {
      veiculo: veiculoResolver,
    },
  },
];
