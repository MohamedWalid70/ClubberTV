using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.DTOs.UserDtos;

namespace ClubberTV.Profiles
{
    public class UserContractProfile : Profile
    {
        public UserContractProfile()
        {
            CreateMap<User,  UserResponseDto>();
        }
    }
}
