import { ActivatedRouteSnapshot, ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ClienteService } from './cliente.service';
import { ClienteViewModel } from './cliente.models';
import { ListarClienteComponent } from './listar/listar-cliente.component';
import { CadastrarClienteComponent } from './cadastrar/cadastrar-cliente.component';
import { EditarClienteComponent } from './editar/editar-cliente.component';
import { ExcluirClienteComponent } from './excluir/excluir-cliente.component';

const listarClientesResolver: ResolveFn<ClienteViewModel[]> = () => {
  return inject(ClienteService).selecionarTodos();
};

const clienteResolver: ResolveFn<ClienteViewModel> = (route: ActivatedRouteSnapshot) => {
  return inject(ClienteService).selecionarPorId(route.paramMap.get('id')!);
};

export const clienteRoutes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarClienteComponent,
    resolve: {
      clientes: listarClientesResolver,
    },
  },
  {
    path: 'cadastrar',
    component: CadastrarClienteComponent,
  },
  {
    path: 'editar/:id',
    component: EditarClienteComponent,
    resolve: {
      cliente: clienteResolver,
    },
  },
  {
    path: 'excluir/:id',
    component: ExcluirClienteComponent,
    resolve: {
      cliente: clienteResolver,
    },
  },
];
