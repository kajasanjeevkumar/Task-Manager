namespace TodoApi.DTOs
{
    public class RegisterDto
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required string Email { get; set; } 
        public string Role { get; set; } = "User"; // Defaults to User (Only new users can be added, not new admins).
    }
}
