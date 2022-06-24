﻿using Smurfs.Entities.Conrete;
using Smurfs.Entity.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smurfs.Business.Abstract
{
    public interface ICallParametersService
    {
        
        Task<List<CallParameters>> GetAllParameters();
    
        Task<CallParameters> GetByIdParameters(int id);

        void CreateParameters(CallParameters entity);
    
        void UpdateParameters(CallParameters entity);
      
        void DeleteParameters(CallParameters entity);
        public CallParameters Calculate(int callId);



    }
}