using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace booker_web.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public GroupItems GroupItems { get; set; }
        public Client Client { get; set; }
        public int CostPrice { get; set; }
        public int CostLogistic { get; set; }
        public int Payment { get; set; }
        public int Profit { get; set; }
        public int Wait { get; set; }
        public DateTime WaitDate { get; set; }

        public Order() { }

        public Order(DateTime created, GroupItems groupItems, Client client, int costPrice, int costLogistic, int payment, int profit, int wait, DateTime waitDate)
        {
            Created = created;
            GroupItems = groupItems;
            Client = client;
            CostPrice = costPrice;
            CostLogistic = costLogistic;
            Payment = payment;
            Profit = profit;
            Wait = wait;
            WaitDate = waitDate;
        }
    }

    public enum GroupItems
    {
        Молнии = 1,
        Кнопки = 2,
        Нашивки = 3,
        Украшения = 4,
        Кружева = 5,
        Фурнитура = 6,
        Пуговицы = 7
    }
}
