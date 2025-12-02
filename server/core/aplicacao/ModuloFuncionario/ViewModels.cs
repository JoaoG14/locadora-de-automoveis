namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloFuncionario;

public record InserirFuncionarioViewModel(
    string Nome,
    DateTime DataAdmissao,
    decimal Salario
);

public record EditarFuncionarioViewModel(
    Guid Id,
    string Nome,
    DateTime DataAdmissao,
    decimal Salario
);

public record FuncionarioViewModel(
    Guid Id,
    string Nome,
    DateTime DataAdmissao,
    decimal Salario
);
