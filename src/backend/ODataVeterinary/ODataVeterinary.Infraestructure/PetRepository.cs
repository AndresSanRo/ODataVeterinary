using ODataVeterinary.Data;
using ODataVeterinary.Infraestructure.Abstract;

namespace ODataVeterinary.Infraestructure
{
    public class PetRepository : IPetRepository
    {
        public ODataVeterinaryDbContext DbContext { get; set; }

        public PetRepository(ODataVeterinaryDbContext DbContext)
        {
            this.DbContext = DbContext;
        }
    }
}
