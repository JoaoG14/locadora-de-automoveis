using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.Configuracoes;

public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
{
    public void Configure(EntityTypeBuilder<Cliente> builder)
    {
        builder.ToTable("Clientes");
        
        builder.HasKey(c => c.Id);
        
        builder.Property(c => c.Nome)
            .IsRequired()
            .HasMaxLength(200);
            
        builder.Property(c => c.Telefone)
            .IsRequired()
            .HasMaxLength(20);
            
        builder.Property(c => c.Endereco)
            .IsRequired()
            .HasMaxLength(500);
            
        builder.Property(c => c.Tipo)
            .IsRequired();
        
        // Table-Per-Hierarchy (TPH) inheritance configuration
        builder.HasDiscriminator<TipoCliente>(c => c.Tipo)
            .HasValue<PessoaFisica>(TipoCliente.PessoaFisica)
            .HasValue<PessoaJuridica>(TipoCliente.PessoaJuridica);
    }
}

public class PessoaFisicaConfiguration : IEntityTypeConfiguration<PessoaFisica>
{
    public void Configure(EntityTypeBuilder<PessoaFisica> builder)
    {
        builder.Property(p => p.CPF)
            .HasMaxLength(14);
            
        builder.Property(p => p.RG)
            .HasMaxLength(20);
            
        builder.Property(p => p.CNH)
            .HasMaxLength(20);
    }
}

public class PessoaJuridicaConfiguration : IEntityTypeConfiguration<PessoaJuridica>
{
    public void Configure(EntityTypeBuilder<PessoaJuridica> builder)
    {
        builder.Property(p => p.CNPJ)
            .HasMaxLength(18);
    }
}
