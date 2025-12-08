using LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloTaxaServico;

public class TaxaServicoConfiguration : IEntityTypeConfiguration<TaxaServico>
{
    public void Configure(EntityTypeBuilder<TaxaServico> builder)
    {
        builder.ToTable("TaxasServicos");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Nome)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(t => t.Preco)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(t => t.PrecoFixo)
            .IsRequired();
    }
}
