using LocadoraDeAutomoveis.Core.Dominio.ModuloParceiro;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloParceiro;

public class ParceiroRepository : RepositorioBaseEmOrm<Parceiro>, IParceiroRepository
{
    public ParceiroRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
