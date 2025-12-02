using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloAluguel;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloAluguel;

public class AluguelService
{
    private readonly IAluguelRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public AluguelService(IAluguelRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Aluguel>> InserirAsync(InserirAluguelViewModel viewModel)
    {
        var aluguel = new Aluguel
        {
            CondutorId = viewModel.CondutorId,
            VeiculoId = viewModel.VeiculoId,
            PlanoCobrancaId = viewModel.PlanoCobrancaId,
            TipoPlanoSelecionado = viewModel.TipoPlanoSelecionado,
            DataSaida = viewModel.DataSaida,
            DataRetornoPrevista = viewModel.DataRetornoPrevista,
            KmInicial = viewModel.KmInicial,
            SeguroCliente = viewModel.SeguroCliente,
            SeguroTerceiros = viewModel.SeguroTerceiros,
            ValorSeguroPorDia = viewModel.ValorSeguroPorDia,
            TaxasServicosIds = viewModel.TaxasServicosIds,
            Concluido = false,
            ValorTotal = 0 // Will be calculated
        };

        await _repositorio.CadastrarAsync(aluguel);
        await _unitOfWork.CommitAsync();

        return Result.Ok(aluguel);
    }

    public async Task<Result<Aluguel>> EditarAsync(EditarAluguelViewModel viewModel)
    {
        var aluguel = await _repositorio.SelecionarRegistroPorIdAsync(viewModel.Id);

        if (aluguel is null)
            return Result.Fail("Aluguel não encontrado");

        aluguel.CondutorId = viewModel.CondutorId;
        aluguel.VeiculoId = viewModel.VeiculoId;
        aluguel.PlanoCobrancaId = viewModel.PlanoCobrancaId;
        aluguel.TipoPlanoSelecionado = viewModel.TipoPlanoSelecionado;
        aluguel.DataSaida = viewModel.DataSaida;
        aluguel.DataRetornoPrevista = viewModel.DataRetornoPrevista;
        aluguel.KmInicial = viewModel.KmInicial;
        aluguel.SeguroCliente = viewModel.SeguroCliente;
        aluguel.SeguroTerceiros = viewModel.SeguroTerceiros;
        aluguel.ValorSeguroPorDia = viewModel.ValorSeguroPorDia;
        aluguel.TaxasServicosIds = viewModel.TaxasServicosIds;

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, aluguel);

        if (!sucesso)
            return Result.Fail("Erro ao editar aluguel");

        await _unitOfWork.CommitAsync();

        return Result.Ok(aluguel);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Aluguel não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<AluguelViewModel>>> SelecionarTodosAsync()
    {
        var alugueis = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = alugueis.Select(a => new AluguelViewModel(
            a.Id,
            a.CondutorId,
            a.VeiculoId,
            a.PlanoCobrancaId,
            a.TipoPlanoSelecionado,
            a.DataSaida,
            a.DataRetornoPrevista,
            a.DataRetornoEfetiva,
            a.KmInicial,
            a.KmFinal,
            a.ValorGarantia,
            a.SeguroCliente,
            a.SeguroTerceiros,
            a.ValorSeguroPorDia,
            a.ValorTotal,
            a.Concluido,
            a.TaxasServicosIds
        )).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<AluguelViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var aluguel = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (aluguel is null)
            return Result.Fail("Aluguel não encontrado");

        return Result.Ok(new AluguelViewModel(
            aluguel.Id,
            aluguel.CondutorId,
            aluguel.VeiculoId,
            aluguel.PlanoCobrancaId,
            aluguel.TipoPlanoSelecionado,
            aluguel.DataSaida,
            aluguel.DataRetornoPrevista,
            aluguel.DataRetornoEfetiva,
            aluguel.KmInicial,
            aluguel.KmFinal,
            aluguel.ValorGarantia,
            aluguel.SeguroCliente,
            aluguel.SeguroTerceiros,
            aluguel.ValorSeguroPorDia,
            aluguel.ValorTotal,
            aluguel.Concluido,
            aluguel.TaxasServicosIds
        ));
    }
}
