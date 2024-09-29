﻿using System;
using System.Collections.Generic;
using zity.DTOs.Apartments;
using zity.DTOs.Bills;
using zity.DTOs.Reports;
using zity.DTOs.Users;

namespace zity.DTOs.Relationships
{
    public class RelationshipDTO
    {
        public int Id { get; set; }

        public string Role { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int UserId { get; set; }

        public string ApartmentId { get; set; } = string.Empty;

        public UserDTO? User { get; set; } = null;

        public ApartmentDTO? Apartment { get; set; } = null;

        public ICollection<BillDTO>? Bills { get; set; } = [];

        public ICollection<ReportDTO>? Reports { get; set; } = [];
    }
}
