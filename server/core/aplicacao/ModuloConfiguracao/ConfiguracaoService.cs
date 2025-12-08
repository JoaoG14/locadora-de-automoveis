using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloConfiguracao;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloConfiguracao;

public class ConfiguracaoService
{
    private readonly IConfiguracaoRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public ConfiguracaoService(IConfiguracaoRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Configuracao>> InserirAsync(InserirConfiguracaoViewModel viewModel)
    {
        var config = new Configuracao(viewModel.PrecoCombustivel);

        await _repositorio.CadastrarAsync(config);
        await _unitOfWork.CommitAsync();

        return Result.Ok(config);
    }

    public async Task<Result<Configuracao>> EditarAsync(EditarConfiguracaoViewModel viewModel)
    {
        var configEditada = new Configuracao(viewModel.PrecoCombustivel);

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, configEditada);

        if (!sucesso)
            return Result.Fail("Configuração não encontrada");

        await _unitOfWork.CommitAsync();

        return Result.Ok(configEditada);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Configuração não encontrada");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<ConfiguracaoViewModel>>> SelecionarTodosAsync()
    {
        var configs = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = configs.Select(c => new ConfiguracaoViewModel(
            c.Id,
            c.PrecoCombustivel
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<ConfiguracaoViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var config = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (config is null)
            return Result.Fail("Configuração não encontrada");

        return Result.Ok(new ConfiguracaoViewModel(
            config.Id,
            config.PrecoCombustivel
        ));
    }
}
