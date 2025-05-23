﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubberTV.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        ValueTask<int> CommitAsync();
    }
}
