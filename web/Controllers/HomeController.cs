using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace booker_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ApplicationContext context;
        public HomeController(ApplicationContext context)
        {
            this.context = context;
        }

        [HttpGet("Income"), Authorize]
        public async Task<IActionResult> GetIncome(int clientId, string ot, string du)
        {
            var ot1 = DateTime.Parse(ot);
            var du1 = DateTime.Parse(du);

            var orders = await context.Orders.Where(v => v.Client.Id == clientId && v.Created >= ot1 && v.Created <= du1).Include(v => v.Client).ToListAsync();
            if (orders == null)
                return Ok(new List<object>());

            return Ok(orders);
        }

        [HttpGet("Statistik"), Authorize]
        public async Task<IActionResult> GetStatistik()
        {
            var orders = context.Orders.OrderBy(v => v.Created).ToList();
            if (orders.Count == 0)
                return Ok(new List<object>());
            var firstYear = orders[0].Created.Year;
            var lastYear = orders[orders.Count - 1].Created.Year;

            var result = new List<StatisticHelper>();

            while (firstYear <= lastYear)
            {
                for (var i = 1; i <= 12; i ++)
                {
                    var o = await context.Orders.Where(v => v.Created.Month == i && v.Created.Year == firstYear).ToListAsync();
                    if (o.Count > 0)
                    {
                        int cost = 0;
                        var costs = await context.Costs.Where(v => v.Date.Month == i && v.Date.Year == firstYear).ToListAsync();
                        if (costs.Count > 0)
                        {
                            foreach (var c in costs)
                                cost += c.Price;
                        }

                        var a = new StatisticHelper();
                        a.Year = firstYear;
                        a.Month = MonthString(i);

                        foreach (var oc in o)
                        {
                            a.Wait += oc.Wait;
                            a.Payment += oc.Payment;
                            a.Cost += oc.CostLogistic + oc.CostPrice + cost;
                            a.Balance = a.Payment - a.Cost;
                        }

                        result.Insert(0, a);
                    }
                }
                firstYear++;
            }
            return Ok(result);
        }

        private string MonthString(int m)
        {
            switch (m)
            {
                case 1: return "Январь";
                case 2: return "Февраль";
                case 3: return "Март";
                case 4: return "Апрель";
                case 5: return "Май";
                case 6: return "Июнь";
                case 7: return "Июль";
                case 8: return "Август";
                case 9: return "Сентябрь";
                case 10: return "Октябрь";
                case 11: return "Ноябрь";
                case 12: return "Декабрь";
            }
            return "";
        }
    }

    public sealed class StatisticHelper
    {
        public int Year { get; set; }
        public string Month { get; set; }
        public int Wait { get; set; }
        public int Payment { get; set; }
        public int Cost { get; set; }
        public int Balance { get; set; }
    }

}