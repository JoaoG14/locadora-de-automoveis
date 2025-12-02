namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloAutenticacao;

public record RegistrarUsuarioViewModel(
    string Nome,
    string Email,
    string Senha
);

public record AutenticarUsuarioViewModel(
    string Email,
    string Senha
);

public record TokenViewModel(
    string Chave,
    DateTime DataExpiracao,
    UsuarioTokenViewModel Usuario
);

public record UsuarioTokenViewModel(
    Guid Id,
    string Nome,
    string Email
);
