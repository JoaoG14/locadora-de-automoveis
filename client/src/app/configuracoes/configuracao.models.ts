export interface InserirConfiguracaoRequest {
  PrecoCombustivel: number;
}

export interface EditarConfiguracaoRequest {
  Id: string;
  PrecoCombustivel: number;
}

export interface ConfiguracaoViewModel {
  id: string;
  precoCombustivel: number;
}

export interface ListarConfiguracaoViewModel {
  id: string;
  precoCombustivel: number;
}

export interface ConfiguracaoCombustiveis {
  gasolina: number;
  gas: number;
  diesel: number;
  alcool: number;
}

