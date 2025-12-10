import { filter, map } from 'rxjs';

import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ListarTaxaServicoViewModel } from '../taxa-servico.models';

@Component({
  selector: 'app-listar-taxas-servicos',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
  ],
  templateUrl: './listar-taxas-servicos.html',
})
export class ListarTaxasServicos {
  protected readonly route = inject(ActivatedRoute);

  protected readonly taxasServicos$ = this.route.data.pipe(
    filter((data) => data['taxasServicos']),
    map((data) => data['taxasServicos'] as ListarTaxaServicoViewModel[]),
  );
}
