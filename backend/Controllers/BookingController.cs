using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using backend.Models.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ POST /api/bookings/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateBooking([FromBody] Booking request)
        {
            var machine = await _context.LaundryMachines.FindAsync(request.MachineId);
            if (machine == null) return NotFound("Machine not found");

            if (machine.Status == "Busy")
                return BadRequest("Machine already reserved");

            machine.Status = "Busy";
            machine.RemainingTime = 45;

            var booking = new Booking
            {
                MachineId = request.MachineId,
                UserId = request.UserId,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return Ok("Booking created");
        }


        // ✅ POST /api/bookings/cancel
        [HttpPost("cancel")]
        public async Task<IActionResult> CancelBooking([FromBody] CancelBookingRequest request)
        {
            var booking = await _context.Bookings.FindAsync(request.BookingId);
            if (booking == null) return NotFound("Booking not found");

            booking.IsActive = false;

            var machine = await _context.LaundryMachines.FindAsync(booking.MachineId);
            if (machine != null)
            {
                machine.Status = "Available";
                machine.RemainingTime = 0;
            }

            await _context.SaveChangesAsync();

            return Ok("Booking cancelled");
        }
        // ✅ GET /api/bookings
        [HttpGet]
        public async Task<IActionResult> GetAllBookings()
        {
            var bookings = await _context.Bookings.ToListAsync();
            return Ok(bookings);
        }


    }
}
