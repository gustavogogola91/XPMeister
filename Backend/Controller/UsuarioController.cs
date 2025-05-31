using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Model;
using Backend.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controller
{
    [ApiController]
    [Route("usuario")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IEncryptService _hasher;
        private readonly IMapper _mapper;
        private readonly IJwtService _jwtService;

        public UsuarioController(AppDbContext appDbContext, IEncryptService hasher, IMapper mapper, IJwtService jwtService)
        {
            _appDbContext = appDbContext;
            _hasher = hasher;
            _mapper = mapper;
            _jwtService = jwtService;
        }

        [HttpPost]
        public async Task<IActionResult> AddUsuario([FromBody] UsuarioPostDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Usuário inválido!");
            }

            try
            {
                var usuario = _mapper.Map<Usuario>(dto);

                usuario.Senha = _hasher.HashUserPassword(usuario.Senha!);
                usuario.Ativo = true;
                _appDbContext.tb_usuario.Add(usuario);
                await _appDbContext.SaveChangesAsync();

                var usuarioDto = _mapper.Map<UsuarioDTO>(usuario);
                return Created("Usuario criado com sucesso", usuarioDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("token")]
        [Authorize]
        public IActionResult CheckTokenValidity()
        {
            return Ok(new { valid = true });
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
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            try
            {
                var usuarios = await _appDbContext.tb_usuario.ToListAsync();
                if (usuarios == null || !usuarios.Any())
                {
                    return NotFound("Sem usuários no sistema");
                }

                var usuariosDto = _mapper.Map<List<UsuarioDTO>>(usuarios);
                return Ok(usuariosDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioDTO>> GetUsuariosId(int id)
        {
            try
            {
                var usuario = await _appDbContext.tb_usuario.FindAsync(id);

                if (usuario == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                var usuarioDto = _mapper.Map<UsuarioDTO>(usuario);
                return Ok(usuarioDto);
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

                var usuarioDto = _mapper.Map<UsuarioDTO>(usuario);
                return Ok(usuarioDto);
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

                    if (usuario.Nome != null)
                    {
                        usuarioExistente.Nome = usuario.Nome;
                    }
                    if (usuario.Email != null)
                    {
                        if (_hasher.CheckPassword(usuario.Senha!, usuarioExistente.Senha!))
                        {
                            usuarioExistente.Email = usuario.Email;
                        }
                        else { return Unauthorized(); }
                    }
                    if (usuario.Senha != null)
                    {
                        if (_hasher.CheckPassword(usuario.Senha!, usuarioExistente.Senha!))
                        {
                            usuarioExistente.Senha = _hasher.HashUserPassword(usuario.Senha);
                        }
                        else { return Unauthorized(); }

                    }
                    if (usuario.estudo != null)
                    {
                        usuarioExistente.Estudo = usuario.estudo;
                    }

                    _appDbContext.tb_usuario.Update(usuarioExistente);
                    await _appDbContext.SaveChangesAsync();
                    return Ok("Informações atualizadas!");
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