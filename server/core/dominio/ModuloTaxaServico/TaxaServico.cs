using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;

public class TaxaServico : EntidadeBase<TaxaServico>
{
    public string Nome { get; set; } = string.Empty;
    public decimal Preco { get; set; }
    public bool PrecoFixo { get; set; } // true = fixo, false = por dia

    public TaxaServico() { }

    public TaxaServico(string nome, decimal preco, bool precoFixo)
    {
        Nome = nome;
        Preco = preco;
        PrecoFixo = precoFixo;
    }

    public override void AtualizarRegistro(TaxaServico registroEditado)
    {
        Nome = registroEditado.Nome;
        Preco = registroEditado.Preco;
        PrecoFixo = registroEditado.PrecoFixo;
    }
}
