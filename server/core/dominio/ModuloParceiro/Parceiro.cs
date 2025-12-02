using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloParceiro;

public class Parceiro : EntidadeBase<Parceiro>
{
    public string Nome { get; set; } = string.Empty;

    public Parceiro() { }

    public Parceiro(string nome)
    {
        Nome = nome;
    }

    public override void AtualizarRegistro(Parceiro registroEditado)
    {
        Nome = registroEditado.Nome;
    }
}

public class Cupom : EntidadeBase<Cupom>
{
    public string Codigo { get; set; } = string.Empty;
    public decimal ValorDesconto { get; set; }
    public DateTime DataValidade { get; set; }
    public Guid ParceiroId { get; set; }
    public bool Ativo { get; set; } = true;

    public Cupom() { }

    public Cupom(string codigo, decimal valorDesconto, DateTime dataValidade, Guid parceiroId)
    {
        Codigo = codigo;
        ValorDesconto = valorDesconto;
        DataValidade = dataValidade;
        ParceiroId = parceiroId;
    }

    public override void AtualizarRegistro(Cupom registroEditado)
    {
        Codigo = registroEditado.Codigo;
        ValorDesconto = registroEditado.ValorDesconto;
        DataValidade = registroEditado.DataValidade;
        ParceiroId = registroEditado.ParceiroId;
        Ativo = registroEditado.Ativo;
    }

    public bool EstaValido() => Ativo && DataValidade >= DateTime.UtcNow;
}
