using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.User.RegisterUser
{
    public class RegisterUserInput
    {
        public string? Firstname { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string? Phonenumber { get; set; }
        public string? Username { get; set; }
        public byte[]? PasswordHash { get; set; }
        public string? Password { get; set; }
        public byte[]? Salt { get; set; }
        public Guid? Organization { get; set; }
        public string? RegisterCode { get; set; }
    }
}
