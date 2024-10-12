﻿using zity.DTOs.Users;
using zity.Repositories.Interfaces;
using zity.Mappers;
using zity.Services.Interfaces;
using zity.Utilities;
using zity.Constraints;

namespace zity.Services.Implementations
{
    public class UserService(IUserRepository userRepository, IMediaService mediaService, IEmailService emailService) : IUserService
    {
        private readonly IUserRepository _userRepository = userRepository;
        private readonly IMediaService _mediaService = mediaService;
        private readonly IEmailService _emailService = emailService;

        public async Task<PaginatedResult<UserDTO>> GetAllAsync(UserQueryDTO query)
        {
            var pageUsers = await _userRepository.GetAllAsync(query);
            var userDTOs = pageUsers.Contents.Select(UserMapper.ToDTO).ToList();
            return new PaginatedResult<UserDTO>(userDTOs, pageUsers.TotalItems, pageUsers.Page, pageUsers.PageSize);
        }

        public async Task<UserDTO?> GetByIdAsync(int id, string? includes)
        {
            var user = await _userRepository.GetByIdAsync(id, includes);
            return user != null ? UserMapper.ToDTO(user) : null;
        }

        public async Task<UserDTO> CreateAsync(UserCreateDTO userCreateDTO)
        {
            var user = UserMapper.FromCreateDTO(userCreateDTO);

            var password = PasswordGenerator.GeneratePassword(12);
            user.Password = BCrypt.Net.BCrypt.HashPassword(password);

            var createdUser = await _userRepository.CreateAsync(user);

            await _emailService.SendAccountCreationEmail(createdUser, password);
            return UserMapper.ToDTO(createdUser);
        }

        public async Task<UserDTO?> UploadAvatarAsync(int id, IFormFile file)
        {
            var user = await _userRepository.GetByIdAsync(id, null);
            if (user == null)
                return null;
            if (!string.IsNullOrEmpty(user.Avatar))
            {
                await _mediaService.DeleteImageAsync(user.Avatar, CloudinaryConstants.USER_AVATARS_FOLDER);
            }
            var avatarUrl = await _mediaService.UploadImageAsync(file, CloudinaryConstants.USER_AVATARS_FOLDER);
            user.Avatar = avatarUrl;
            await _userRepository.UpdateAsync(user);

            return user != null ? UserMapper.ToDTO(user) : null;
        }
    }
}
