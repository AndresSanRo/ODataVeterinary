using ODataVeterinary.Data;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;
using System.Linq;

namespace ODataVeterinary.Infraestructure
{
    public class PetRepository : IPetRepository
    {
        public ODataVeterinaryDbContext DbContext { get; set; }

        public PetRepository(ODataVeterinaryDbContext DbContext)
        {
            this.DbContext = DbContext;
        }

        public IQueryable<Pet> ListAll()
        {
            return DbContext.Set<Pet>().AsQueryable();            
        }
    }
}
