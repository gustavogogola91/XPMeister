using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("desafio/")]
    public class AvaliacaoController : ControllerBase
    {
        private readonly AppDbContext _database;

        public AvaliacaoController(AppDbContext database)
        {
            _database = database;
        }

       [HttpPost("avaliar")]
        public async Task<IActionResult> Avaliar([FromBody] AvaliacaoDTO dto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var avaliacao = new Avaliacao
                {
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    Nota = dto.Nota,
                    UsuarioId = dto.UsuarioId
                };

                await _database.tb_avaliacao.AddAsync(avaliacao);
                await _database.SaveChangesAsync();

                return CreatedAtAction(nameof(Avaliar), new { id = avaliacao.Id }, avaliacao);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Erro ao salvar no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-todas-avaliacoes")]
        public async Task<IActionResult> BuscarAvaliacoes()
        {
            try {
                var avaliacoes = await _database.tb_avaliacao.ToListAsync();
                return Ok(avaliacoes);

            } catch(Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar avaliações no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-avaliacao/{id}")]
        public async Task<IActionResult> BuscarAvaliacao(int id)
        {
            if (id <= 0 )
            {
                return BadRequest("ID Inválido!");
            }

            try {
                var avaliacao = await _database.tb_avaliacao.FirstOrDefaultAsync(a => a.Id == id);
                if (avaliacao == null)
                {
                    return NotFound($"Avaliação com ID {id} não encontrado.");
                }
                return Ok(avaliacao);

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar avaliação no banco", detalhe = ex.Message });
            }
        }

        [HttpPut("desativar-avaliacao/{id}")]
        public async Task<IActionResult> DesativarAvaliacao(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID inválido!");
            }

            try {
                var avaliacao = await _database.tb_avaliacao.FirstOrDefaultAsync(a => a.Id == id);
                if (avaliacao == null)
                {
                    return NotFound($"Avaliação com ID {id} não encontrado.");
                }

                avaliacao.Ativo = false;
                await _database.SaveChangesAsync();

                return Ok("Avaliação desativada com sucesso!");

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao desativar avaliação", detalhe = ex.Message });
            }
        }
    }
}