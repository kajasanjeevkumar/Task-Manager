using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class TodoItem
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; }

        public int Priority { get; set; }

        public string Category { get; set; } = string.Empty;

        // ✅ Owner: Who created the task
        public int AppUserId { get; set; } //FK
        public AppUser? Owner { get; set; }

        // ✅ Assigned to: Optional
        public int? AssignedToUserId { get; set; }
        public AppUser? AssignedToUser { get; set; }
    }
}
