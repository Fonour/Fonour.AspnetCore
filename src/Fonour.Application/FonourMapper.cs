using AutoMapper;
using Fonour.Application.DepartmentApp.Dtos;
using Fonour.Application.MenuApp.Dtos;
using Fonour.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Fonour.Application
{
    /// <summary>
    /// Enity与Dto映射
    /// </summary>
    public class FonourMapper
    {
        public static void Initialize()
        {
            Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Menu, MenuDto>();
                cfg.CreateMap<MenuDto, Menu>();
                cfg.CreateMap<Department, DepartmentDto>();
                cfg.CreateMap<DepartmentDto, Department>();
            });
        }
    }
}
