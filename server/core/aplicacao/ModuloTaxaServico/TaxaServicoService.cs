using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloTaxaServico;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloTaxaServico;

public class TaxaServicoService
{
    private readonly ITaxaServicoRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public TaxaServicoService(ITaxaServicoRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<TaxaServico>> InserirAsync(InserirTaxaServicoViewModel viewModel)
    {
        var taxa = new TaxaServico(viewModel.Nome, viewModel.Preco, viewModel.PrecoFixo);

        await _repositorio.CadastrarAsync(taxa);
        await _unitOfWork.CommitAsync();

        return Result.Ok(taxa);
    }

    public async Task<Result<TaxaServico>> EditarAsync(EditarTaxaServicoViewModel viewModel)
    {
        var taxaEditada = new TaxaServico(viewModel.Nome, viewModel.Preco, viewModel.PrecoFixo);

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, taxaEditada);

        if (!sucesso)
            return Result.Fail("Taxa/Serviço não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(taxaEditada);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Taxa/Serviço não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<TaxaServicoViewModel>>> SelecionarTodosAsync()
    {
        var taxas = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = taxas.Select(t => new TaxaServicoViewModel(
            t.Id,
            t.Nome,
            t.Preco,
            t.PrecoFixo
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<TaxaServicoViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var taxa = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (taxa is null)
            return Result.Fail("Taxa/Serviço não encontrado");

        return Result.Ok(new TaxaServicoViewModel(
            taxa.Id,
            taxa.Nome,
            taxa.Preco,
            taxa.PrecoFixo
        ));
    }
}
