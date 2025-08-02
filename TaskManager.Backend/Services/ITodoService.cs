using TodoApi.DTOs;

namespace TodoApi.Services
{
    public interface ITodoService
    {
        Task<IEnumerable<TodoItemDto>> GetTodosAsync(int userId);
        Task<TodoItemDto?> GetTodoItemByIdAsync(int id, int userId);
        Task<TodoItemDto> CreateTodoAsync(CreateTodoItemDto dto, int userId);
        Task<bool> UpdateTodoAsync(UpdateTodoItemDto dto, int userId, bool isAdmin);
        Task<bool> DeleteTodoAsync(int id, int userId, bool isAdmin);
    }
}
