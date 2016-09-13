using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Domain.Entities
{
    /// <summary>
    /// 功能操作实体
    /// </summary>
    public class Action : Entity
    {
        /// <summary>
        /// 功能操作编码
        /// </summary>
        public string Code { get; set; }

        /// <summary>
        /// 功能操作名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 功能操作备注
        /// </summary>
        public string Remarks { get; set; }
    }
}
