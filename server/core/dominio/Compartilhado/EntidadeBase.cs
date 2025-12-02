namespace LocadoraDeAutomoveis.Core.Dominio.Compartilhado;

public abstract class EntidadeBase<T>
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CriadoEmUtc { get; set; } = DateTime.UtcNow;
    public bool Excluido { get; set; }
    public DateTime? ExcluidoEmUtc { get; set; }

    public abstract void AtualizarRegistro(T registroEditado);

    public void Excluir()
    {
        Excluido = true;
        ExcluidoEmUtc = DateTime.UtcNow;
    }
}
