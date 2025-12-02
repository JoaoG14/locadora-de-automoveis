using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloAluguel;

public class AluguelConfiguration : IEntityTypeConfiguration<Aluguel>
{
    public void Configure(EntityTypeBuilder<Aluguel> builder)
    {
        builder.ToTable("Alugueis");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.TipoPlanoSelecionado)
            .IsRequired();

        builder.Property(a => a.DataSaida)
            .IsRequired();

        builder.Property(a => a.DataRetornoPrevista)
            .IsRequired();

        builder.Property(a => a.KmInicial)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(a => a.KmFinal)
            .HasColumnType("decimal(18,2)");

        builder.Property(a => a.ValorGarantia)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(a => a.ValorSeguroPorDia)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(a => a.ValorTotal)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(a => a.Concluido)
            .IsRequired();

        builder.Property(a => a.TaxasServicosIds)
            .HasConversion(
                v => string.Join(',', v),
                v => v.Split(',', StringSplitOptions.RemoveEmptyEntries)
                    .Select(Guid.Parse)
                    .ToList()
            );
    }
}
