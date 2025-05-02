using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using Backend.Model.DTOs;
using Backend.Services;
using AutoMapper;

namespace Backend.Controller
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IConfiguration _config;
        private readonly IEncryptService _hasher;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;

        public UsuarioController(AppDbContext appDbContext, IConfiguration config, IEncryptService hasher, IMapper mapper, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _config = config;
            _hasher = hasher;
            _mapper = mapper;
            _jwtService = jwtService;
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
                usuario.Senha = _hasher.HashUserPassword(usuario.Senha!);
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

                if (usuario != null && _hasher.CheckPassword(model.Senha!, usuario.Senha!))
                {
                    var usuarioJwtDTO = _mapper.Map<UsuarioJwtDTO>(usuario);

                    var token = _jwtService.GenerateToken(usuarioJwtDTO);

                    return Ok(new { token = token });
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
        public async Task<ActionResult<Usuario>> GetUsuariosId(int id)
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
        public async Task<IActionResult> UpdateUsuario(int id, [FromBody] UsuarioPutDTO usuario)
        {
            try
            {
                var usuarioExistente = await _appDbContext.tb_usuario.FindAsync(id);

                if (usuarioExistente != null)
                {
                    if (_hasher.CheckPassword(usuario.SenhaAtual!, usuarioExistente.Senha!))
                    {
                        if (usuarioExistente == null)
                        {
                            return NotFound("Usuario não encontrado");
                        }
                        if (usuario.Nome != null)
                        {
                            usuarioExistente.Nome = usuario.Nome;
                        }
                        if (usuario.Email != null)
                        {
                            usuarioExistente.Email = usuario.Email;
                        }
                        if (usuario.Senha != null)
                        {
                            usuarioExistente.Senha = _hasher.HashUserPassword(usuario.Senha);
                        }

                        _appDbContext.tb_usuario.Update(usuarioExistente);
                        await _appDbContext.SaveChangesAsync();
                        return Ok("Informações atualizadas!");
                    }
                    return Unauthorized();
                }
                return NotFound("Usuario não encontrado");
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