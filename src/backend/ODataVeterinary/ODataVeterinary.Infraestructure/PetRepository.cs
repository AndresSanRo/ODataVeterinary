using Microsoft.EntityFrameworkCore;
using ODataVeterinary.Data;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODataVeterinary.Infraestructure
{
    public class PetRepository : IPetRepository
    {
        public ODataVeterinaryDbContext DbContext { get; set; }

        public PetRepository(ODataVeterinaryDbContext DbContext)
        {
            this.DbContext = DbContext;
        }

        public async Task<IList<Pet>> ListAll()
        {
            return await DbContext.Set<Pet>().AsQueryable().ToListAsync();            
        }
    }
}
