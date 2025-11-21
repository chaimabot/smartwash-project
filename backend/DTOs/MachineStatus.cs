namespace backend.Models.DTOs
{
    public class UpdateMachineStatusRequest
    {
        public int MachineId { get; set; }
        public string Status { get; set; }   // "Available" | "Busy" | "Error"
        public int RemainingTime { get; set; }
    }
}
