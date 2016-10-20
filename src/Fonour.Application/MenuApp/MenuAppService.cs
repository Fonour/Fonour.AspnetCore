using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Fonour.Application.MenuApp.Dtos;
using Fonour.Domain.IRepositories;
using Fonour.Domain.Entities;
using AutoMapper;

namespace Fonour.Application.MenuApp
{
    public class MenuAppService : IMenuAppService
    {
        private readonly IMenuRepository _menuRepository;
        public MenuAppService(IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }

        public List<MenuDto> GetAllList()
        {
            var menus = _menuRepository.GetAllList().OrderBy(it=>it.SerialNumber);
            return Mapper.Map<List<MenuDto>>(menus);
        }

        public List<MenuDto> GetMneusByParent(Guid parentId, int startPage, int pageSize, out int rowCount)
        {
            var menus = _menuRepository.LoadPageList(startPage, pageSize, out rowCount, it => it.ParentId == parentId, it => it.SerialNumber);
            return Mapper.Map<List<MenuDto>>(menus);
        }

        public bool InsertOrUpdate(MenuDto dto)
        {
            var menu = _menuRepository.InsertOrUpdate(Mapper.Map<Menu>(dto));
            return menu == null ? false : true;
        }

        public void DeleteBatch(List<Guid> ids)
        {
            _menuRepository.Delete(it => ids.Contains(it.Id));
        }

        public void Delete(Guid id)
        {
            _menuRepository.Delete(id);
        }

        public MenuDto Get(Guid id)
        {
            return Mapper.Map<MenuDto>(_menuRepository.Get(id));
        }
    }
}
