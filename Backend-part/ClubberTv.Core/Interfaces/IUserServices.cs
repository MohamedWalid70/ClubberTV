using ClubberTV.Core.Entities;

namespace ClubberTV.Core.Interfaces
{
    public interface IUserServices
    {
        ValueTask AddUserAsync(User user);
        ValueTask<User> GetUserByIdAsync(Guid id);
        IQueryable<User> GetUsers();
        void BeginUpdateUser(User user);
        void RemoveUser(User user);
    }
}
