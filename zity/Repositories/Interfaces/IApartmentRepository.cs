﻿using zity.DTOs.Apartments;
using zity.Models;
using zity.Utilities;

namespace zity.Repositories.Interfaces
{
    public interface IApartmentRepository
    {
        Task<PaginatedResult<Apartment>> GetAllAsync(ApartmentQueryDTO query);
        Task<Apartment?> GetByIdAsync(string id, string? includes = null);
        Task<Apartment> CreateAsync(Apartment apartment);
        Task<Apartment> UpdateAsync(Apartment apartment);
        Task DeleteAsync(string id);
    }
}
