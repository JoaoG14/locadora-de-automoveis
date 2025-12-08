namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloTaxaServico;

public record InserirTaxaServicoViewModel(
    string Nome,
    decimal Preco,
    bool PrecoFixo
);

public record EditarTaxaServicoViewModel(
    Guid Id,
    string Nome,
    decimal Preco,
    bool PrecoFixo
);

public record TaxaServicoViewModel(
    Guid Id,
    string Nome,
    decimal Preco,
    bool PrecoFixo
);
