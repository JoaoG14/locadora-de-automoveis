using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloCliente;

public record InserirPessoaFisicaViewModel(
    string Nome,
    string Telefone,
    string Endereco,
    string CPF,
    string RG,
    string CNH
);

public record InserirPessoaJuridicaViewModel(
    string Nome,
    string Telefone,
    string Endereco,
    string CNPJ
);

public record EditarPessoaFisicaViewModel(
    Guid Id,
    string Nome,
    string Telefone,
    string Endereco,
    string CPF,
    string RG,
    string CNH
);

public record EditarPessoaJuridicaViewModel(
    Guid Id,
    string Nome,
    string Telefone,
    string Endereco,
    string CNPJ
);

public record ClienteViewModel(
    Guid Id,
    string Nome,
    string Telefone,
    string Endereco,
    TipoCliente Tipo,
    string? CPF,
    string? RG,
    string? CNH,
    string? CNPJ
);
