using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IRepositoryUser : IRepositoryBase<User>
    {
        User GetUserByName(string username);
        User GetUserByEmail(string email);
        Task<User> AddAsync(User user);
        Task DeleteAsync(User user);
        Task<User> GetByIdAsync(int id);
        Task<List<User>> ListAsync();
        Task UpdateAsync(User user);
    }
}
