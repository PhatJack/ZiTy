﻿using Survey.Application.DTOs;
using Survey.Application.DTOs.UserAnswers;

namespace Survey.Application.Interfaces;

public interface IUserAnswerService
{
    Task<PaginatedResult<UserAnswerDTO>> GetAllAsync(UserAnswerQueryDTO query);
    Task<UserAnswerDTO> GetByIdAsync(int id, string? includes = null);
    Task<UserAnswerDTO> CreateAsync(UserAnswerCreateDTO userAnswerCreateDTO);
    Task<UserAnswerDTO> UpdateAsync(int id, UserAnswerUpdateDTO userAnswerUpdateDTO);
    Task<UserAnswerDTO> PatchAsync(int id, UserAnswerPatchDTO userAnswerPatchDTO);
    Task DeleteAsync(int id);
}
