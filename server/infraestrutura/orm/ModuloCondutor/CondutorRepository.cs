using LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloCondutor;

public class CondutorRepository : RepositorioBaseEmOrm<Condutor>, ICondutorRepository
{
    public CondutorRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
