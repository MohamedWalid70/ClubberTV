using ClubberTV.Core.Entities;
using ClubberTV.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClubberTV.Services
{
    internal class PlaylistServices : IPlaylistServices
    {
        IRepository<PlaylistItem> _playlistItemsRepository;
        public PlaylistServices(IRepository<PlaylistItem> repository)
        {
            _playlistItemsRepository = repository;
        }

        public async ValueTask AddPlaylistItem(PlaylistItem PlaylistItem)
        {
            await _playlistItemsRepository.AddAsync(PlaylistItem);
        }

        public IQueryable<PlaylistItem> GetPlaylistsItems()
        {
            return _playlistItemsRepository.GetAll();
        }

        public async ValueTask<PlaylistItem> GetPlaylistItemByIdsAsync(Guid userId, Guid matchId)
        {
            return await _playlistItemsRepository.GetByIdAsync(userId, matchId);
        }

        public void RemovePlaylistItem(PlaylistItem playlistItem)
        {
            _playlistItemsRepository.Delete(playlistItem);
        }

    }
}
