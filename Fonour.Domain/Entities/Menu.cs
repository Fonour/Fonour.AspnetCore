using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Domain.Entities
{
    /// <summary>
    /// 功能菜单实体
    /// </summary>
    public class Menu : Entity
    {
        /// <summary>
        /// 父级ID
        /// </summary>
        public Guid ParentId { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int SerialNumber { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 菜单编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 菜单地址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 类型：0导航菜单；1操作按钮。
        /// </summary>
        public int Type { get; set; }

        /// <summary>
        /// 菜单图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 菜单备注
        /// </summary>
        public string Remarks { get; set; }
    }
}
