namespace TodoApi.DTOs
{
    public class UpdateTodoItemDto : CreateTodoItemDto
    {
        public int Id { get; set; }
    }
}