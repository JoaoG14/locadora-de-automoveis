using LocadoraDeAutomoveis.Core.Aplicacao.ModuloCliente;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeAutomoveis.WebApi.Controllers;

[Route("api/clientes")]
[ApiController]
[Authorize]
public class ClienteController : ControllerBase
{
    private readonly ClienteService _service;

    public ClienteController(ClienteService service)
    {
        _service = service;
    }

    [HttpPost("pessoa-fisica")]
    public async Task<IActionResult> InserirPessoaFisica(InserirPessoaFisicaViewModel viewModel)
    {
        var resultado = await _service.InserirPessoaFisicaAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPost("pessoa-juridica")]
    public async Task<IActionResult> InserirPessoaJuridica(InserirPessoaJuridicaViewModel viewModel)
    {
        var resultado = await _service.InserirPessoaJuridicaAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("pessoa-fisica/{id}")]
    public async Task<IActionResult> EditarPessoaFisica(Guid id, EditarPessoaFisicaViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do cliente não confere");

        var resultado = await _service.EditarPessoaFisicaAsync(viewModel);

        if (resultado.IsFailed)
            return NotFound(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("pessoa-juridica/{id}")]
    public async Task<IActionResult> EditarPessoaJuridica(Guid id, EditarPessoaJuridicaViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do cliente não confere");

        var resultado = await _service.EditarPessoaJuridicaAsync(viewModel);

        if (resultado.IsFailed)
            return NotFound(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Excluir(Guid id)
    {
        var resultado = await _service.ExcluirAsync(id);

        if (resultado.IsFailed)
            return NotFound(resultado.Errors.Select(e => e.Message));

        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> SelecionarTodos()
    {
        var resultado = await _service.SelecionarTodosAsync();

        return Ok(resultado.Value);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> SelecionarPorId(Guid id)
    {
        var resultado = await _service.SelecionarPorIdAsync(id);

        if (resultado.IsFailed)
            return NotFound(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }
}
