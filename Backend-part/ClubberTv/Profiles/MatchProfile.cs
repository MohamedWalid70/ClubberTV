using AutoMapper;
using ClubberTV.Core.Entities;
using ClubberTV.DTOs.MatchDtos;

namespace ClubberTV.Profiles
{
    public class MatchProfile : Profile
    {
        public MatchProfile()
        {
            CreateMap<AddedMatchDto, Match>();
            CreateMap<MatchOperationsDto, Match>();
            CreateMap<Match, MatchResponseDto>();
        }
    }
}
