using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controller
{
    [ApiController]
    [Route("[controller]")]

    public class AulaController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        public AulaController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<ActionResult> AddAula([FromBody] Aula aula)
        {
            if (aula == null)
            {
                return BadRequest("Aula inválida!");
            }

            _appDbContext.tb_aula.Add(aula);
            await _appDbContext.SaveChangesAsync();
            return Created("Aula adicionada com sucesso", aula);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulas()
        {
            try{
                var aulas = await _appDbContext.tb_aula.ToListAsync();
                if (aulas == null || !aulas.Any())
                {
                    return NotFound("Sem aulas cadastradas!");
                }
                return Ok(aulas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Aula>> GetAulaId(int id)
        {
            try
            {
                var aula = await _appDbContext.tb_aula.FindAsync(id);

                if (aula == null)
                {
                    return NotFound("Aula não encontrada!");
                }

                return Ok(aula);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAula(int id,[FromBody] Aula aula)
        {
            try {
            var aulaExistente = await _appDbContext.tb_aula.FindAsync(id);

            if (aulaExistente == null)
            {
                return NotFound("Aula não encontrada!");
            }

            aulaExistente.Nome = aula.Nome;
            aulaExistente.Descricao = aula.Descricao;
            aulaExistente.LinkVideo = aula.LinkVideo;
            aulaExistente.LinkArquivo = aula.LinkArquivo;
            aulaExistente.NumeroSequencia = aula.NumeroSequencia;
            aulaExistente.IdModulo = aula.IdModulo;

            await _appDbContext.SaveChangesAsync();
            return Ok("Informações da Aula foram atualizadas!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAula(int id)
        {
            try
            {
                var aula = await _appDbContext.tb_aula.FindAsync(id);

                if (aula == null)
                {
                    return NotFound("Aula não encontrada!");
                }

                _appDbContext.tb_aula.Remove(aula);
                await _appDbContext.SaveChangesAsync();
                return Ok("Aula deletada com sucesso!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
            
        }

    }


}