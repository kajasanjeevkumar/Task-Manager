using TodoApi.DTOs;
using YourNamespace.DTOs.Admin;

namespace TodoApi.Services.Interfaces;

public interface IAdminService
{
    Task<IEnumerable<TodoItemDto>> GetAllTasksAsync();
    Task<IEnumerable<TodoItemDto>> GetTasksByUserIdAsync(int userId);
    Task<TodoItemDto> CreateTaskByUsernameAsync(CreateTaskByAdminDto dto, int adminUserId);
    Task<int?> GetUserIdByUsernameAsync(string username);
}