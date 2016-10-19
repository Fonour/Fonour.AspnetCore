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

        bool InsertOrUpdate(MenuDto dto);
    }
}
