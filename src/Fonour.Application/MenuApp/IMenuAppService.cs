using Fonour.Application.MenuApp.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Application.MenuApp
{
    public interface IMenuAppService
    {
        List<MenuDto> GetAllList();

        List<MenuDto> GetMneusByParent(Guid parentId, int startPage, int pageSize, out int rowCount);

        bool InsertOrUpdate(MenuDto dto);

        void DeleteBatch(List<Guid> ids);

        void Delete(Guid id);

        MenuDto  Get(Guid id);
    }
}
