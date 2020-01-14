using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace booker_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly ApplicationContext context;

        public AuthController(IConfiguration configuration, ApplicationContext context)
        {
            this.configuration = configuration;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (model == null)
                return BadRequest("Ошибка данных");

            var user = await context.Users.Where(v => v.UserName == model.UserName && v.Password == model.Password).FirstOrDefaultAsync();

            if (user != null)
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetSection("Authentication").GetSection("SecurityKey").Value));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim>
                { 
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                };

                var tokeOptions = new JwtSecurityToken(
                issuer: configuration.GetSection("Authentication").GetSection("Issuer").Value,
                audience: configuration.GetSection("Authentication").GetSection("Audience").Value,
                claims: claims,
                expires: DateTime.Now.AddYears(1),
                signingCredentials: signinCredentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return Ok(tokenString);

            }
            else
                return Unauthorized("Пользователь не найден");
        }
    }

    public class LoginModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }

    }
}