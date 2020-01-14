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
    public class OrderController : ControllerBase
    {
        private readonly ApplicationContext context;

        public OrderController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> AddOrder(Order order)
        {
            try
            {
                var client = await context.Clients.Where(v => v.Id == order.Client.Id).FirstOrDefaultAsync();
                var o = new Order(
                    order.Created,
                    order.GroupItems,
                    client,
                    order.CostPrice,
                    order.CostLogistic,
                    order.Payment,
                    order.Profit,
                    order.Wait,
                    order.WaitDate
                );
                await context.Orders.AddAsync(o);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet, Authorize]
        public async Task<IActionResult> GetOrders()
        {
            try
            {
                return Ok(await context.Orders.Include(v => v.Client).ToListAsync());
            }
            catch
            {
                return Ok(new List<string>());
            }
        }

        [HttpGet("GetById"), Authorize]
        public async Task<IActionResult> GetOrderById(int id)
        {
            try
            {
                var order = await context.Orders.Where(v => v.Id == id).Include(v => v.Client).FirstOrDefaultAsync();
                if (order == null)
                    return BadRequest("Заказ не найден");
                return Ok(order);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet("GetByIdClient"), Authorize]
        public async Task<IActionResult> GetByIdClient(int id)
        {
            try
            {
                var client = await context.Clients.Where(v => v.Id == id).FirstOrDefaultAsync();
                if (client == null)
                    return BadRequest("Клиент не найден");

                var orders = await context.Orders.Where(v => v.Client == client).Include(v => v.Client).ToListAsync();
                if (orders == null)
                    return Ok(new List<object>());
                return Ok(orders);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }


        [HttpGet("GetByDate"), Authorize]
        public async Task<IActionResult> GetOrderByDate(string stamp, int id)
        {
            var date = DateTime.Parse(stamp);
            try
            {
                List<Order> orders;
                if (id == -1)
                    orders = await context.Orders.Where(v => v.Created == date).Include(v => v.Client).ToListAsync();
                else
                {
                    var client = await context.Clients.Where(v => v.Id == id).FirstOrDefaultAsync();
                    if (client == null)
                        return Ok(new List<object>());
                    orders = await context.Orders.Where(v => v.Created == date && v.Client == client).Include(v => v.Client).ToListAsync();
                }
                if (orders == null)
                    return Ok(new List<object>());
                return Ok(orders);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> UpdateOrder(Order order)
        {
            try
            {
                var o = await context.Orders.Where(v => v.Id == order.Id).FirstOrDefaultAsync();
                if (o == null)
                    return BadRequest("Клиент не найден");
                context.Entry(o).State = EntityState.Detached;
                context.Update(order);
                await context.SaveChangesAsync();

                return Ok("Заказ обновлен");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}