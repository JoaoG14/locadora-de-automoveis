using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloVeiculo;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloVeiculo;

public class VeiculoService
{
    private readonly IVeiculoRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public VeiculoService(IVeiculoRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Veiculo>> InserirAsync(InserirVeiculoViewModel viewModel)
    {
        var veiculo = new Veiculo(
            viewModel.Placa,
            viewModel.Marca,
            viewModel.Cor,
            viewModel.Modelo,
            viewModel.TipoCombustivel,
            viewModel.CapacidadeTanque,
            viewModel.Ano,
            viewModel.GrupoVeiculoId,
            viewModel.Foto
        );

        await _repositorio.CadastrarAsync(veiculo);
        await _unitOfWork.CommitAsync();

        return Result.Ok(veiculo);
    }

    public async Task<Result<Veiculo>> EditarAsync(EditarVeiculoViewModel viewModel)
    {
        var veiculoEditado = new Veiculo(
            viewModel.Placa,
            viewModel.Marca,
            viewModel.Cor,
            viewModel.Modelo,
            viewModel.TipoCombustivel,
            viewModel.CapacidadeTanque,
            viewModel.Ano,
            viewModel.GrupoVeiculoId,
            viewModel.Foto
        );

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, veiculoEditado);

        if (!sucesso)
            return Result.Fail("Veículo não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(veiculoEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Veículo não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<VeiculoViewModel>>> SelecionarTodosAsync()
    {
        var veiculos = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = veiculos.Select(v => new VeiculoViewModel(
            v.Id,
            v.Placa,
            v.Marca,
            v.Cor,
            v.Modelo,
            v.TipoCombustivel,
            v.CapacidadeTanque,
            v.Ano,
            v.GrupoVeiculoId,
            v.Foto
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<VeiculoViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var veiculo = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (veiculo is null)
            return Result.Fail("Veículo não encontrado");

        return Result.Ok(new VeiculoViewModel(
            veiculo.Id,
            veiculo.Placa,
            veiculo.Marca,
            veiculo.Cor,
            veiculo.Modelo,
            veiculo.TipoCombustivel,
            veiculo.CapacidadeTanque,
            veiculo.Ano,
            veiculo.GrupoVeiculoId,
            veiculo.Foto
        ));
    }
}
