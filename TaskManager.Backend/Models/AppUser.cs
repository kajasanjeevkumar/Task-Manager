using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TodoApi.Models
{
    public class AppUser
    {
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = "User";

        // ✅ Navigation: Tasks this user owns
        public List<TodoItem> OwnedTasks { get; set; } = new();

        // ✅ Navigation: Tasks assigned to this user
        public List<TodoItem> AssignedTasks { get; set; } = new();
    }
}
