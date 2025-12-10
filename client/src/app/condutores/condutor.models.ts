export interface CadastrarCondutorModel {
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCNH: Date;
  telefone: string;
  clienteId?: string;
}

export interface CadastrarCondutorResponseModel {
  id: string;
}

export interface EditarCondutorModel {
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCNH: Date;
  telefone: string;
  clienteId?: string;
}

export interface EditarCondutorResponseModel {
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCNH: Date;
  telefone: string;
  clienteId?: string;
}

export interface SelecionarCondutoresResponseModel {
  registros: SelecionarCondutoresModel[];
}

export interface SelecionarCondutoresModel {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCNH: string;
  telefone: string;
  clienteId?: string;
}

export interface DetalhesCondutorModel {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  cnh: string;
  validadeCNH: string;
  telefone: string;
  clienteId?: string;
}
