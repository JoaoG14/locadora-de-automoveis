using LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloVeiculo;

public class VeiculoRepository : RepositorioBaseEmOrm<Veiculo>, IVeiculoRepository
{
    public VeiculoRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
