using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoApi.Services.Interfaces;
using YourNamespace.DTOs.Admin;

namespace TodoApi.Controllers;

[Route("api/admin")]
[ApiController]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    // GET: api/admin/tasks
    [HttpGet("tasks")]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _adminService.GetAllTasksAsync();
        return Ok(tasks);
    }

    // GET: api/admin/tasks/{userId}
    [HttpGet("tasks/{userId}")]
    public async Task<IActionResult> GetTasksByUser(int userId)
    {
        var tasks = await _adminService.GetTasksByUserIdAsync(userId);
        return Ok(tasks);
    }

    // POST: api/admin/add-task-by-username - Add a task for a user by their username
    [HttpPost("add-task-by-username")]
    public async Task<IActionResult> AddTaskByUsername([FromBody] CreateTaskByAdminDto dto)
    {
        try
        {
            var adminUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var createdTask = await _adminService.CreateTaskByUsernameAsync(dto, adminUserId);
            return Ok(createdTask);
        }
        catch (ArgumentException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Failed to create task", details = ex.Message });
        }
    }

    // GET: api/admin/user-id/{username} - Get user ID by username
    [HttpGet("user-id/{username}")]
    public async Task<IActionResult> GetUserIdByUsername(string username)
    {
        var userId = await _adminService.GetUserIdByUsernameAsync(username);

        if (userId == null)
            return NotFound(new { message = "User not found" });

        return Ok(new { userId });
    }
}
