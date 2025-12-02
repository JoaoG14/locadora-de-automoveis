namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloGrupoVeiculo;

public record InserirGrupoVeiculoViewModel(
    string Nome
);

public record EditarGrupoVeiculoViewModel(
    Guid Id,
    string Nome
);

public record GrupoVeiculoViewModel(
    Guid Id,
    string Nome
);
