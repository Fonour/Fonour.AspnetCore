using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Domain.Entities
{
    public class RoleMenuRelation
    {
        /// <summary>
        /// 角色Id
        /// </summary>
        public Guid RoleId { get; set; }

        /// <summary>
        /// 功能Id
        /// </summary>
        public Guid MenuId { get; set; }

        /// <summary>
        /// 包含操作（新增/删除/修改等以逗号隔开）
        /// </summary>

        public string Actions { get; set; }

        public virtual Role Role { get; set; }
        public virtual Menu Menu { get; set; }
    }
}
