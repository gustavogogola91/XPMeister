using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using AutoMapper;


namespace Backend.Controller
{
    [ApiController]
    [Route("aula")]

    public class AulaController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        public AulaController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> AddAula([FromBody] AulaPostDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Aula inválida!");
            }

            var aula = _mapper.Map<Aula>(dto);

            _appDbContext.tb_aula.Add(aula);
            await _appDbContext.SaveChangesAsync();
            var aulaDto = _mapper.Map<AulaCompletaDTO>(aula);
            return Created("Aula adicionada com sucesso", aulaDto);
        }

        [HttpGet("resumida")]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulas()
        {
            try
            {
                var aulas = await _appDbContext.tb_aula.ToListAsync();
                if (aulas == null || !aulas.Any())
                {
                    return NotFound("Sem aulas cadastradas!");
                }

                var aulasDto = _mapper.Map<List<AulaResumidaDTO>>(aulas);

                return Ok(aulasDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet("resumida/{id}")]
        public async Task<ActionResult<Aula>> GetAulaId(int id)
        {
            try
            {
                var aula = await _appDbContext.tb_aula.FindAsync(id);

                if (aula == null)
                {
                    return NotFound("Aula não encontrada!");
                }

                var aulaDto = _mapper.Map<AulaResumidaDTO>(aula);

                return Ok(aulaDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("completa")]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulasComp()
        {
            try
            {
                var aulas = await _appDbContext.tb_aula.Include(a => a.Modulo).ThenInclude(m => m.Desafios).ToListAsync();
                if (aulas == null || !aulas.Any())
                {
                    return NotFound("Sem aulas cadastradas!");
                }

                var aulasDto = _mapper.Map<List<AulaCompletaDTO>>(aulas);

                return Ok(aulasDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }

        }

        [HttpGet("completa/{id}")]
        public async Task<ActionResult<Aula>> GetAulaIdComp(int id)
        {
            try
            {
                var aula = await _appDbContext.tb_aula.Include(a => a.Modulo).FirstOrDefaultAsync(a => a.Id == id);

                if (aula == null)
                {
                    return NotFound("Aula não encontrada!");
                }

                var aulaDto = _mapper.Map<AulaCompletaDTO>(aula);

                return Ok(aulaDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("modulo/{id}")]
        public async Task<ActionResult<IEnumerable<Aula>>> GetAulaByModulo(int id)
        {
            try
            {
                var aulas = await _appDbContext.tb_aula.Where(a => a.ModuloId == id).ToListAsync();

                if (aulas == null || !aulas.Any())
                {
                    return NotFound("Nenhuma aula foi encontrada");
                }

                var aulasDto = _mapper.Map<List<AulaCompletaDTO>>(aulas);

                return Ok(aulasDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAula(int id, [FromBody] AulaPutDTO aula)
        {
            try
            {
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
                aulaExistente.ModuloId = aula.ModuloId;

                _appDbContext.tb_aula.Update(aulaExistente);
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