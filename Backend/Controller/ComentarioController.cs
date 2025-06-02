using AutoMapper;
using Backend.Data;
using Backend.Model;
using Backend.Model.DTO.Forum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("comentario")]
    public class ComentarioController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public ComentarioController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComentarioDTO>>> GetAllPostagens()
        {
            try
            {
                var comentarios = await _database.tb_comentario.ToListAsync();

                if (comentarios == null || !comentarios.Any())
                {
                    return NotFound("Não existem comentarios cadastradas");
                }

                var comentariosDTO = _mapper.Map<List<ComentarioDTO>>(comentarios);

                return Ok(comentariosDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ComentarioDTO>> GetComentarioById(int id)
        {
            try
            {
                var comentario = await _database.tb_comentario.FirstOrDefaultAsync(p => p.Id == id);

                if (comentario == null)
                {
                    return NotFound($"Não existe comentario com id {id}");
                }

                var comentarioDTO = _mapper.Map<ComentarioDTO>(comentario);

                return Ok(comentarioDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ComentarioDTO>> NewPostagem([FromBody] ComentarioPostDTO postDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var usuario = await _database.tb_usuario.FirstOrDefaultAsync(u => u.Id == postDTO.AutorId);

                if (usuario == null)
                {
                    return BadRequest($"Usuario id {postDTO.AutorId} não existe.");
                }

                var postagem = await _database.tb_postagem.FirstOrDefaultAsync(p => p.Id == postDTO.PostagemId);

                if (postagem == null)
                {
                    return BadRequest($"Postagem id {postDTO.PostagemId} não encontrado.");
                }

                var comentario = _mapper.Map<Comentario>(postDTO);

                comentario.DataCriacao = DateTime.UtcNow;
                _database.tb_comentario.Add(comentario);
                await _database.SaveChangesAsync();

                var comentarioDTO = _mapper.Map<ComentarioDTO>(comentario);

                return Created("Comentario criado", comentarioDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ComentarioDTO>> AlterarComentario([FromBody] ComentarioPutDTO comentarioAlterado, int id)
        {
            try
            {
                var comentario = await _database.tb_comentario.FirstOrDefaultAsync(p => p.Id == id);

                if (comentario == null)
                {
                    return NotFound($"Não foi encontrada a comentario id {id}");
                }

                if (comentarioAlterado.Conteudo != null)
                {
                    comentario.Conteudo = comentarioAlterado.Conteudo;
                }

                _database.tb_comentario.Update(comentario);
                await _database.SaveChangesAsync();

                var comentarioDTO = _mapper.Map<ComentarioDTO>(comentario);

                return Ok(comentarioDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComentario(int id)
        {
            try
            {
                var comentario = await _database.tb_comentario.FirstOrDefaultAsync(p => p.Id == id);

                if (comentario == null)
                {
                    return NotFound($"Não foi possivel encontrar o comentario id {id}");
                }

                _database.tb_comentario.Remove(comentario);
                await _database.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}