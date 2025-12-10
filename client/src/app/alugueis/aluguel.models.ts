export enum TipoPlano {
  Diario = 0,
  Controlado = 1,
  Livre = 2,
}

export interface InserirAluguelRequest {
  condutorId: string;
  veiculoId: string;
  planoCobrancaId: string;
  tipoPlanoSelecionado: TipoPlano;
  dataSaida: Date;
  dataRetornoPrevista: Date;
  kmInicial: number;
  seguroCliente: boolean;
  seguroTerceiros: boolean;
  valorSeguroPorDia: number;
  taxasServicosIds: string[];
}

export interface EditarAluguelRequest {
  id: string;
  condutorId: string;
  veiculoId: string;
  planoCobrancaId: string;
  tipoPlanoSelecionado: TipoPlano;
  dataSaida: Date;
  dataRetornoPrevista: Date;
  kmInicial: number;
  seguroCliente: boolean;
  seguroTerceiros: boolean;
  valorSeguroPorDia: number;
  taxasServicosIds: string[];
}

export interface AluguelViewModel {
  id: string;
  condutorId: string;
  veiculoId: string;
  planoCobrancaId: string;
  tipoPlanoSelecionado: TipoPlano;
  dataSaida: string;
  dataRetornoPrevista: string;
  dataRetornoEfetiva?: string;
  kmInicial: number;
  kmFinal?: number;
  valorGarantia: number;
  seguroCliente: boolean;
  seguroTerceiros: boolean;
  valorSeguroPorDia: number;
  valorTotal: number;
  concluido: boolean;
  taxasServicosIds: string[];
}

export interface ListarAluguelViewModel {
  id: string;
  condutorId: string;
  condutorNome?: string;
  veiculoId: string;
  veiculoNome?: string;
  planoCobrancaId: string;
  tipoPlanoSelecionado: TipoPlano;
  dataSaida: string;
  dataRetornoPrevista: string;
  valorTotal: number;
  concluido: boolean;
}

export interface DevolucaoAluguelRequest {
  aluguelId: string;
  dataRetornoEfetiva: Date;
  kmFinal: number;
  tanqueCheio: boolean;
}
