namespace backend.Models
{
    public class LaundryMachine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; } = "Available";
        public int RemainingTime { get; set; } = 0;
    }
}
