﻿using System;
using System.Collections.Generic;

namespace ZiTy.Models;

public partial class Apartment
{
    public string Id { get; set; } = null!;

    public float Area { get; set; }

    public string Description { get; set; } = null!;

    public int FloorNumber { get; set; }

    public int ApartmentNumber { get; set; }

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public virtual ICollection<Relationship> Relationships { get; set; } = new List<Relationship>();
}
