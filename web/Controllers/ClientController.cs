using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using booker_web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace booker_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationContext context;

        public ClientController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> AddClient(Client client)
        {
            try
            {
                var c = new Client(
                    client.Name,
                    client.Type,
                    client.City,
                    client.Address,
                    client.Phone,
                    client.Email,
                    client.Contact
                );
                await context.Clients.AddAsync(c);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> GetClients()
        {
            try
            {
                return Ok(await context.Clients.ToListAsync());
            }
            catch
            {
                return Ok(new List<string>());
            }
        }

        [HttpGet("GetById"), Authorize]
        public async Task<IActionResult> GetClientById(int id)
        {
            try
            {
                var client = await context.Clients.Where(v => v.Id == id).FirstOrDefaultAsync();
                if (client == null)
                    return BadRequest("Клиент не найден");
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> UpdateClient(Client client)
        {
            try
            {
                var c = await context.Clients.Where(v => v.Id == client.Id).FirstOrDefaultAsync();
                if (c == null)
                    return BadRequest("Клиент не найден");
                context.Entry(c).State = EntityState.Detached;
                context.Update(client);
                await context.SaveChangesAsync();

                return Ok("Клиент обновлен");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}