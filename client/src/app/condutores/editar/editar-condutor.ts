import { format, parse } from 'date-fns';
import { NgxMaskDirective } from 'ngx-mask';
import { filter, map, Observer, shareReplay, switchMap, take, tap } from 'rxjs';

import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ClienteService } from '../../clientes/cliente.service';
import { NotificacaoService } from '../../shared/notificacao/notificacao.service';
import {
  DetalhesCondutorModel,
  EditarCondutorModel,
  EditarCondutorResponseModel,
} from '../condutor.models';
import { CondutorService } from '../condutor.service';

@Component({
  selector: 'app-editar-condutor',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    RouterLink,
    ReactiveFormsModule,
    NgxMaskDirective,
    AsyncPipe,
  ],
  templateUrl: './editar-condutor.html',
})
export class EditarCondutor implements OnInit {
  protected readonly formBuilder = inject(FormBuilder);
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly condutorService = inject(CondutorService);
  protected readonly clienteService = inject(ClienteService);
  protected readonly notificacaoService = inject(NotificacaoService);

  protected clientes$ = this.clienteService.selecionarTodos();
  protected clienteECondutor = false;

  protected condutorForm: FormGroup = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]],
    cnh: ['', [Validators.required]],
    validadeCNH: [format(new Date(), 'dd/MM/yyyy'), [Validators.required]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
    clienteId: [null],
  });

  get nome() {
    return this.condutorForm.get('nome');
  }

  get email() {
    return this.condutorForm.get('email');
  }

  get cpf() {
    return this.condutorForm.get('cpf');
  }

  get cnh() {
    return this.condutorForm.get('cnh');
  }

  get validadeCNH() {
    return this.condutorForm.get('validadeCNH');
  }

  get telefone() {
    return this.condutorForm.get('telefone');
  }

  get clienteId() {
    return this.condutorForm.get('clienteId');
  }

  protected readonly condutor$ = this.route.data.pipe(
    filter((data) => data['condutor']),
    map((data) => data['condutor'] as DetalhesCondutorModel),
    tap((condutor) => {
      this.condutorForm.patchValue({
        ...condutor,
        validadeCNH: format(new Date(condutor.validadeCNH), 'dd/MM/yyyy'),
      });
      this.clienteECondutor = !!condutor.clienteId;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  ngOnInit() {
    this.condutorForm.get('clienteId')?.valueChanges.subscribe((value) => {
      this.clienteECondutor = !!value;
    });
  }

  public editar() {
    if (this.condutorForm.invalid) return;

    const condutorModel: EditarCondutorModel = {
      ...this.condutorForm.value,
      validadeCNH: parse(this.validadeCNH?.value, 'dd/MM/yyyy', new Date()),
      clienteId: this.clienteECondutor ? this.clienteId?.value : undefined,
    };

    const edicaoObserver: Observer<EditarCondutorResponseModel> = {
      next: () =>
        this.notificacaoService.sucesso(
          `O condutor "${condutorModel.nome}" foi editado com sucesso!`,
        ),
      error: (err) => this.notificacaoService.erro(err),
      complete: () => this.router.navigate(['/condutores']),
    };

    this.condutor$
      .pipe(
        take(1),
        switchMap((condutor) => this.condutorService.editar(condutor.id, condutorModel)),
      )
      .subscribe(edicaoObserver);
  }
}
