using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.data;
using Backend.Models;

namespace Backend.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;

        public UsuarioController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpPost]
        public async Task<ActionResult> AddUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest("Usuário inválido!");
            }

            _appDbContext.Usuarios.Add(usuario);
            await _appDbContext.SaveChangesAsync();
            return Created("Usuario criado com sucesso", usuario);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            var usuarios = await _appDbContext.Usuarios.ToListAsync();
            if (usuarios == null || !usuarios.Any())
            {
                return NotFound("Sem usuários cadastrados pai!");
            }
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarios(int id)
        {
            var usuario = await _appDbContext.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado amigão!");
            }

            return Ok(usuario);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id,[FromBody] Usuario usuario)
        {
            var usuarioExistente = await _appDbContext.Usuarios.FindAsync(id);

            if (usuarioExistente == null)
            {
                return NotFound("Encontramos esse cara aí não!");
            }

            usuarioExistente.Nome = usuario.Nome;
            usuarioExistente.Email = usuario.Email;
            usuarioExistente.Senha = usuario.Senha;

            await _appDbContext.SaveChangesAsync();
            return Ok("Informações do rapaz foram atualizadas(eu acho)!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _appDbContext.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("Esse cara não existe poha!");
            }

            _appDbContext.Usuarios.Remove(usuario);
            await _appDbContext.SaveChangesAsync();
            return Ok("Ele foi deletado, mas não se preocupe, ele não era tão legal assim!");
        }
    }
}