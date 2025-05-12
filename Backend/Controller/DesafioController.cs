using AutoMapper;
using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("desafio/")]
    public class DesafioController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public DesafioController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

       [HttpPost("criar-desafio")]
        public async Task<IActionResult> CriarDesafio([FromBody] DesafioPostDTO dto) 
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var desafio = _mapper.Map<Desafio>(dto);

                await _database.tb_desafios.AddAsync(desafio);
                await _database.SaveChangesAsync();

                var desafioDto = _mapper.Map<DesafioDTO>(desafio);

                return Created("Desafio criado com sucesso", desafioDto);
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
                
                if(desafios == null || !desafios.Any()) {
                    return NotFound("Não existem desafios cadastrados");
                }

                var desafiosDto = _mapper.Map<List<DesafioDTO>>(desafios);
                return Ok(desafiosDto);

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

                var desafioDto = _mapper.Map<DesafioDTO>(desafio);
                return Ok(desafioDto);

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao buscar desafio no banco", detalhe = ex.Message });
            }
        }

        [HttpPut("alterar-desafio/{id}")]
        public async Task<IActionResult> AlterarDesafio(int id, [FromBody] DesafioPutDTO dto)
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

                desafioOld.Titulo           = dto.Titulo!;
                desafioOld.Descricao        = dto.Descricao!;
                desafioOld.NivelDificuldade = dto.NivelDificuldade;
                desafioOld.PontuacaoMaxima  = dto.PontuacaoMaxima;
                desafioOld.UsuarioId        = dto.UsuarioId;
                desafioOld.ModuloId         = dto.ModuloId;

                _database.tb_desafios.Update(desafioOld);
                await _database.SaveChangesAsync();

                var desafio = _mapper.Map<DesafioDTO>(desafioOld);

                return Ok(desafio);

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
                _database.tb_desafios.Update(desafio);
                await _database.SaveChangesAsync();

                return Ok("Desafio desativado com sucesso!");

            } catch (Exception ex) {
                return StatusCode(500, new { erro = "Erro ao desativar desafio", detalhe = ex.Message });
            }
        }
    }
}