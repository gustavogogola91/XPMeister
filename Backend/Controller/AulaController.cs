using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.data;
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
        [HttpGet("{Id}")]
        public async Task<ActionResult<Aula>> GetAulaId(int id)
        {
            try
            {
                var aula = await _appDbContext.tb_aula.FirstOrDefaultAsync(a => a.Id == id);

                if (aula == null)
                {
                    return NotFound("Aula não encontrada");
                }

                return Ok(aula);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

    }


}