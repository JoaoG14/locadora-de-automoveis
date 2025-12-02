using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloGrupoVeiculo;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloGrupoVeiculo;

public class GrupoVeiculoService
{
    private readonly IRepositorio<GrupoVeiculo> _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public GrupoVeiculoService(IRepositorio<GrupoVeiculo> repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<GrupoVeiculo>> InserirAsync(InserirGrupoVeiculoViewModel viewModel)
    {
        var grupo = new GrupoVeiculo(viewModel.Nome);

        await _repositorio.CadastrarAsync(grupo);
        await _unitOfWork.CommitAsync();

        return Result.Ok(grupo);
    }

    public async Task<Result<GrupoVeiculo>> EditarAsync(EditarGrupoVeiculoViewModel viewModel)
    {
        var grupoEditado = new GrupoVeiculo(viewModel.Nome);

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, grupoEditado);

        if (!sucesso)
            return Result.Fail("Grupo de veículos não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(grupoEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Grupo de veículos não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<GrupoVeiculoViewModel>>> SelecionarTodosAsync()
    {
        var grupos = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = grupos.Select(g => new GrupoVeiculoViewModel(g.Id, g.Nome)).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<GrupoVeiculoViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var grupo = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (grupo is null)
            return Result.Fail("Grupo de veículos não encontrado");

        return Result.Ok(new GrupoVeiculoViewModel(grupo.Id, grupo.Nome));
    }
}
