using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task DeleteAsync(User user);
        Task<User> GetByIdAsync(int id);
        Task<List<User>> ListAsync();
        Task UpdateAsync(User user);
        User? GetUserByUserName(string userName);
    }
}
