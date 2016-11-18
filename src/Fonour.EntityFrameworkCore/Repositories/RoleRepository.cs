using Fonour.Domain.Entities;
using Fonour.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.EntityFrameworkCore.Repositories
{
    public class RoleRepository : FonourRepositoryBase<Role>, IRoleRepository
    {
        public RoleRepository(FonourDbContext dbcontext) : base(dbcontext)
        {

        }
    }
}
