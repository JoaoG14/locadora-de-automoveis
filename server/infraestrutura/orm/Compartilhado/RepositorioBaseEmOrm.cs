using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using Microsoft.EntityFrameworkCore;

namespace LocadoraDeAutomoveis.Infraestrutura.Orm.Compartilhado;

public class RepositorioBaseEmOrm<T> : IRepositorio<T> where T : EntidadeBase<T>
{
    protected readonly DbSet<T> registros;
    protected readonly LocadoraDbContext contexto;

    public RepositorioBaseEmOrm(LocadoraDbContext contexto)
    {
        this.contexto = contexto;
        registros = contexto.Set<T>();
    }

    public async Task CadastrarAsync(T novoRegistro)
    {
        await registros.AddAsync(novoRegistro);
    }

    public async Task<bool> EditarAsync(Guid idRegistro, T registroEditado)
    {
        var registroSelecionado = await SelecionarRegistroPorIdAsync(idRegistro);

        if (registroSelecionado is null)
            return false;

        registroSelecionado.AtualizarRegistro(registroEditado);
        contexto.Update(registroSelecionado);

        return true;
    }

    public async Task<bool> ExcluirAsync(Guid idRegistro)
    {
        var registroSelecionado = await SelecionarRegistroPorIdAsync(idRegistro);

        if (registroSelecionado is null)
            return false;

        registroSelecionado.Excluir();
        contexto.Update(registroSelecionado); // Soft delete

        return true;
    }

    public virtual async Task<T?> SelecionarRegistroPorIdAsync(Guid idRegistro)
    {
        return await registros.FirstOrDefaultAsync(x => x.Id.Equals(idRegistro));
    }

    public virtual async Task<List<T>> SelecionarRegistrosAsync()
    {
        return await registros.ToListAsync();
    }

    public virtual async Task<List<T>> SelecionarRegistrosAsync(int quantidade)
    {
        return await registros.Take(quantidade).ToListAsync();
    }
}
