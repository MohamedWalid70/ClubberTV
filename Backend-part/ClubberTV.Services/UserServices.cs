using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;

namespace ClubberTV.Services
{
    internal class UserServices : IUserServices
    {
        IRepository<User> _userRepository;
        public UserServices(IRepository<User> repository)
        {
            _userRepository = repository;
        }

        public async ValueTask AddUserAsync(User user)
        {
            await _userRepository.AddAsync(user);
        }

        public async ValueTask<User> GetUserByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public IQueryable<User> GetUsers()
        {
            return _userRepository.GetAll();
        }

        public void BeginUpdateUser(User user)
        {
            _userRepository.BeginUpdate(user); 
        }

        public void RemoveUser(User user)
        {
            _userRepository.Delete(user);
        }
    }
}
