using Fonour.Domain.Entities;
using Fonour.Domain.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.EntityFrameworkCore.Repositories
{
    public class MenuRepository : FonourRepositoryBase<Menu>, IMenuRepository
    {
        public MenuRepository(FonourDbContext dbcontext) : base(dbcontext)
        {

        }
    }
}
