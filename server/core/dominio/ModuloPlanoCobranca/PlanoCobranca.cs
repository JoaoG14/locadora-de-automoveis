using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

namespace LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;

public class PlanoCobranca : EntidadeBase<PlanoCobranca>
{
    public Guid GrupoVeiculoId { get; set; }
    
    // Plano Diário
    public decimal PrecoDiarioPlanoDiario { get; set; }
    public decimal PrecoPorKmPlanoDiario { get; set; }
    
    // Plano Controlado
    public decimal PrecoDiarioPlanoControlado { get; set; }
    public decimal LimiteKmPlanoControlado { get; set; }
    public decimal PrecoPorKmExtrapoladoPlanoControlado { get; set; }
    
    // Plano Livre
    public decimal PrecoDiarioPlanoLivre { get; set; }

    public PlanoCobranca() { }

    public PlanoCobranca(
        Guid grupoVeiculoId,
        decimal precoDiarioPlanoDiario,
        decimal precoPorKmPlanoDiario,
        decimal precoDiarioPlanoControlado,
        decimal limiteKmPlanoControlado,
        decimal precoPorKmExtrapoladoPlanoControlado,
        decimal precoDiarioPlanoLivre)
    {
        GrupoVeiculoId = grupoVeiculoId;
        PrecoDiarioPlanoDiario = precoDiarioPlanoDiario;
        PrecoPorKmPlanoDiario = precoPorKmPlanoDiario;
        PrecoDiarioPlanoControlado = precoDiarioPlanoControlado;
        LimiteKmPlanoControlado = limiteKmPlanoControlado;
        PrecoPorKmExtrapoladoPlanoControlado = precoPorKmExtrapoladoPlanoControlado;
        PrecoDiarioPlanoLivre = precoDiarioPlanoLivre;
    }

    public override void AtualizarRegistro(PlanoCobranca registroEditado)
    {
        GrupoVeiculoId = registroEditado.GrupoVeiculoId;
        PrecoDiarioPlanoDiario = registroEditado.PrecoDiarioPlanoDiario;
        PrecoPorKmPlanoDiario = registroEditado.PrecoPorKmPlanoDiario;
        PrecoDiarioPlanoControlado = registroEditado.PrecoDiarioPlanoControlado;
        LimiteKmPlanoControlado = registroEditado.LimiteKmPlanoControlado;
        PrecoPorKmExtrapoladoPlanoControlado = registroEditado.PrecoPorKmExtrapoladoPlanoControlado;
        PrecoDiarioPlanoLivre = registroEditado.PrecoDiarioPlanoLivre;
    }
}
