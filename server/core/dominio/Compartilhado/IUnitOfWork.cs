namespace LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

public interface IUnitOfWork
{
    Task CommitAsync();
    Task RollbackAsync();
}
