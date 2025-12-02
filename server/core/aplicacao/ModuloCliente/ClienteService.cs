using FluentResults;
using LocadoraDeAutomoveis.Core.Dominio.Compartilhado;
using LocadoraDeAutomoveis.Core.Dominio.ModuloCliente;

namespace LocadoraDeAutomoveis.Core.Aplicacao.ModuloCliente;

public class ClienteService
{
    private readonly IClienteRepository _repositorio;
    private readonly IUnitOfWork _unitOfWork;

    public ClienteService(IClienteRepository repositorio, IUnitOfWork unitOfWork)
    {
        _repositorio = repositorio;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<PessoaFisica>> InserirPessoaFisicaAsync(InserirPessoaFisicaViewModel viewModel)
    {
        var cliente = new PessoaFisica
        {
            Nome = viewModel.Nome,
            Telefone = viewModel.Telefone,
            Endereco = viewModel.Endereco,
            CPF = viewModel.CPF,
            RG = viewModel.RG,
            CNH = viewModel.CNH
        };

        await _repositorio.CadastrarAsync(cliente);
        await _unitOfWork.CommitAsync();

        return Result.Ok(cliente);
    }

    public async Task<Result<PessoaJuridica>> InserirPessoaJuridicaAsync(InserirPessoaJuridicaViewModel viewModel)
    {
        var cliente = new PessoaJuridica
        {
            Nome = viewModel.Nome,
            Telefone = viewModel.Telefone,
            Endereco = viewModel.Endereco,
            CNPJ = viewModel.CNPJ
        };

        await _repositorio.CadastrarAsync(cliente);
        await _unitOfWork.CommitAsync();

        return Result.Ok(cliente);
    }

    public async Task<Result<PessoaFisica>> EditarPessoaFisicaAsync(EditarPessoaFisicaViewModel viewModel)
    {
        var cliente = await _repositorio.SelecionarRegistroPorIdAsync(viewModel.Id);

        if (cliente is null || cliente is not PessoaFisica pessoaFisica)
            return Result.Fail("Cliente não encontrado ou não é Pessoa Física");

        pessoaFisica.Nome = viewModel.Nome;
        pessoaFisica.Telefone = viewModel.Telefone;
        pessoaFisica.Endereco = viewModel.Endereco;
        pessoaFisica.CPF = viewModel.CPF;
        pessoaFisica.RG = viewModel.RG;
        pessoaFisica.CNH = viewModel.CNH;

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, pessoaFisica);

        if (!sucesso)
            return Result.Fail("Erro ao editar cliente");

        await _unitOfWork.CommitAsync();

        return Result.Ok(pessoaFisica);
    }

    public async Task<Result<PessoaJuridica>> EditarPessoaJuridicaAsync(EditarPessoaJuridicaViewModel viewModel)
    {
        var cliente = await _repositorio.SelecionarRegistroPorIdAsync(viewModel.Id);

        if (cliente is null || cliente is not PessoaJuridica pessoaJuridica)
            return Result.Fail("Cliente não encontrado ou não é Pessoa Jurídica");

        pessoaJuridica.Nome = viewModel.Nome;
        pessoaJuridica.Telefone = viewModel.Telefone;
        pessoaJuridica.Endereco = viewModel.Endereco;
        pessoaJuridica.CNPJ = viewModel.CNPJ;

        var sucesso = await _repositorio.EditarAsync(viewModel.Id, pessoaJuridica);

        if (!sucesso)
            return Result.Fail("Erro ao editar cliente");

        await _unitOfWork.CommitAsync();

        return Result.Ok(pessoaJuridica);
    }

    public async Task<Result> ExcluirAsync(Guid id)
    {
        var sucesso = await _repositorio.ExcluirAsync(id);

        if (!sucesso)
            return Result.Fail("Cliente não encontrado");

        await _unitOfWork.CommitAsync();

        return Result.Ok();
    }

    public async Task<Result<List<ClienteViewModel>>> SelecionarTodosAsync()
    {
        var clientes = await _repositorio.SelecionarRegistrosAsync();

        var viewModels = clientes.Select(c =>
        {
            string? cpf = null;
            string? rg = null;
            string? cnh = null;
            string? cnpj = null;

            if (c is PessoaFisica pf)
            {
                cpf = pf.CPF;
                rg = pf.RG;
                cnh = pf.CNH;
            }
            else if (c is PessoaJuridica pj)
            {
                cnpj = pj.CNPJ;
            }

            return new ClienteViewModel(
                c.Id,
                c.Nome,
                c.Telefone,
                c.Endereco,
                c.Tipo,
                cpf,
                rg,
                cnh,
                cnpj
            );
        }).ToList();

        return Result.Ok(viewModels);
    }

    public async Task<Result<ClienteViewModel>> SelecionarPorIdAsync(Guid id)
    {
        var cliente = await _repositorio.SelecionarRegistroPorIdAsync(id);

        if (cliente is null)
            return Result.Fail("Cliente não encontrado");

        string? cpf = null;
        string? rg = null;
        string? cnh = null;
        string? cnpj = null;

        if (cliente is PessoaFisica pf)
        {
            cpf = pf.CPF;
            rg = pf.RG;
            cnh = pf.CNH;
        }
        else if (cliente is PessoaJuridica pj)
        {
            cnpj = pj.CNPJ;
        }

        return Result.Ok(new ClienteViewModel(
            cliente.Id,
            cliente.Nome,
            cliente.Telefone,
            cliente.Endereco,
            cliente.Tipo,
            cpf,
            rg,
            cnh,
            cnpj
        ));
    }
}
