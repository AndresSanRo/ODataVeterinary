using Microsoft.AspNet.OData.Query;
using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODataVeterinary.Domain
{
    public class PetDomain : IPetDomain
    {
        public IPetRepository PetRepository { get; set; }

        public PetDomain(IPetRepository PetRepository)
        {
            this.PetRepository = PetRepository;
        }

        public async Task<IList<dynamic>> GetPets(ODataQueryOptions<Pet> filter)
        {
            var query = (IQueryable<dynamic>)filter.ApplyTo(PetRepository.ListAll());
            return query.ToList();
        }
    }
}
