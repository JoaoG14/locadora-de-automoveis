using LocadoraDeAutomoveis.Core.Aplicacao.ModuloGrupoVeiculo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LocadoraDeAutomoveis.WebApi.Controllers;

[Route("api/grupos-veiculos")]
[ApiController]
[Authorize]
public class GrupoVeiculoController : ControllerBase
{
    private readonly GrupoVeiculoService _service;

    public GrupoVeiculoController(GrupoVeiculoService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Inserir(InserirGrupoVeiculoViewModel viewModel)
    {
        var resultado = await _service.InserirAsync(viewModel);

        if (resultado.IsFailed)
            return BadRequest(resultado.Errors.Select(e => e.Message));

        return Ok(resultado.Value);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Editar(Guid id, EditarGrupoVeiculoViewModel viewModel)
    {
        if (id != viewModel.Id)
            return BadRequest("ID do grupo não confere");

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
