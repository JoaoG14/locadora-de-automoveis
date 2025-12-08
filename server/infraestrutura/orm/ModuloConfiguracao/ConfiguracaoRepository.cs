using LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;
using LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.ModuloConfiguracao;

public class ConfiguracaoRepository : RepositorioBaseEmOrm<Configuracao>, IConfiguracaoRepository
{
    public ConfiguracaoRepository(LocadoraDbContext contexto) : base(contexto)
    {
    }
}
