export interface InserirVeiculoViewModel {
  placa: string;
  marca: string;
  cor: string;
  modelo: string;
  tipoCombustivel: string;
  capacidadeTanque: number;
  ano: number;
  grupoVeiculoId: string;
  foto?: string | null;
}

export interface EditarVeiculoViewModel {
  id: string;
  placa: string;
  marca: string;
  cor: string;
  modelo: string;
  tipoCombustivel: string;
  capacidadeTanque: number;
  ano: number;
  grupoVeiculoId: string;
  foto?: string | null;
}

export interface VeiculoViewModel {
  id: string;
  placa: string;
  marca: string;
  cor: string;
  modelo: string;
  tipoCombustivel: string;
  capacidadeTanque: number;
  ano: number;
  grupoVeiculoId: string;
  foto?: string | null;
}

export interface ListarVeiculoViewModel {
  id: string;
  placa: string;
  marca: string;
  cor: string;
  modelo: string;
  tipoCombustivel: string;
  ano: number;
  grupoVeiculoId: string;
}
