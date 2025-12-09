export enum TipoCliente {
  PessoaFisica = 0,
  PessoaJuridica = 1,
}

export interface ClienteViewModel {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  tipo: TipoCliente;
  cpf?: string;
  rg?: string;
  cnh?: string;
  cnpj?: string;
}

export interface InserirPessoaFisicaViewModel {
  nome: string;
  telefone: string;
  endereco: string;
  cpf: string;
  rg: string;
  cnh: string;
}

export interface InserirPessoaJuridicaViewModel {
  nome: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}

export interface EditarPessoaFisicaViewModel {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  cpf: string;
  rg: string;
  cnh: string;
}

export interface EditarPessoaJuridicaViewModel {
  id: string;
  nome: string;
  telefone: string;
  endereco: string;
  cnpj: string;
}
