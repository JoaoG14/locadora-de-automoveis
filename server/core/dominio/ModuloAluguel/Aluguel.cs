using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;

public class Aluguel : EntidadeBase<Aluguel>
{
    public Guid CondutorId { get; set; }
    public Guid VeiculoId { get; set; }
    public Guid PlanoCobrancaId { get; set; }
    public TipoPlano TipoPlanoSelecionado { get; set; }
    public DateTime DataSaida { get; set; }
    public DateTime DataRetornoPrevista { get; set; }
    public DateTime? DataRetornoEfetiva { get; set; }
    public decimal KmInicial { get; set; }
    public decimal? KmFinal { get; set; }
    public decimal ValorGarantia { get; set; } = 1000m; // Fixo
    public bool SeguroCliente { get; set; }
    public bool SeguroTerceiros { get; set; }
    public decimal ValorSeguroPorDia { get; set; }
    public decimal ValorTotal { get; set; }
    public bool Concluido { get; set; }
    public List<Guid> TaxasServicosIds { get; set; } = new();

    public Aluguel() { }

    public override void AtualizarRegistro(Aluguel registroEditado)
    {
        CondutorId = registroEditado.CondutorId;
        VeiculoId = registroEditado.VeiculoId;
        PlanoCobrancaId = registroEditado.PlanoCobrancaId;
        TipoPlanoSelecionado = registroEditado.TipoPlanoSelecionado;
        DataSaida = registroEditado.DataSaida;
        DataRetornoPrevista = registroEditado.DataRetornoPrevista;
        DataRetornoEfetiva = registroEditado.DataRetornoEfetiva;
        KmInicial = registroEditado.KmInicial;
        KmFinal = registroEditado.KmFinal;
        ValorGarantia = registroEditado.ValorGarantia;
        SeguroCliente = registroEditado.SeguroCliente;
        SeguroTerceiros = registroEditado.SeguroTerceiros;
        ValorSeguroPorDia = registroEditado.ValorSeguroPorDia;
        ValorTotal = registroEditado.ValorTotal;
        Concluido = registroEditado.Concluido;
        TaxasServicosIds = registroEditado.TaxasServicosIds;
    }
}

public enum TipoPlano
{
    Diario,
    Controlado,
    Livre
}
