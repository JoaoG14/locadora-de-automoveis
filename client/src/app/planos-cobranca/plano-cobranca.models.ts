export interface PlanoCobranca {
  id: string;
  grupoVeiculoId: string;
  precoDiarioPlanoDiario: number;
  precoPorKmPlanoDiario: number;
  precoDiarioPlanoControlado: number;
  limiteKmPlanoControlado: number;
  precoPorKmExtrapoladoPlanoControlado: number;
  precoDiarioPlanoLivre: number;
}

export interface InserirPlanoCobrancaViewModel {
  grupoVeiculoId: string;
  precoDiarioPlanoDiario: number;
  precoPorKmPlanoDiario: number;
  precoDiarioPlanoControlado: number;
  limiteKmPlanoControlado: number;
  precoPorKmExtrapoladoPlanoControlado: number;
  precoDiarioPlanoLivre: number;
}

export interface EditarPlanoCobrancaViewModel {
  id: string;
  grupoVeiculoId: string;
  precoDiarioPlanoDiario: number;
  precoPorKmPlanoDiario: number;
  precoDiarioPlanoControlado: number;
  limiteKmPlanoControlado: number;
  precoPorKmExtrapoladoPlanoControlado: number;
  precoDiarioPlanoLivre: number;
}

export interface ListarPlanoCobrancaViewModel {
  id: string;
  grupoVeiculoId: string;
  precoDiarioPlanoDiario: number;
  precoPorKmPlanoDiario: number;
  precoDiarioPlanoControlado: number;
  limiteKmPlanoControlado: number;
  precoPorKmExtrapoladoPlanoControlado: number;
  precoDiarioPlanoLivre: number;
}
