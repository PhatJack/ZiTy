﻿using Microsoft.EntityFrameworkCore;
using zity.Data;
using zity.DTOs.Surveys;
using zity.ExceptionHandling.Exceptions;
using zity.Models;
using zity.Repositories.Interfaces;
using zity.Utilities;

namespace zity.Repositories.Implementations
{
    public class SurveyRepository(ApplicationDbContext context) : ISurveyRepository
    {
        private readonly ApplicationDbContext _dbContext = context;

        public async Task<PaginatedResult<Survey>> GetAllAsync(SurveyQueryDTO queryParam)
        {
            var filterParams = new Dictionary<string, string?>
                {
                    { "Id", queryParam.Id },
                    { "Title", queryParam.Title },
                    {"UserCreateId", queryParam.UserCreateId }
                };
            var surveysQuery = _dbContext.Surveys
                .Where(u => u.DeletedAt == null)
                .ApplyIncludes(queryParam.Includes)
                .ApplyFilters(filterParams)
                .ApplySorting(queryParam.Sort)
                .ApplyPaginationAsync(queryParam.Page, queryParam.PageSize);

            return await surveysQuery;
        }

        public async Task<Survey?> GetByIdAsync(int id, string? includes = null)
        {
            var surveysQuery = _dbContext.Surveys.Where(u => u.DeletedAt == null)
                .ApplyIncludes(includes);
            return await surveysQuery.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<Survey> CreateAsync(Survey survey)
        {
            _dbContext.Surveys.Add(survey);
            await _dbContext.SaveChangesAsync();
            return survey;
        }

        public async Task<Survey> UpdateAsync(Survey survey)
        {
            _dbContext.Surveys.Update(survey);
            await _dbContext.SaveChangesAsync();
            return survey;
        }

        public async Task DeleteAsync(int id)
        {
            var survey = await _dbContext.Surveys
                .FirstOrDefaultAsync(u => u.Id == id && u.DeletedAt == null)
                ?? throw new EntityNotFoundException(nameof(Survey), id);

            survey.DeletedAt = DateTime.Now;
            _dbContext.Surveys.Update(survey);
            await _dbContext.SaveChangesAsync();
        }
    }
}
