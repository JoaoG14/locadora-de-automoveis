using LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloCondutor;

public class CondutorConfiguration : IEntityTypeConfiguration<Condutor>
{
    public void Configure(EntityTypeBuilder<Condutor> builder)
    {
        builder.ToTable("Condutores");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Nome)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Email)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.CPF)
            .IsRequired()
            .HasMaxLength(14);

        builder.Property(c => c.CNH)
            .IsRequired()
            .HasMaxLength(20);

        builder.Property(c => c.ValidadeCNH)
            .IsRequired();

        builder.Property(c => c.Telefone)
            .IsRequired()
            .HasMaxLength(20);

        builder.HasOne(c => c.Cliente)
            .WithMany()
            .HasForeignKey(c => c.ClienteId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
