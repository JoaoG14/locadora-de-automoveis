namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloParceiro;

public record InserirParceiroViewModel(
    string Nome
);

public record EditarParceiroViewModel(
    Guid Id,
    string Nome
);

public record ParceiroViewModel(
    Guid Id,
    string Nome
);
