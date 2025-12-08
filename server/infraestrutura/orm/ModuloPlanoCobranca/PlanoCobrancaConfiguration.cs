using LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloPlanoCobranca;

public class PlanoCobrancaConfiguration : IEntityTypeConfiguration<PlanoCobranca>
{
    public void Configure(EntityTypeBuilder<PlanoCobranca> builder)
    {
        builder.ToTable("PlanosCobranca");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.PrecoDiarioPlanoDiario)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.PrecoPorKmPlanoDiario)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.PrecoDiarioPlanoControlado)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.LimiteKmPlanoControlado)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.PrecoPorKmExtrapoladoPlanoControlado)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(p => p.PrecoDiarioPlanoLivre)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.HasOne(p => p.GrupoVeiculo)
            .WithMany()
            .HasForeignKey(p => p.GrupoVeiculoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
