using Fonour.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Application.UserApp
{
    public interface IUserAppService
    {
        User CheckUser(string userName, string password);
    }
}
