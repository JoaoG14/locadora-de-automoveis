using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloParceiro;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloParceiro;

public class ParceiroService
{
    private readonly IParceiroRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public ParceiroService(IParceiroRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Parceiro>> InserirAsync(InserirParceiroViewModel viewModel)
    {
        var parceiro = new Parceiro(viewModel.Nome);

        await _repositorio.CadastrarAsync(parceiro);
        await _unitOfWork.CommitAsync();

        return Result.Ok(parceiro);
    }

    public async Task<Result<Parceiro>> EditarAsync(EditarParceiroViewModel viewModel)
    {
        var parceiroEditado = new Parceiro(viewModel.Nome);

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, parceiroEditado);

        if (!sucesso)
            return Result.Fail("Parceiro não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(parceiroEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Parceiro não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<ParceiroViewModel>>> SelecionarTodosAsync()
    {
        var parceiros = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = parceiros.Select(p => new ParceiroViewModel(
            p.Id,
            p.Nome
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<ParceiroViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var parceiro = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (parceiro is null)
            return Result.Fail("Parceiro não encontrado");

        return Result.Ok(new ParceiroViewModel(
            parceiro.Id,
            parceiro.Nome
        ));
    }
}
