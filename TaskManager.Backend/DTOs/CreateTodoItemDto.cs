namespace TodoApi.DTOs
{
    public class CreateTodoItemDto
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int Priority { get; set; }
        public string Category { get; set; } = "";
        public int? AssignedToUserId { get; set; } // optional
    }
}
