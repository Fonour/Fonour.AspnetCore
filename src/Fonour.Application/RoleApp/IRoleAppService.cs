using Fonour.Application.MenuApp.Dtos;
using Fonour.Application.RoleApp.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Application.RoleApp
{
    public interface IRoleAppService
    {
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <returns></returns>
        List<RoleDto> GetAllList();

        /// <summary>
        /// 获取分页列表
        /// </summary>
        /// <param name="startPage">起始页</param>
        /// <param name="pageSize">页面大小</param>
        /// <param name="rowCount">数据总数</param>
        /// <returns></returns>
        List<RoleDto> GetAllPageList(int startPage, int pageSize, out int rowCount);

        /// <summary>
        /// 新增或修改
        /// </summary>
        /// <param name="dto">实体</param>
        /// <returns></returns>
        bool InsertOrUpdate(RoleDto dto);

        /// <summary>
        /// 根据Id集合批量删除
        /// </summary>
        /// <param name="ids">Id集合</param>
        void DeleteBatch(List<Guid> ids);

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id">Id</param>
        void Delete(Guid id);

        /// <summary>
        /// 根据Id获取实体
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns></returns>
        RoleDto Get(Guid id);

        /// <summary>
        /// 根据角色获取权限
        /// </summary>
        /// <param name="roleId">角色id</param>
        /// <returns></returns>
        List<Guid> GetAllMenuListByRole(Guid roleId);

        /// <summary>
        /// 更新角色权限关联关系
        /// </summary>
        /// <param name="roleId">角色id</param>
        /// <param name="roleMenus">角色权限集合</param>
        /// <returns></returns>
        bool UpdateRoleMenu(Guid roleId, List<RoleMenuDto> roleMenus);
    }
}
