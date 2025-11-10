namespace backend.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public int MachineId { get; set; }
        public string UserId { get; set; } // si user connecté plus tard
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;
    }
}
