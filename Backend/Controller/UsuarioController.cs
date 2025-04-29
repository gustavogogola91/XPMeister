using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.data;
using Backend.Models;
using Backend.Model;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Backend.Controller
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _config;

        public UsuarioController(AppDbContext appDbContext, IConfiguration config)
        {
            _appDbContext = appDbContext;
            _config = config;
        }

        [HttpPost]
        public async Task<IActionResult> AddUsuario([FromBody] Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Usuário inválido!");
            }

            try
            {
                _appDbContext.tb_usuario.Add(usuario);
                await _appDbContext.SaveChangesAsync();
                return Created("Usuario criado com sucesso", usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUsuario([FromBody] LoginDTO model)
        {
            try
            {
                var usuario = await _appDbContext.tb_usuario.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (usuario != null /*TODO: Implementar metodo de verificação de senha, utilizando BCrypt*/)
                {
                    var authClaims = new List<Claim> {
                            new Claim(JwtRegisteredClaimNames.Sub, usuario.Nome!),
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            new Claim(ClaimTypes.Role, usuario.Role.ToString())
                        };

                    var token = new JwtSecurityToken(
                    issuer: _config["Jwt:Issuer"],
                    expires: DateTime.UtcNow.AddMinutes(double.Parse(_config["Jwt:ExpiryMinutes"]!)),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!)), SecurityAlgorithms.HmacSha256)
                );
                    return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            try
            {
                var usuarios = await _appDbContext.tb_usuario.ToListAsync();
                if (usuarios == null || !usuarios.Any())
                {
                    return NotFound("Sem usuários no sistema");
                }
                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuarios(int id)
        {
            try
            {
                var usuario = await _appDbContext.tb_usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("email/{email}")]
        public async Task<ActionResult<Usuario>> GetUsuariosEmail(string email)
        {
            try
            {
                var usuario = await _appDbContext.tb_usuario.FirstOrDefaultAsync(u => u.Email == email);

                if (usuario == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUsuario(int id, [FromBody] Usuario usuario)
        {
            try
            {
                var usuarioExistente = await _appDbContext.tb_usuario.FindAsync(id);

                if (usuarioExistente == null)
                {
                    return NotFound("Usuario não encontrado");
                }

                usuarioExistente.Nome = usuario.Nome;
                usuarioExistente.Email = usuario.Email;
                usuarioExistente.Senha = usuario.Senha;

                await _appDbContext.SaveChangesAsync();
                return Ok("Informações atualizadas!");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            try
            {
                var usuario = await _appDbContext.tb_usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                _appDbContext.tb_usuario.Remove(usuario);
                await _appDbContext.SaveChangesAsync();
                return Ok("Deletado com successo");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }
    }
}