using Microsoft.EntityFrameworkCore;
using TodoApi.Data;
using TodoApi.DTOs;
using TodoApi.Models;

namespace TodoApi.Services
{
    public class TodoService : ITodoService
    {
        private readonly TodoDbContext _context;

        public TodoService(TodoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItemDto>> GetTodosAsync(int userId)
        {
            return await _context.TodoItems
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
                    AppUserId = t.AppUserId,
                    AssignedToUserId = t.AssignedToUserId
                })
                .ToListAsync();
        }

        public async Task<TodoItemDto?> GetTodoItemByIdAsync(int id, int userId)
        {
            var item = await _context.TodoItems
                .FirstOrDefaultAsync(t => t.Id == id && (t.AppUserId == userId || t.AssignedToUserId == userId));

            if (item == null) return null;

            return new TodoItemDto
            {
                Id = item.Id,
                Title = item.Title,
                Description = item.Description,
                DueDate = item.DueDate,
                IsCompleted = item.IsCompleted,
                Priority = item.Priority,
                Category = item.Category,
                AppUserId = item.AppUserId,
                AssignedToUserId = item.AssignedToUserId
            };
        }

        public async Task<TodoItemDto> CreateTodoAsync(CreateTodoItemDto dto, int userId)
        {
            var todo = new TodoItem
            {
                Title = dto.Title,
                Description = dto.Description,
                DueDate = dto.DueDate,
                IsCompleted = dto.IsCompleted,
                Priority = dto.Priority,
                Category = dto.Category,
                AppUserId = userId,
                AssignedToUserId = dto.AssignedToUserId ?? userId // default to current user
            };

            _context.TodoItems.Add(todo);
            await _context.SaveChangesAsync();

            return new TodoItemDto
            {
                Id = todo.Id,
                Title = todo.Title,
                Description = todo.Description,
                DueDate = todo.DueDate,
                IsCompleted = todo.IsCompleted,
                Priority = todo.Priority,
                Category = todo.Category,
                AssignedToUserId = todo.AssignedToUserId
            };
        }

        public async Task<bool> UpdateTodoAsync(UpdateTodoItemDto dto, int userId, bool isAdmin)
        {
            TodoItem? item;

            if (isAdmin)
            {
                item = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == dto.Id);
            }
            else
            {
                item = await _context.TodoItems
                    .FirstOrDefaultAsync(t => t.Id == dto.Id && (t.AppUserId == userId || t.AssignedToUserId == userId));
            }

            if (item == null) return false;

            item.Title = dto.Title;
            item.Description = dto.Description;
            item.DueDate = dto.DueDate;
            item.IsCompleted = dto.IsCompleted;
            item.Priority = dto.Priority;
            item.Category = dto.Category;

            if (dto.AssignedToUserId.HasValue)
            {
                item.AssignedToUserId = dto.AssignedToUserId.Value;
            }

            await _context.SaveChangesAsync();
            return true;
        }


        public async Task<bool> DeleteTodoAsync(int id, int userId, bool isAdmin)
        {
            TodoItem? item;

            if (isAdmin)
            {
                // Admins can delete any task by ID
                item = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id);
            }
            else
            {
                // Regular users can only delete their own or assigned tasks
                item = await _context.TodoItems
                    .FirstOrDefaultAsync(t => t.Id == id && (t.AppUserId == userId || t.AssignedToUserId == userId));
            }

            if (item == null) return false;

            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
