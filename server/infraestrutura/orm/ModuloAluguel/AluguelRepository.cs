using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloAluguel;

public class AluguelRepository : RepositorioBaseEmOrm<Aluguel>, IAluguelRepository
{
    public AluguelRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
