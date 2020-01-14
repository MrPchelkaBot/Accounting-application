using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace booker_web.Models
{
    public class Cost
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public TypeCost Type { get; set; }
        public DateTime Date { get; set; }

        public Cost() { }

        public Cost(string name, int price, TypeCost type ,DateTime date)
        {
            Name = name;
            Price = price;
            Date = date;
            Type = type;
        }
    }

    public enum TypeCost
    {
        Аренда = 1,
        Водитель = 2,
        Курьер = 3,
        ТранспортнаяКомпания = 4,
        Зарплата = 5,
        ПроцентОтСделок = 6,
        Налоги = 7,
        АрендаСклада = 8,
        Бензин = 9,
        Гостиница = 10,
        Питание = 11,
        Фрилансер = 12,
        Помощник = 13,
        Прочее = 14
    }
}
