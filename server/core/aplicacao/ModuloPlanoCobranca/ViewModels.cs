namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloPlanoCobranca;

public record InserirPlanoCobrancaViewModel(
    Guid GrupoVeiculoId,
    decimal PrecoDiarioPlanoDiario,
    decimal PrecoPorKmPlanoDiario,
    decimal PrecoDiarioPlanoControlado,
    decimal LimiteKmPlanoControlado,
    decimal PrecoPorKmExtrapoladoPlanoControlado,
    decimal PrecoDiarioPlanoLivre
);

public record EditarPlanoCobrancaViewModel(
    Guid Id,
    Guid GrupoVeiculoId,
    decimal PrecoDiarioPlanoDiario,
    decimal PrecoPorKmPlanoDiario,
    decimal PrecoDiarioPlanoControlado,
    decimal LimiteKmPlanoControlado,
    decimal PrecoPorKmExtrapoladoPlanoControlado,
    decimal PrecoDiarioPlanoLivre
);

public record PlanoCobrancaViewModel(
    Guid Id,
    Guid GrupoVeiculoId,
    decimal PrecoDiarioPlanoDiario,
    decimal PrecoPorKmPlanoDiario,
    decimal PrecoDiarioPlanoControlado,
    decimal LimiteKmPlanoControlado,
    decimal PrecoPorKmExtrapoladoPlanoControlado,
    decimal PrecoDiarioPlanoLivre
);
