using Microsoft.AspNet.OData;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Query;
using Microsoft.AspNetCore.Mvc;
using ODataVeterinary.Domain.Abstract;
using ODataVeterinary.Shared.Model;
using System.Threading.Tasks;

namespace ODataVeterinary.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PetController : ODataController
    {
        public IPetDomain PetDomain { get; set; }

        public PetController(IPetDomain PetDomain)
        {
            this.PetDomain = PetDomain;
        }

        [HttpGet]        
        public async Task<IActionResult> GetPets(ODataQueryOptions<Pet> filter)
        {
            var results = await PetDomain.GetPets(filter);
            var page = new PageResult<dynamic>(results,
                Request.HttpContext.ODataFeature().NextLink,
                Request.HttpContext.ODataFeature().TotalCount);
            return Ok(page);
        }
    }
}
