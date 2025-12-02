namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloCondutor;

public record InserirCondutorViewModel(
    string Nome,
    string Email,
    string CPF,
    string CNH,
    DateTime ValidadeCNH,
    string Telefone,
    Guid? ClienteId
);

public record EditarCondutorViewModel(
    Guid Id,
    string Nome,
    string Email,
    string CPF,
    string CNH,
    DateTime ValidadeCNH,
    string Telefone,
    Guid? ClienteId
);

public record CondutorViewModel(
    Guid Id,
    string Nome,
    string Email,
    string CPF,
    string CNH,
    DateTime ValidadeCNH,
    string Telefone,
    Guid? ClienteId
);
