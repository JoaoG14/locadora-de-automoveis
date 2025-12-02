using LocadoraDeAutomoveis.Core.Aplicacao.ModuloAluguel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeAutomoveis.WebApi.Controllers;

[Route("api/alugueis")]
[ApiController]
[Authorize]
public class AluguelController : ControllerBase
{
    private readonly AluguelService _service;

    public AluguelController(AluguelService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Inserir(InserirAluguelViewModel viewModel)
    {
        var resultado = await _service.InserirAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(Guid id, EditarAluguelViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do aluguel não confere");

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
