using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Infraestructure.Abstract;

namespace ODataVeterinary.Domain
{
    public class PetDomain : IPetDomain
    {
        public IPetRepository PetRepository { get; set; }

        public PetDomain(IPetRepository PetRepository)
        {
            this.PetRepository = PetRepository;
        }
    }
}
