using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Infraestructure.Abstract;
using ODataVeterinary.Shared.Model;
using System.Collections.Generic;
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

        public async Task<IList<Pet>> GetPets()
        {
            return await PetRepository.ListAll();
        }
    }
}
