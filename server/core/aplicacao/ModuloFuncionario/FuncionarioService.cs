using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloFuncionario;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloFuncionario;

public class FuncionarioService
{
    private readonly IRepositorio<Funcionario> _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public FuncionarioService(IRepositorio<Funcionario> repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Funcionario>> InserirAsync(InserirFuncionarioViewModel viewModel)
    {
        var funcionario = new Funcionario(viewModel.Nome, viewModel.DataAdmissao, viewModel.Salario);

        await _repositorio.CadastrarAsync(funcionario);
        await _unitOfWork.CommitAsync();

        return Result.Ok(funcionario);
    }

    public async Task<Result<Funcionario>> EditarAsync(EditarFuncionarioViewModel viewModel)
    {
        var funcionarioEditado = new Funcionario(viewModel.Nome, viewModel.DataAdmissao, viewModel.Salario);

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, funcionarioEditado);

        if (!sucesso)
            return Result.Fail("Funcionário não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok(funcionarioEditado);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Funcionário não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<FuncionarioViewModel>>> SelecionarTodosAsync()
    {
        var funcionarios = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = funcionarios.Select(f => new FuncionarioViewModel(f.Id, f.Nome, f.DataAdmissao, f.Salario)).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<FuncionarioViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var funcionario = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (funcionario is null)
            return Result.Fail("Funcionário não encontrado");

        return Result.Ok(new FuncionarioViewModel(funcionario.Id, funcionario.Nome, funcionario.DataAdmissao, funcionario.Salario));
    }
}
