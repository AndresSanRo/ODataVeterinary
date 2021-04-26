using Microsoft.AspNetCore.Mvc;
using ODataVeterinary.Domain.Abstract;
using System.Threading.Tasks;

namespace ODataVeterinary.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PetController : ControllerBase
    {
        public IPetDomain PetDomain { get; set; }

        public PetController(IPetDomain PetDomain)
        {
            this.PetDomain = PetDomain;
        }

        [HttpGet]
        public async Task<IActionResult> GetPets()
        {
            return Ok(await PetDomain.GetPets());
        }
    }
}
