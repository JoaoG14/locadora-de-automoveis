using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCondutor;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloCondutor;

public class CondutorService
{
    private readonly ICondutorRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public CondutorService(ICondutorRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Condutor>> InserirAsync(InserirCondutorViewModel viewModel)
    {
        var condutor = new Condutor(
            viewModel.Nome,
            viewModel.Email,
            viewModel.CPF,
            viewModel.CNH,
            viewModel.ValidadeCNH,
            viewModel.Telefone,
            viewModel.ClienteId
        );

        await _repositorio.CadastrarAsync(condutor);
        await _unitOfWork.CommitAsync();

        return Result.Ok(condutor);
    }

    public async Task<Result<Condutor>> EditarAsync(EditarCondutorViewModel viewModel)
    {
        var condutorEditado = new Condutor(
            viewModel.Nome,
            viewModel.Email,
            viewModel.CPF,
            viewModel.CNH,
            viewModel.ValidadeCNH,
            viewModel.Telefone,
            viewModel.ClienteId
        );

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, condutorEditado);

        if (!sucesso)
            return Result.Fail("Condutor não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(condutorEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Condutor não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<CondutorViewModel>>> SelecionarTodosAsync()
    {
        var condutores = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = condutores.Select(c => new CondutorViewModel(
            c.Id,
            c.Nome,
            c.Email,
            c.CPF,
            c.CNH,
            c.ValidadeCNH,
            c.Telefone,
            c.ClienteId
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<CondutorViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var condutor = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (condutor is null)
            return Result.Fail("Condutor não encontrado");

        return Result.Ok(new CondutorViewModel(
            condutor.Id,
            condutor.Nome,
            condutor.Email,
            condutor.CPF,
            condutor.CNH,
            condutor.ValidadeCNH,
            condutor.Telefone,
            condutor.ClienteId
        ));
    }
}
