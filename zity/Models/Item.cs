﻿using System;
using System.Collections.Generic;

namespace ZiTy.Models;

public partial class Item
{
    public int Id { get; set; }

    public string? Image { get; set; }

    public string Description { get; set; } = null!;

    public bool? IsReceive { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public DateTime? DeletedAt { get; set; }

    public int? UserId { get; set; }

    public virtual User? User { get; set; }
}
