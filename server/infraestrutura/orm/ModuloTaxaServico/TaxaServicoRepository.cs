using LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloTaxaServico;

public class TaxaServicoRepository : RepositorioBaseEmOrm<TaxaServico>, ITaxaServicoRepository
{
    public TaxaServicoRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
