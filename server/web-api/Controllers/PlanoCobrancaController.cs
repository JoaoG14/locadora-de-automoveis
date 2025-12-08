using LocadoraDeAutomoveis.Core.Aplicacao.ModuloPlanoCobranca;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeAutomoveis.WebApi.Controllers;

[Route("api/planos-cobranca")]
[ApiController]
[Authorize]
public class PlanoCobrancaController : ControllerBase
{
    private readonly PlanoCobrancaService _service;

    public PlanoCobrancaController(PlanoCobrancaService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Inserir(InserirPlanoCobrancaViewModel viewModel)
    {
        var resultado = await _service.InserirAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(Guid id, EditarPlanoCobrancaViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do plano não confere");

        var resultado = await _service.EditarAsync(viewModel);

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
