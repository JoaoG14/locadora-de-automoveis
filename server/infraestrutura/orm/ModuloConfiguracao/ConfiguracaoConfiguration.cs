using LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloConfiguracao;

public class ConfiguracaoConfiguration : IEntityTypeConfiguration<Configuracao>
{
    public void Configure(EntityTypeBuilder<Configuracao> builder)
    {
        builder.ToTable("Configuracoes");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.PrecoCombustivel)
            .HasColumnType("decimal(18,2)")
            .IsRequired();
    }
}
