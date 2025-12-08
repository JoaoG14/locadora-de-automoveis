using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloPlanoCobranca;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloPlanoCobranca;

public class PlanoCobrancaService
{
    private readonly IPlanoCobrancaRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public PlanoCobrancaService(IPlanoCobrancaRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<PlanoCobranca>> InserirAsync(InserirPlanoCobrancaViewModel viewModel)
    {
        var plano = new PlanoCobranca(
            viewModel.GrupoVeiculoId,
            viewModel.PrecoDiarioPlanoDiario,
            viewModel.PrecoPorKmPlanoDiario,
            viewModel.PrecoDiarioPlanoControlado,
            viewModel.LimiteKmPlanoControlado,
            viewModel.PrecoPorKmExtrapoladoPlanoControlado,
            viewModel.PrecoDiarioPlanoLivre
        );

        await _repositorio.CadastrarAsync(plano);
        await _unitOfWork.CommitAsync();

        return Result.Ok(plano);
    }

    public async Task<Result<PlanoCobranca>> EditarAsync(EditarPlanoCobrancaViewModel viewModel)
    {
        var planoEditado = new PlanoCobranca(
            viewModel.GrupoVeiculoId,
            viewModel.PrecoDiarioPlanoDiario,
            viewModel.PrecoPorKmPlanoDiario,
            viewModel.PrecoDiarioPlanoControlado,
            viewModel.LimiteKmPlanoControlado,
            viewModel.PrecoPorKmExtrapoladoPlanoControlado,
            viewModel.PrecoDiarioPlanoLivre
        );

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, planoEditado);

        if (!sucesso)
            return Result.Fail("Plano de cobrança não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(planoEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Plano de cobrança não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<PlanoCobrancaViewModel>>> SelecionarTodosAsync()
    {
        var planos = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = planos.Select(p => new PlanoCobrancaViewModel(
            p.Id,
            p.GrupoVeiculoId,
            p.PrecoDiarioPlanoDiario,
            p.PrecoPorKmPlanoDiario,
            p.PrecoDiarioPlanoControlado,
            p.LimiteKmPlanoControlado,
            p.PrecoPorKmExtrapoladoPlanoControlado,
            p.PrecoDiarioPlanoLivre
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<PlanoCobrancaViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var plano = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (plano is null)
            return Result.Fail("Plano de cobrança não encontrado");

        return Result.Ok(new PlanoCobrancaViewModel(
            plano.Id,
            plano.GrupoVeiculoId,
            plano.PrecoDiarioPlanoDiario,
            plano.PrecoPorKmPlanoDiario,
            plano.PrecoDiarioPlanoControlado,
            plano.LimiteKmPlanoControlado,
            plano.PrecoPorKmExtrapoladoPlanoControlado,
            plano.PrecoDiarioPlanoLivre
        ));
    }
}
