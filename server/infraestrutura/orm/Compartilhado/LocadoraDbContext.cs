using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloAutenticacao;
using LocadoraDeAutomoveis.Core.Dominio.ModuloFuncionario;
using LocadoraDeAutomoveis.Core.Dominio.ModuloGrupoVeiculo;
using LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;
using LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;
using LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;
using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;
using LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

public class LocadoraDbContext : IdentityDbContext<Usuario, Cargo, Guid>, IUnitOfWork
{
    public LocadoraDbContext(DbContextOptions<LocadoraDbContext> options) : base(options)
    {
    }

    public DbSet<Funcionario> Funcionarios { get; set; }
    public DbSet<GrupoVeiculo> GruposVeiculos { get; set; }
    public DbSet<PlanoCobranca> PlanosCobranca { get; set; }
    public DbSet<Veiculo> Veiculos { get; set; }
    public DbSet<Cliente> Clientes { get; set; }
    public DbSet<Condutor> Condutores { get; set; }
    public DbSet<TaxaServico> TaxasServicos { get; set; }
    public DbSet<Aluguel> Alugueis { get; set; }
    public DbSet<Configuracao> Configuracoes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Query filters for soft delete
        modelBuilder.Entity<Funcionario>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<GrupoVeiculo>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<PlanoCobranca>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<Veiculo>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<Cliente>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<Condutor>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<TaxaServico>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<Aluguel>().HasQueryFilter(x => !x.Excluido);
        modelBuilder.Entity<Configuracao>().HasQueryFilter(x => !x.Excluido);

        var assembly = typeof(LocadoraDbContext).Assembly;
        modelBuilder.ApplyConfigurationsFromAssembly(assembly);

        base.OnModelCreating(modelBuilder);
    }

    public async Task CommitAsync()
    {
        await SaveChangesAsync();
    }

    public async Task RollbackAsync()
    {
        // Simple rollback implementation
        foreach (var entry in ChangeTracker.Entries())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.State = EntityState.Unchanged;
                    break;
                case EntityState.Modified:
                case EntityState.Deleted:
                    entry.Reload();
                    break;
            }
        }
        await Task.CompletedTask;
    }
}
