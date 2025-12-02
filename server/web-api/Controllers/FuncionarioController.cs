using LocadoraDeAutomoveis.Core.Aplicacao.ModuloFuncionario;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeAutomoveis.WebApi.Controllers;

[Route("api/funcionarios")]
[ApiController]
[Authorize]
public class FuncionarioController : ControllerBase
{
    private readonly FuncionarioService _service;

    public FuncionarioController(FuncionarioService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Inserir(InserirFuncionarioViewModel viewModel)
    {
        var resultado = await _service.InserirAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(Guid id, EditarFuncionarioViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do funcionário não confere");

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
