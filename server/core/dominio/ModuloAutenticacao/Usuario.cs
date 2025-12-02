using Microsoft.AspNetCore.Identity;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloAutenticacao;

public class Usuario : IdentityUser<Guid>
{
    public string FullName { get; set; } = string.Empty;
    public Guid AccessTokenVersionId { get; set; } = Guid.Empty;

    public Usuario()
    {
        Id = Guid.NewGuid();
        EmailConfirmed = true;
    }
}

public class Cargo : IdentityRole<Guid>;

public record UsuarioAutenticado(
    Guid Id,
    string NomeCompleto,
    string Email
);
