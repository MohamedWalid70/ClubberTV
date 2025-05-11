using ClubberTV.Core.Entities;

namespace ClubberTV.Core.Interfaces
{
    public interface IPlaylistServices
    {
        ValueTask AddPlaylistItem(PlaylistItem PlaylistItem);
        ValueTask<PlaylistItem> GetPlaylistItemByIdsAsync(Guid userId, Guid matchId);
        IQueryable<PlaylistItem> GetPlaylistsItems();
        void RemovePlaylistItem(PlaylistItem playlistItem);
    }
}
