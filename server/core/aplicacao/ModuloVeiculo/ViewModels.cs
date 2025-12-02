namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloVeiculo;

public record InserirVeiculoViewModel(
    string Placa,
    string Marca,
    string Cor,
    string Modelo,
    string TipoCombustivel,
    int CapacidadeTanque,
    int Ano,
    Guid GrupoVeiculoId,
    byte[]? Foto
);

public record EditarVeiculoViewModel(
    Guid Id,
    string Placa,
    string Marca,
    string Cor,
    string Modelo,
    string TipoCombustivel,
    int CapacidadeTanque,
    int Ano,
    Guid GrupoVeiculoId,
    byte[]? Foto
);

public record VeiculoViewModel(
    Guid Id,
    string Placa,
    string Marca,
    string Cor,
    string Modelo,
    string TipoCombustivel,
    int CapacidadeTanque,
    int Ano,
    Guid GrupoVeiculoId,
    byte[]? Foto
);
