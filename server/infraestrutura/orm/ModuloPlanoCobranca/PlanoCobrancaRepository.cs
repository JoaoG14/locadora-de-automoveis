using LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloPlanoCobranca;

public class PlanoCobrancaRepository : RepositorioBaseEmOrm<PlanoCobranca>, IPlanoCobrancaRepository
{
    public PlanoCobrancaRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
