using ODataVeterinary.Shared.Model;
using System.Linq;

namespace ODataVeterinary.Infraestructure.Abstract
{
    public interface IPetRepository
    {
        IQueryable<Pet> ListAll();
    }
}
