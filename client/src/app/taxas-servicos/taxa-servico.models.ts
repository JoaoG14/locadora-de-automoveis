export interface InserirTaxaServicoRequest {
  nome: string;
  preco: number;
  precoFixo: boolean;
}

export interface EditarTaxaServicoRequest {
  id: string;
  nome: string;
  preco: number;
  precoFixo: boolean;
}

export interface TaxaServicoViewModel {
  id: string;
  nome: string;
  preco: number;
  precoFixo: boolean;
}

export interface ListarTaxaServicoViewModel {
  id: string;
  nome: string;
  preco: number;
  precoFixo: boolean;
}
