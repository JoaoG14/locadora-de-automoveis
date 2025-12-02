using LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloVeiculo;

public class VeiculoConfiguration : IEntityTypeConfiguration<Veiculo>
{
    public void Configure(EntityTypeBuilder<Veiculo> builder)
    {
        builder.ToTable("Veiculos");

        builder.HasKey(v => v.Id);

        builder.Property(v => v.Placa)
            .IsRequired()
            .HasMaxLength(7);

        builder.Property(v => v.Marca)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.Cor)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.Modelo)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(v => v.TipoCombustivel)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(v => v.CapacidadeTanque)
            .IsRequired();

        builder.Property(v => v.Ano)
            .IsRequired();

        builder.Property(v => v.Foto)
            .HasColumnType("varbinary(max)");

        builder.HasOne(v => v.GrupoVeiculo)
            .WithMany()
            .HasForeignKey(v => v.GrupoVeiculoId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
