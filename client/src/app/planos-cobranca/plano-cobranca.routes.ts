import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { PlanoCobrancaService } from './plano-cobranca.service';
import { ListarPlanoCobrancaViewModel } from './plano-cobranca.models';
import { ListarPlanoCobrancaComponent } from './listar/listar-plano-cobranca.component';
import { CadastrarPlanoCobrancaComponent } from './cadastrar/cadastrar-plano-cobranca.component';
import { EditarPlanoCobrancaComponent } from './editar/editar-plano-cobranca.component';
import { ExcluirPlanoCobrancaComponent } from './excluir/excluir-plano-cobranca.component';
import { GrupoVeiculoService } from '../grupo-veiculos/grupo-veiculo.service';
import { ListarGrupoVeiculoViewModel } from '../grupo-veiculos/grupo-veiculo.models';

const listarPlanosResolver: ResolveFn<ListarPlanoCobrancaViewModel[]> = () => {
  return inject(PlanoCobrancaService).selecionarTodos();
};

const listarGruposResolver: ResolveFn<ListarGrupoVeiculoViewModel[]> = () => {
  return inject(GrupoVeiculoService).selecionarTodos();
};

const planoResolver: ResolveFn<ListarPlanoCobrancaViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(PlanoCobrancaService).selecionarPorId(route.paramMap.get('id')!);
};

export const planoCobrancaRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarPlanoCobrancaComponent,
    resolve: {
      planos: listarPlanosResolver,
      grupos: listarGruposResolver,
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarPlanoCobrancaComponent,
    resolve: {
      grupos: listarGruposResolver,
    },
  },
  {
    path: 'editar/:id',
    component: EditarPlanoCobrancaComponent,
    resolve: {
      plano: planoResolver,
      grupos: listarGruposResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExcluirPlanoCobrancaComponent,
    resolve: {
      plano: planoResolver,
      grupos: listarGruposResolver,
    },
  },
];
