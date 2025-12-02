using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloAluguel;

public record InserirAluguelViewModel(
    Guid CondutorId,
    Guid VeiculoId,
    Guid PlanoCobrancaId,
    TipoPlano TipoPlanoSelecionado,
    DateTime DataSaida,
    DateTime DataRetornoPrevista,
    decimal KmInicial,
    bool SeguroCliente,
    bool SeguroTerceiros,
    decimal ValorSeguroPorDia,
    List<Guid> TaxasServicosIds
);

public record EditarAluguelViewModel(
    Guid Id,
    Guid CondutorId,
    Guid VeiculoId,
    Guid PlanoCobrancaId,
    TipoPlano TipoPlanoSelecionado,
    DateTime DataSaida,
    DateTime DataRetornoPrevista,
    decimal KmInicial,
    bool SeguroCliente,
    bool SeguroTerceiros,
    decimal ValorSeguroPorDia,
    List<Guid> TaxasServicosIds
);

public record AluguelViewModel(
    Guid Id,
    Guid CondutorId,
    Guid VeiculoId,
    Guid PlanoCobrancaId,
    TipoPlano TipoPlanoSelecionado,
    DateTime DataSaida,
    DateTime DataRetornoPrevista,
    DateTime? DataRetornoEfetiva,
    decimal KmInicial,
    decimal? KmFinal,
    decimal ValorGarantia,
    bool SeguroCliente,
    bool SeguroTerceiros,
    decimal ValorSeguroPorDia,
    decimal ValorTotal,
    bool Concluido,
    List<Guid> TaxasServicosIds
);
