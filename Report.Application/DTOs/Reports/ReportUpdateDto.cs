﻿using System.ComponentModel.DataAnnotations;

namespace Report.Application.DTOs.Reports;

public class ReportUpdateDTO
{
    [Required]
    public string Content { get; set; } = null!;
    [Required]
    public string Title { get; set; } = null!;
    [Required]
    public string Status { get; set; } = null!;
    [Required]
    public int? RelationshipId { get; set; }
}
