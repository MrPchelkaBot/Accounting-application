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
    public class CostController : ControllerBase
    {
        private readonly ApplicationContext context;

        public CostController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> AddCost(Cost cost)
        {
            try
            {
                var c = new Cost(cost.Name, cost.Price, cost.Type ,cost.Date);
                await context.Costs.AddAsync(c);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("GetBydate"), Authorize]
        public async Task<IActionResult> GetCostByDate(string stamp)
        {
            var date = DateTime.Parse(stamp);
            try
            {
                var cost = await context.Costs.Where(v => v.Date == date).ToListAsync();
                if (cost == null)
                    return Ok(new List<string>());
                return Ok(cost);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


    }
}