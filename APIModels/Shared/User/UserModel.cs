using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APIModels.Shared.User
{
    public class UserModel
    {
        public Guid ID { get; set; }
        public string Firstname {  get; set; }
        public string Lastname { get; set; }
        public string Email {  get; set; }
        public string PhoneNumber {  get; set; }
        public bool Admin {  get; set; }
        public Guid OrganizationID {  get; set; }
    }
}
