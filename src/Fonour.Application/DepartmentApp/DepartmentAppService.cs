using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fonour.Application.DepartmentApp.Dtos;
using Fonour.Domain.IRepositories;
using Fonour.Domain.Entities;
using AutoMapper;

namespace Fonour.Application.DepartmentApp
{
    public class DepartmentAppService : IDepartmentAppService
    {
        private readonly IDepartmentRepository _repository;
        public DepartmentAppService(IDepartmentRepository repository)
        {
            _repository = repository;
        }
        /// <summary>
        /// 获取列表
        /// </summary>
        /// <returns></returns>
        public List<DepartmentDto> GetAllList()
        {
            return Mapper.Map<List<DepartmentDto>>(_repository.GetAllList(it => it.Id != Guid.Empty).OrderBy(it => it.Code));
        }

        /// <summary>
        /// 根据父级Id获取子级列表
        /// </summary>
        /// <param name="parentId">父级Id</param>
        /// <param name="startPage">起始页</param>
        /// <param name="pageSize">页面大小</param>
        /// <param name="rowCount">数据总数</param>
        /// <returns></returns>
        public List<DepartmentDto> GetChildrenByParent(Guid parentId, int startPage, int pageSize, out int rowCount)
        {
            return Mapper.Map<List<DepartmentDto>>(_repository.LoadPageList(startPage, pageSize, out rowCount, it => it.ParentId == parentId, it => it.Code));
        }

        /// <summary>
        /// 新增或修改
        /// </summary>
        /// <param name="dto">实体</param>
        /// <returns></returns>
        public bool InsertOrUpdate(DepartmentDto dto)
        {
            var menu = _repository.InsertOrUpdate(Mapper.Map<Department>(dto));
            return menu == null ? false : true;
        }

        /// <summary>
        /// 根据Id集合批量删除
        /// </summary>
        /// <param name="ids">Id集合</param>
        public void DeleteBatch(List<Guid> ids)
        {
            _repository.Delete(it => ids.Contains(it.Id));
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="id">Id</param>
        public void Delete(Guid id)
        {
            _repository.Delete(id);
        }

        /// <summary>
        /// 根据Id获取实体
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns></returns>
        public DepartmentDto Get(Guid id)
        {
            return Mapper.Map<DepartmentDto>(_repository.Get(id));
        }
    }
}
