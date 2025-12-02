using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloGrupoVeiculo;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;

public class Veiculo : EntidadeBase<Veiculo>
{
    public string Placa { get; set; } = string.Empty;
    public string Marca { get; set; } = string.Empty;
    public string Cor { get; set; } = string.Empty;
    public string Modelo { get; set; } = string.Empty;
    public string TipoCombustivel { get; set; } = string.Empty;
    public int CapacidadeTanque { get; set; }
    public int Ano { get; set; }
    public byte[]? Foto { get; set; }
    public Guid GrupoVeiculoId { get; set; }
    public virtual GrupoVeiculo? GrupoVeiculo { get; set; }

    public Veiculo() { }

    public Veiculo(string placa, string marca, string cor, string modelo, string tipoCombustivel, 
        int capacidadeTanque, int ano, Guid grupoVeiculoId, byte[]? foto = null)
    {
        Placa = placa;
        Marca = marca;
        Cor = cor;
        Modelo = modelo;
        TipoCombustivel = tipoCombustivel;
        CapacidadeTanque = capacidadeTanque;
        Ano = ano;
        GrupoVeiculoId = grupoVeiculoId;
        Foto = foto;
    }

    public override void AtualizarRegistro(Veiculo registroEditado)
    {
        Placa = registroEditado.Placa;
        Marca = registroEditado.Marca;
        Cor = registroEditado.Cor;
        Modelo = registroEditado.Modelo;
        TipoCombustivel = registroEditado.TipoCombustivel;
        CapacidadeTanque = registroEditado.CapacidadeTanque;
        Ano = registroEditado.Ano;
        GrupoVeiculoId = registroEditado.GrupoVeiculoId;
        if (registroEditado.Foto != null)
            Foto = registroEditado.Foto;
    }
}
