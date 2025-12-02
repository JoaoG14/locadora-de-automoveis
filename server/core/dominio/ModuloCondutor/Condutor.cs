using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;

public class Condutor : EntidadeBase<Condutor>
{
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string CPF { get; set; } = string.Empty;
    public string CNH { get; set; } = string.Empty;
    public DateTime ValidadeCNH { get; set; }
    public string Telefone { get; set; } = string.Empty;
    public Guid? ClienteId { get; set; } // Opcional, para vincular a PJ
    public virtual Cliente? Cliente { get; set; }

    public Condutor() { }

    public Condutor(string nome, string email, string cpf, string cnh, DateTime validadeCNH, string telefone, Guid? clienteId = null)
    {
        Nome = nome;
        Email = email;
        CPF = cpf;
        CNH = cnh;
        ValidadeCNH = validadeCNH;
        Telefone = telefone;
        ClienteId = clienteId;
    }

    public override void AtualizarRegistro(Condutor registroEditado)
    {
        Nome = registroEditado.Nome;
        Email = registroEditado.Email;
        CPF = registroEditado.CPF;
        CNH = registroEditado.CNH;
        ValidadeCNH = registroEditado.ValidadeCNH;
        Telefone = registroEditado.Telefone;
        ClienteId = registroEditado.ClienteId;
    }
}
