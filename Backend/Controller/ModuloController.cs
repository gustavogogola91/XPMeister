using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace Backend.Controller
{
    [ApiController]
    [Route("modulo")]
    
    public class ModuloController : ControllerBase
    {
        private readonly AppDbContext _database;

        public ModuloController(AppDbContext database)
        {
            _database = database;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Modulo>>> GetModulos()
        {
            try
            {
                var modulos = await _database.tb_modulo.ToListAsync();

                if (modulos == null || !modulos.Any())
                {
                    return NotFound("Não existem Modulos cadastrados");
                }

                return Ok(modulos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Modulo>> GetModuloById(int id)
        {
            try
            {
                var modulo = await _database.tb_modulo.FirstOrDefaultAsync(m => m.Id == id);

                if (modulo == null)
                {
                    return NotFound($"Nenhum modulo com id {id} foi encontrado");
                }

                return Ok(modulo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateModulo([FromBody] Modulo modulo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var validacao = await _database.tb_modulo.FirstOrDefaultAsync(m => m.Titulo == modulo.Titulo);

                if (validacao != null)
                {
                    return BadRequest("Já existe um módulo com este título cadastrado.");
                }

                _database.tb_modulo.Add(modulo);
                await _database.SaveChangesAsync();

                return Created("Modulo criado com sucesso", modulo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateModulo(int id, [FromBody] Modulo moduloAlterado)
        {
            try
            {
                var modulo = await _database.tb_modulo.FirstOrDefaultAsync(m => m.Id == id);

                if (modulo == null)
                {
                    return NotFound($"Modulo id {id} não encontrado");
                }
                ;

                if (moduloAlterado.Titulo != null)
                {
                    modulo.Titulo = moduloAlterado.Titulo;
                }
                if (moduloAlterado.Dificuldade == 0)
                {
                    modulo.Dificuldade = moduloAlterado.Dificuldade;
                }
                if (moduloAlterado.Descricao != null)
                {
                    modulo.Descricao = moduloAlterado.Descricao;
                }

                _database.tb_modulo.Update(modulo);
                await _database.SaveChangesAsync();

                return Ok("Modulo alterado com sucesso");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModulo(int id)
        {
            try
            {
                var modulo = await _database.tb_modulo.FirstOrDefaultAsync(m => m.Id == id);

                if (modulo == null)
                {
                    return NotFound($"Modulo id {id} não encontrado");
                }

                _database.tb_modulo.Remove(modulo);
                await _database.SaveChangesAsync();
                return Ok("Modulo deletado");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }
}