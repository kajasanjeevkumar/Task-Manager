using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;
using TodoApi.Services.Interfaces;
using YourNamespace.DTOs.Admin;

namespace TodoApi.Services;

public class AdminService : IAdminService
{
    private readonly TodoDbContext _context;

    public AdminService(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoItemDto>> GetAllTasksAsync()
    {
        return await _context.TodoItems
            .Include(t => t.Owner)
            .Include(t => t.AssignedToUser)
            .Select(t => new TodoItemDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                Category = t.Category,
                OwnerUsername = t.Owner.Username,
                AssignedToUsername = t.AssignedToUser != null ? t.AssignedToUser.Username : null
            }).ToListAsync();
    }

    public async Task<IEnumerable<TodoItemDto>> GetTasksByUserIdAsync(int userId)
    {
        return await _context.TodoItems
            .Include(t => t.Owner)
            .Include(t => t.AssignedToUser)
            .Where(t => t.AppUserId == userId || t.AssignedToUserId == userId)
            .Select(t => new TodoItemDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                DueDate = t.DueDate,
                IsCompleted = t.IsCompleted,
                Priority = t.Priority,
                Category = t.Category,
                OwnerUsername = t.Owner.Username,
                AssignedToUsername = t.AssignedToUser != null ? t.AssignedToUser.Username : null
            }).ToListAsync();
    }
    public async Task<TodoItemDto> CreateTaskByUsernameAsync(CreateTaskByAdminDto dto, int adminUserId)
    {
        var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.Username == dto.AssignedToUsername);


        if (user == null)
            throw new ArgumentException("Assigned username not found.");

        var newTask = new TodoItem
        {
            Title = dto.Title,
            Description = dto.Description,
            DueDate = dto.DueDate,
            Priority = dto.Priority,
            Category = dto.Category,
            AppUserId = adminUserId,
            AssignedToUserId = user.Id,
            IsCompleted = false
        };

        _context.TodoItems.Add(newTask);
        await _context.SaveChangesAsync();

        return new TodoItemDto
        {
            Id = newTask.Id,
            Title = newTask.Title,
            Description = newTask.Description,
            DueDate = newTask.DueDate,
            IsCompleted = newTask.IsCompleted,
            Priority = newTask.Priority,
            Category = newTask.Category,
            OwnerUsername = (await _context.AppUsers.FindAsync(adminUserId))?.Username,
            AssignedToUsername = user.Username
        };
    }

    public async Task<int?> GetUserIdByUsernameAsync(string username)
    {
        var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.Username == username);
        return user?.Id;
    }

}
