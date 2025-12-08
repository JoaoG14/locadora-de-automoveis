using LocadoraDeAutomoveis.Core.Aplicacao.ModuloAutenticacao;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloFuncionario;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloGrupoVeiculo;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloPlanoCobranca;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloVeiculo;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloCliente;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloCondutor;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloTaxaServico;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloAluguel;
using LocadoraDeAutomoveis.Core.Aplicacao.ModuloConfiguracao;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloAutenticacao;
using LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;
using LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;
using LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;
using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;
using LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloPlanoCobranca;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloVeiculo;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloCliente;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloCondutor;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloTaxaServico;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloAluguel;
using LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloConfiguracao;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddCors(options =>
{
    options.AddPolicy("wasm",
        builder =>
        {
            builder.WithOrigins("http://localhost:4200")
                   .AllowAnyHeader()
                   .AllowAnyMethod()
                   .AllowCredentials();
        });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Locadora de Automoveis API", Version = "v1" });
    
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<LocadoraDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<Usuario, Cargo>()
    .AddEntityFrameworkStores<LocadoraDbContext>()
    .AddDefaultTokenProviders();

var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]!);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"]
    };
});

builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<FuncionarioService>();
builder.Services.AddScoped<GrupoVeiculoService>();
builder.Services.AddScoped<PlanoCobrancaService>();
builder.Services.AddScoped<IPlanoCobrancaRepository, PlanoCobrancaRepository>();
builder.Services.AddScoped<VeiculoService>();
builder.Services.AddScoped<IVeiculoRepository, VeiculoRepository>();
builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<IClienteRepository, ClienteRepository>();
builder.Services.AddScoped<CondutorService>();
builder.Services.AddScoped<ICondutorRepository, CondutorRepository>();
builder.Services.AddScoped<TaxaServicoService>();
builder.Services.AddScoped<ITaxaServicoRepository, TaxaServicoRepository>();
builder.Services.AddScoped<AluguelService>();
builder.Services.AddScoped<IAluguelRepository, AluguelRepository>();
builder.Services.AddScoped<ConfiguracaoService>();
builder.Services.AddScoped<IConfiguracaoRepository, ConfiguracaoRepository>();
builder.Services.AddScoped(typeof(IRepositorio<>), typeof(RepositorioBaseEmOrm<>));
builder.Services.AddScoped<IUnitOfWork>(provider => provider.GetRequiredService<LocadoraDbContext>());

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("wasm");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
