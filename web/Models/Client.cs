using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace booker_web.Models
{
    public class Client
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public TypeClient Type { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }

        public Client() {}

        public Client(string name, TypeClient type, string city, string address, string phone, string email, string contact)
        {
            Name = name;
            Type = type;
            City = city;
            Address = address;
            Phone = phone;
            Email = email;
            Contact = contact;
        }
    }

    public enum TypeClient
    {
        магазин = 1,
        ателье = 2,
        производитель = 3,
        дизайнер = 4,
    }
}
