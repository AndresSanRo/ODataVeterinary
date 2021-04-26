using ODataVeterinary.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODataVeterinary.Domain.Abstract
{
    public interface IPetDomain
    {
        Task<IList<Pet>> GetPets();
    }
}
