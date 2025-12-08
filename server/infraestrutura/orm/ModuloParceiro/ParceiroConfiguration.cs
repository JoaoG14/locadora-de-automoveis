using LocadoraDeAutomoveis.Core.Dominio.ModuloParceiro;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloParceiro;

public class ParceiroConfiguration : IEntityTypeConfiguration<Parceiro>
{
    public void Configure(EntityTypeBuilder<Parceiro> builder)
    {
        builder.ToTable("Parceiros");

        builder.HasKey(p => p.Id);

        builder.Property(p => p.Nome)
            .IsRequired()
            .HasMaxLength(200);
    }
}

public class CupomConfiguration : IEntityTypeConfiguration<Cupom>
{
    public void Configure(EntityTypeBuilder<Cupom> builder)
    {
        builder.ToTable("Cupons");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Codigo)
            .IsRequired()
            .HasMaxLength(50);

        builder.Property(c => c.ValorDesconto)
            .HasColumnType("decimal(18,2)")
            .IsRequired();

        builder.Property(c => c.DataValidade)
            .IsRequired();

        builder.Property(c => c.Ativo)
            .IsRequired();

        builder.HasOne<Parceiro>()
            .WithMany()
            .HasForeignKey(c => c.ParceiroId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
