namespace TodoApi.DTOs
{
    public class TodoItemDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; }
        public string Category { get; set; } = "";

        public int AppUserId { get; set; }              // Owner ID
        public string? OwnerUsername { get; set; }      // Optional for frontend

        public int? AssignedToUserId { get; set; }      // Assignee ID
        public string? AssignedToUsername { get; set; } // Optional for frontend
    }
}
