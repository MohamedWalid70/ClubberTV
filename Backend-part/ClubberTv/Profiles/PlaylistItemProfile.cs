using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.DTOs.PlaylistDtos;

namespace ClubberTV.Profiles
{
    public class PlaylistItemProfile : Profile
    {
        public PlaylistItemProfile()
        {
            CreateMap<PlaylistItemOperations, PlaylistItem>();
        }
    }
}
