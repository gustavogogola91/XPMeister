using AutoMapper;
using Backend.Data;
using Backend.Model;
using Backend.Model.DTO.Forum;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controller
{
    [ApiController]
    [Route("postagem")]
    public class PostagemController : ControllerBase
    {
        private readonly AppDbContext _database;
        private readonly IMapper _mapper;

        public PostagemController(AppDbContext database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostagemDTO>>> GetAllPostagens()
        {
            try
            {
                var postagens = await _database.tb_postagem.Include(p => p.Comentarios).ThenInclude(c => c.Autor).Include(p => p.Autor).ToListAsync();

                if (postagens == null || !postagens.Any())
                {
                    return NotFound("Não existem postagens cadastradas");
                }

                var postagensDTO = _mapper.Map<List<PostagemDTO>>(postagens);

                return Ok(postagensDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostagemDTO>> GetPostagemById(int id)
        {
            try
            {
                var postagem = await _database.tb_postagem.Include(p => p.Comentarios).ThenInclude(c => c.Autor).Include(p => p.Autor).FirstOrDefaultAsync(p => p.Id == id);

                if (postagem == null)
                {
                    return NotFound($"Não existe postagem com id {id}");
                }

                var postagemDTO = _mapper.Map<PostagemDTO>(postagem);

                return Ok(postagemDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost]
        public async Task<ActionResult<PostagemDTO>> NewPostagem([FromBody] PostagemPostDTO postDTO)
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

                var postagem = _mapper.Map<Postagem>(postDTO);

                postagem.DataCriacao = DateTime.UtcNow;
                _database.tb_postagem.Add(postagem);
                await _database.SaveChangesAsync();

                var postagemDTO = _mapper.Map<PostagemDTO>(postagem);

                return Created("Postagem criada", postagemDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PostagemDTO>> AlterarPostagem([FromBody] PostagemPutDTO postagemAlterada, int id)
        {
            try
            {
                var postagem = await _database.tb_postagem.FirstOrDefaultAsync(p => p.Id == id);

                if (postagem == null)
                {
                    return NotFound($"Não foi encontrada a postagem id {id}");
                }

                if (postagemAlterada.Titulo != null)
                {
                    postagem.Titulo = postagemAlterada.Titulo;
                }
                if (postagemAlterada.Conteudo != null)
                {
                    postagem.Conteudo = postagemAlterada.Conteudo;
                }

                _database.tb_postagem.Update(postagem);
                await _database.SaveChangesAsync();

                var postagemDTO = _mapper.Map<PostagemDTO>(postagem);

                return Ok(postagemDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostagem(int id)
        {
            try
            {
                var postagem = await _database.tb_postagem.FirstOrDefaultAsync(p => p.Id == id);

                if (postagem == null)
                {
                    return NotFound($"Não foi possivel encontrar o post id {id}");
                }

                _database.tb_postagem.Remove(postagem);
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