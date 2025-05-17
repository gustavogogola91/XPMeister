using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("desafio")]
    public class DesafioController : ControllerBase
    {
        private readonly AppDbContext _database;

        public DesafioController(AppDbContext database)
        {
            _database = database;
        }

       [HttpPost("criar-desafio")]
        public async Task<IActionResult> CriarDesafio([FromBody] DesafioDTO dto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var desafio = new Desafio
                {
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    NivelDificuldade = dto.NivelDificuldade,
                    DataEntrega = dto.DataEntrega,
                    PontuacaoMaxima = dto.PontuacaoMaxima,
                    UsuarioId = dto.UsuarioId
                };

                await _database.tb_desafios.AddAsync(desafio);
                await _database.SaveChangesAsync();

                return CreatedAtAction(nameof(CriarDesafio), new { id = desafio.Id }, desafio);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Erro ao salvar no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-todos-desafios")]
        public async Task<IActionResult> BuscarDesafios()
        {
            try {
                var desafios = await _database.tb_desafios.ToListAsync();
                return Ok(desafios);

            } catch(Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar desafios no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-desafio/{id}")]
        public async Task<IActionResult> BuscarDesafio(int id)
        {
            if (id <= 0 )
            {
                return BadRequest("ID Inválido!");
            }

            try {
                var desafio = await _database.tb_desafios.FirstOrDefaultAsync(d => d.Id == id);
                if (desafio == null)
                {
                    return NotFound($"Desafio com ID {id} não encontrado.");
                }
                return Ok(desafio);

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar desafio no banco", detalhe = ex.Message });
            }
        }

        [HttpPut("alterar-desafio/{id}")]
        public async Task<IActionResult> AlterarDesafio(int id, [FromBody] DesafioDTO dto)
        {
            if (id <= 0)
                return BadRequest("ID inválido.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try {
                var desafioOld = await _database.tb_desafios.FirstOrDefaultAsync(d => d.Id == id);
                if (desafioOld == null)
                    return NotFound($"Desafio com ID {id} não encontrado.");

                var usuarioExiste = await _database.tb_usuario.AnyAsync(u => u.Id == dto.UsuarioId);
                if (!usuarioExiste)
                    return BadRequest("Usuário informado não existe.");

                desafioOld.Titulo           = dto.Titulo;
                desafioOld.Descricao        = dto.Descricao;
                desafioOld.NivelDificuldade = dto.NivelDificuldade;
                desafioOld.DataEntrega      = dto.DataEntrega;
                desafioOld.PontuacaoMaxima  = dto.PontuacaoMaxima;
                desafioOld.UsuarioId        = dto.UsuarioId;

                await _database.SaveChangesAsync();

                return Ok(new {
                    desafioOld.Id,
                    desafioOld.Titulo,
                    desafioOld.Descricao,
                    desafioOld.NivelDificuldade,
                    desafioOld.DataEntrega,
                    desafioOld.PontuacaoMaxima
                });

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao alterar desafio", detalhe = ex.Message });
            }
        }

        [HttpPut("desativar-desafio/{id}")]
        public async Task<IActionResult> DesativarDesafio(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID inválido!");
            }

            try {
                var desafio = await _database.tb_desafios.FirstOrDefaultAsync(d => d.Id == id);
                if (desafio == null)
                {
                    return NotFound($"Desafio com ID {id} não encontrado.");
                }

                desafio.Ativo = false;
                await _database.SaveChangesAsync();

                return Ok("Desafio desativado com sucesso!");

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao desativar desafio", detalhe = ex.Message });
            }
        }
    }
}