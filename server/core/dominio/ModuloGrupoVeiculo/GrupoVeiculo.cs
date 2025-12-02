using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloGrupoVeiculo;

public class GrupoVeiculo : EntidadeBase<GrupoVeiculo>
{
    public string Nome { get; set; } = string.Empty;

    public GrupoVeiculo() { }

    public GrupoVeiculo(string nome)
    {
        Nome = nome;
    }

    public override void AtualizarRegistro(GrupoVeiculo registroEditado)
    {
        Nome = registroEditado.Nome;
    }
}
