using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloCliente;

public class ClienteRepository : RepositorioBaseEmOrm<Cliente>, IClienteRepository
{
    public ClienteRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
