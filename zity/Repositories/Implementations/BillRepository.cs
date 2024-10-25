﻿using Microsoft.EntityFrameworkCore;
using zity.Data;
using zity.DTOs.Bills;
using zity.ExceptionHandling.Exceptions;
using zity.Models;
using zity.Repositories.Interfaces;
using zity.Utilities;

namespace zity.Repositories.Implementations
{
    public class BillRepository(ApplicationDbContext dbContext) : IBillRepository
    {
        private readonly ApplicationDbContext _dbContext = dbContext;

        public async Task<PaginatedResult<Bill>> GetAllAsync(BillQueryDTO queryParam)
        {
            var filterParams = new Dictionary<string, string?>
            {
                { "Id", queryParam.Id },
                { "Monthly", queryParam.Monthly },
                { "Status", queryParam.Status }
            };
            var billsQuery = _dbContext.Bills
                .Where(u => u.DeletedAt == null)
                .ApplyIncludes(queryParam.Includes)
                .ApplyFilters(filterParams)
                .ApplySorting(queryParam.Sort)
                .ApplyPaginationAsync(queryParam.Page, queryParam.PageSize);

            return await billsQuery;
        }

        public async Task<Bill?> GetByIdAsync(int id, string? includes = null)
        {
            var query = _dbContext.Bills.AsQueryable();

            if (!string.IsNullOrEmpty(includes))
            {
                query = query.ApplyIncludes(includes);
            }

            return await query.FirstOrDefaultAsync(b => b.Id == id && b.DeletedAt == null);
        }

        public async Task<Bill> CreateAsync(Bill bill)
        {
            _dbContext.Bills.Add(bill);
            await _dbContext.SaveChangesAsync();
            return bill;
        }

        public async Task<Bill> UpdateAsync(Bill bill)
        {
            _dbContext.Bills.Update(bill);
            await _dbContext.SaveChangesAsync();
            return bill;
        }

        public async Task DeleteAsync(int id)
        {
            var bill = await _dbContext.Bills.FirstOrDefaultAsync(b => b.Id == id)
                            ?? throw new EntityNotFoundException(nameof(Bill), id);

            var vietnamTime = DateTime.UtcNow.AddHours(7);
            bill.DeletedAt = vietnamTime;

            _dbContext.Bills.Update(bill);
            await _dbContext.SaveChangesAsync();
        }

    }
}