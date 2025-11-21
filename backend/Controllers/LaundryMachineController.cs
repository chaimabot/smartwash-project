using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/machines")]
    public class LaundryMachineController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LaundryMachineController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET /api/machines/status
        [HttpGet("status")]
        public async Task<IActionResult> GetMachineStatus()
        {
            var machines = await _context.LaundryMachines
                .Select(m => new {
                    m.Id,
                    m.Name,
                    m.Status,
                    m.RemainingTime
                })
                .ToListAsync();

            return Ok(machines);
        }
        // ✅ Libérer une machine (mettre Available)
        [HttpPost("{id}/release")]
        public async Task<IActionResult> ReleaseMachine(int id)
        {
            var machine = await _context.LaundryMachines.FindAsync(id);
            if (machine == null)
                return NotFound("Machine not found");

            machine.Status = "Available";
            machine.RemainingTime = 0;

            await _context.SaveChangesAsync();

            return Ok("Machine released and available");
        }
        // ✅ Ajouter une machine manuellement
        [HttpPost("add")]
        public async Task<IActionResult> AddMachine([FromBody] LaundryMachine machine)
        {
            if (machine == null || string.IsNullOrEmpty(machine.Name))
                return BadRequest("Machine name is required");

            machine.Status = "Available";
            machine.RemainingTime = 0;

            _context.LaundryMachines.Add(machine);
            await _context.SaveChangesAsync();

            return Ok($"Machine '{machine.Name}' added with ID {machine.Id}");
        }


    }
}
