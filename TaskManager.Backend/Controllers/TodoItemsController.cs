using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly ITodoService _todoService;

        public TodoItemsController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // GET: api/TodoItems - Get all todo items for the logged-in user
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItemDto>>> GetTodoItems()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var items = await _todoService.GetTodosAsync(int.Parse(userId));
            return Ok(items);
        }

        // GET: api/TodoItems/{id} - Get a specific todo item by ID
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItemDto>> GetTodoItem(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var item = await _todoService.GetTodoItemByIdAsync(id, int.Parse(userId));
            if (item == null) return NotFound();

            return Ok(item);
        }

        // POST: api/TodoItems - Create a new todo item
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<TodoItemDto>> PostTodoItem(CreateTodoItemDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();

            var createdItem = await _todoService.CreateTodoAsync(dto, int.Parse(userId));
            return CreatedAtAction(nameof(GetTodoItem), new { id = createdItem.Id }, createdItem);
        }

        // PUT: api/TodoItems/{id} - Update an existing todo item
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(int id, UpdateTodoItemDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin"); // if using role-based auth

            if (userId == null) return Unauthorized();
            dto.Id = id;

            var result = await _todoService.UpdateTodoAsync(dto, int.Parse(userId), isAdmin);
            if (!result) return NotFound("Task not found or access denied.");

            return NoContent();
        }

        // DELETE: api/TodoItems/{id} - Delete a specific todo item by ID
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var isAdmin = User.IsInRole("Admin");

            if (userId == null) return Unauthorized();

            var result = await _todoService.DeleteTodoAsync(id, int.Parse(userId), isAdmin);
            if (!result) return NotFound("Task not found or access denied.");

            return NoContent();
        }

    }
}
