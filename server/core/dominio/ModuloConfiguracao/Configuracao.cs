using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;

public class Configuracao : EntidadeBase<Configuracao>
{
    public decimal PrecoCombustivel { get; set; }

    public Configuracao() { }

    public Configuracao(decimal precoCombustivel)
    {
        PrecoCombustivel = precoCombustivel;
    }

    public override void AtualizarRegistro(Configuracao registroEditado)
    {
        PrecoCombustivel = registroEditado.PrecoCombustivel;
    }
}
