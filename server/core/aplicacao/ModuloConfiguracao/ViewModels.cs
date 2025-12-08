namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloConfiguracao;

public record InserirConfiguracaoViewModel(
    decimal PrecoCombustivel
);

public record EditarConfiguracaoViewModel(
    Guid Id,
    decimal PrecoCombustivel
);

public record ConfiguracaoViewModel(
    Guid Id,
    decimal PrecoCombustivel
);
