import { map, take } from 'rxjs';

import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  inject,
  LOCALE_ID,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { CanActivateFn, provideRouter, Router, Routes } from '@angular/router';

import { provideAuth } from './auth/auth.provider';
import { AuthService } from './auth/auth.service';
import { GrupoVeiculoService } from './grupo-veiculos/grupo-veiculo.service';
import { VeiculoService } from './veiculos/veiculo.service';
import { PlanoCobrancaService } from './planos-cobranca/plano-cobranca.service';
import { provideNotifications } from './shared/notificacao/notificacao.provider';

const usuarioDesconhecidoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.obterAccessToken().pipe(
    take(1),
    map((token) => (!token ? true : router.createUrlTree(['/inicio']))),
  );
};

const usuarioAutenticadoGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.obterAccessToken().pipe(
    take(1),
    map((token) => (token ? true : router.createUrlTree(['/auth/login']))),
  );
};

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.authRoutes),
    canMatch: [usuarioDesconhecidoGuard],
  },
  {
    path: 'grupo-veiculos',
    loadChildren: () =>
      import('./grupo-veiculos/grupo-veiculo.routes').then((m) => m.grupoVeiculoRoutes),
    canActivate: [usuarioAutenticadoGuard],
    providers: [GrupoVeiculoService],
  },
  {
    path: 'veiculos',
    loadChildren: () => import('./veiculos/veiculo.routes').then((m) => m.veiculoRoutes),
    canActivate: [usuarioAutenticadoGuard],
    providers: [VeiculoService],
  },
  {
    path: 'planos-cobranca',
    loadChildren: () =>
      import('./planos-cobranca/plano-cobranca.routes').then((m) => m.planoCobrancaRoutes),
    canActivate: [usuarioAutenticadoGuard],
    providers: [PlanoCobrancaService, GrupoVeiculoService],
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/cliente.routes').then((m) => m.clienteRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'condutores',
    loadChildren: () => import('./condutores/condutor.routes').then((m) => m.condutorRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'funcionarios',
    loadChildren: () =>
      import('./funcionarios/funcionario.routes').then((r) => r.funcionarioRoutes),
    canMatch: [usuarioAutenticadoGuard],
  },
  {
    path: 'taxas-servicos',
    loadChildren: () =>
      import('./taxas-servicos/taxa-servico.routes').then((m) => m.taxaServicoRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'alugueis',
    loadChildren: () => import('./alugueis/aluguel.routes').then((m) => m.aluguelRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'configuracoes',
    loadChildren: () =>
      import('./configuracoes/configuracao.routes').then((m) => m.configuracaoRoutes),
    canActivate: [usuarioAutenticadoGuard],
  },
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio').then((c) => c.Inicio),
    canMatch: [usuarioAutenticadoGuard],
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),

    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },

    provideNotifications(),
    provideAuth(),
  ],
};
