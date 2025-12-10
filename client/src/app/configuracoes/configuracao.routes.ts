import { Routes } from '@angular/router';

import { ConfigurarConfiguracao } from './configurar/configurar-configuracao';
import { ConfiguracaoService } from './configuracao.service';

export const configuracaoRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ConfigurarConfiguracao,
      },
    ],
    providers: [ConfiguracaoService],
  },
];

