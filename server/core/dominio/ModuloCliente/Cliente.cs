using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;

public abstract class Cliente : EntidadeBase<Cliente>
{
    public string Nome { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Endereco { get; set; } = string.Empty;
    public TipoCliente Tipo { get; set; }

    public override void AtualizarRegistro(Cliente registroEditado)
    {
        Nome = registroEditado.Nome;
        Telefone = registroEditado.Telefone;
        Endereco = registroEditado.Endereco;
    }
}

public class PessoaFisica : Cliente
{
    public string CPF { get; set; } = string.Empty;
    public string RG { get; set; } = string.Empty;
    public string CNH { get; set; } = string.Empty;

    public PessoaFisica()
    {
        Tipo = TipoCliente.PessoaFisica;
    }
}

public class PessoaJuridica : Cliente
{
    public string CNPJ { get; set; } = string.Empty;

    public PessoaJuridica()
    {
        Tipo = TipoCliente.PessoaJuridica;
    }
}

public enum TipoCliente
{
    PessoaFisica,
    PessoaJuridica
}
