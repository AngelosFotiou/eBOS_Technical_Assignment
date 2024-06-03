using Microsoft.AspNetCore.Mvc;

namespace eBOS_Technical_Assignment.Server.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class StatusController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetStatus()
        {
            // You can include additional logic here if needed
            // For simplicity, we are just returning a 200 OK status
            return Ok();
        }
    }
}
