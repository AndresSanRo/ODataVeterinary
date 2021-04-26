using ODataVeterinary.Shared.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODataVeterinary.Infraestructure.Abstract
{
    public interface IPetRepository
    {
        Task<IList<Pet>> ListAll();
    }
}
