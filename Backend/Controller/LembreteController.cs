using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("lembrete")]
    public class LembreteController : ControllerBase
    {
        private readonly AppDbContext _database;

        public LembreteController(AppDbContext database)
        {
            _database = database;
        }

       [HttpPost("criar-lembrete")]
        public async Task<IActionResult> CriarLembrete([FromBody] LembreteDTO dto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var lembrete = new Lembrete
                {
                    Titulo = dto.Titulo,
                    Descricao = dto.Descricao,
                    DataLembrete = dto.DataLembrete,
                    Tipo = dto.Tipo,
                    UsuarioId = dto.UsuarioId
                };

                await _database.tb_lembrete.AddAsync(lembrete);
                await _database.SaveChangesAsync();

                return CreatedAtAction(nameof(BuscarLembrete), new { id = lembrete.Id }, lembrete);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Erro ao salvar no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-lembretes")]
        public async Task<IActionResult> BuscarLembretes()
        {
            try {
                var lembretes = await _database.tb_lembrete.ToListAsync();
                return Ok(lembretes);

            } catch(Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar lembretes no banco", detalhe = ex.Message });
            }
        }

        [HttpGet("buscar-lembrete/{id}")]
        public async Task<IActionResult> BuscarLembrete(int id)
        {
            if (id <= 0 )
            {
                return BadRequest("ID Inválido!");
            }

            try {
                var lembrete = await _database.tb_lembrete.FirstOrDefaultAsync(l => l.Id == id);
                if (lembrete == null)
                {
                    return NotFound($"Lembrete com ID {id} não encontrado.");
                }
                return Ok(lembrete);

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar lembrete no banco", detalhe = ex.Message });
            }
        }

        [HttpPut("alterar-lembrete/{id}")]
        public async Task<IActionResult> AlterarLembrete(int id, [FromBody] LembreteDTO dto)
        {
            if (id <= 0)
                return BadRequest("ID inválido.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try {
                var lembreteOld = await _database.tb_lembrete.FirstOrDefaultAsync(d => d.Id == id);
                if (lembreteOld == null)
                    return NotFound($"Lembrete com ID {id} não encontrado.");

                var usuarioExiste = await _database.tb_usuario.AnyAsync(u => u.Id == dto.UsuarioId);
                if (!usuarioExiste)
                    return BadRequest("Usuário informado não existe.");

                lembreteOld.Titulo           = dto.Titulo;
                lembreteOld.Descricao        = dto.Descricao;
                lembreteOld.DataLembrete     = dto.DataLembrete;
                lembreteOld.Tipo             = dto.Tipo;
                lembreteOld.UsuarioId        = dto.UsuarioId;

                await _database.SaveChangesAsync();

                return Ok(new {
                    lembreteOld.Titulo,   
                    lembreteOld.Descricao,
                    lembreteOld.DataLembrete,
                    lembreteOld.Tipo,     
                    lembreteOld.UsuarioId
                });

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao alterar lembrete", detalhe = ex.Message });
            }
        }

        [HttpPatch("desativar-lembrete/{id}")]
        public async Task<IActionResult> DesativarLembrete(int id)
        {
            if (id <= 0)
            {
                return BadRequest("ID inválido!");
            }

            try {
                var lembrete = await _database.tb_lembrete.FirstOrDefaultAsync(l => l.Id == id);
                if (lembrete == null)
                {
                    return NotFound($"Lembrete com ID {id} não encontrado.");
                }

                lembrete.Ativo = false;
                await _database.SaveChangesAsync();

                return Ok("lembrete desativado com sucesso!");

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao desativar lembrete", detalhe = ex.Message });
            }
        }

        [HttpPatch("realizar-lembrete/{id}")]
        public async Task<IActionResult> RealizarLembrete(int id)
        {
            if (id <= 0)
                return BadRequest("ID inválido!");

            try
            {
                var lembrete = await _database.tb_lembrete.FirstOrDefaultAsync(l => l.Id == id);
                if (lembrete == null)
                    return NotFound($"Lembrete com ID {id} não encontrado.");

                if (!lembrete.Pendente)
                    return BadRequest("Este lembrete já foi realizado.");

                lembrete.Pendente = false;
                await _database.SaveChangesAsync();

                return Ok(new
                {
                    mensagem = "Lembrete marcado como realizado com sucesso.",
                    lembrete
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { erro = "Erro ao realizar lembrete", detalhe = ex.Message });
            }
        }

    }
}