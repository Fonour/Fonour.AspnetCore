using Fonour.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Domain.IRepositories
{
    /// <summary>
    /// 用户管理仓储接口
    /// </summary>
    public interface IUserRepository : IRepository<User>
    {
        /// <summary>
        /// 检查用户是存在
        /// </summary>
        /// <param name="userName">用户名</param>
        /// <param name="password">密码</param>
        /// <returns>存在返回用户实体，否则返回NULL</returns>
        User CheckUser(string userName, string password);

        User GetWithRoles(Guid id);
    }
}
