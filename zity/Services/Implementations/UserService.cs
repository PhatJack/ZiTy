﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ZiTy.DTOs.Users;
using ZiTy.Repositories.Interfaces;
using ZiTy.Mappers;
using Microsoft.EntityFrameworkCore;
using ZiTy.Services.Interfaces;
using zity.DTOs.Users;
using zity.Utilities;

namespace ZiTy.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<PaginatedResult<UserDto>> GetAllAsync(UserQueryDto query)
        {
            var pageUsers = await _userRepository.GetAllAsync(query);
            var userDtos = pageUsers.Contents.Select(UserMapper.ToUserDto).ToList();
            return new PaginatedResult<UserDto>(userDtos, pageUsers.TotalItems, pageUsers.Page, pageUsers.PageSize);
        }
    }
}
