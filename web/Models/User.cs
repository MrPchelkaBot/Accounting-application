using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace booker_web.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public User(string userName, string password)
        {
            UserName = userName;
            Password = password;
        }

        public User(int id, string userName, string password)
        {
            Id = id;
            UserName = userName;
            Password = password;
        }
    }
}
