using LocadoraDeAutomoveis.Core.Dominio.ModuloAutenticacao;
using Microsoft.AspNetCore.Identity;
using FluentResults;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloAutenticacao;

public class AuthService
{
    private readonly UserManager<Usuario> _userManager;
    private readonly SignInManager<Usuario> _signInManager;

    private readonly IConfiguration _configuration;

    public AuthService(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
    }

    public async Task<Result<Usuario>> RegistrarAsync(RegistrarUsuarioViewModel viewModel)
    {
        var usuario = new Usuario
        {
            UserName = viewModel.Email,
            Email = viewModel.Email,
            FullName = viewModel.Nome
        };

        var resultado = await _userManager.CreateAsync(usuario, viewModel.Senha);

        if (!resultado.Succeeded)
            return Result.Fail(resultado.Errors.Select(e => e.Description));

        return Result.Ok(usuario);
    }

    public async Task<Result<TokenViewModel>> AutenticarAsync(AutenticarUsuarioViewModel viewModel)
    {
        var resultado = await _signInManager.PasswordSignInAsync(viewModel.Email, viewModel.Senha, false, true);

        if (resultado.IsLockedOut)
            return Result.Fail("Usuário bloqueado");

        if (!resultado.Succeeded)
            return Result.Fail("Login ou senha incorretos");

        var usuario = await _userManager.FindByEmailAsync(viewModel.Email);
        
        var token = GerarToken(usuario!);

        return Result.Ok(token);
    }

    private TokenViewModel GerarToken(Usuario usuario)
    {
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("nome", usuario.FullName)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var expiracao = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"]));

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiracao,
            signingCredentials: creds
        );

        return new TokenViewModel(
            new JwtSecurityTokenHandler().WriteToken(token),
            expiracao,
            new UsuarioTokenViewModel(usuario.Id, usuario.FullName, usuario.Email!)
        );
    }
}
