using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Application.UserApp.Dtos
{
    public class UserRoleDto
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }
    }
}
