using TodoApi.DTOs;

namespace TodoApi.Services
{
    public interface IUserService
    {
        Task<UserDto?> RegisterAsync(RegisterDto registerDto);
        Task<string?> LoginAsync(LoginDto loginDto);
    }
}