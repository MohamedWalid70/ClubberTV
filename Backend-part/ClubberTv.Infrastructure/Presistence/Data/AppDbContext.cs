using ClubberTV.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClubberTV.Infrastructure.Presistence.Data
{
    public class AppDbContext : DbContext
    {
        //public DbSet<User> Users { get; set; }
        //public DbSet<Match> Matches { get; set; }
        //public DbSet<Playlist> Playlists { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasMany(user => user.Matches).WithMany(match => match.Users).UsingEntity<PlaylistItem>(

                l => l.HasOne<Match>().WithMany().HasForeignKey(playlist => playlist.MatchId),
                r => r.HasOne<User>().WithMany().HasForeignKey(playlist => playlist.UserId) 
                );

            modelBuilder.Entity<PlaylistItem>().HasKey(playlist => new { playlist.UserId, playlist.MatchId });

            modelBuilder.Entity<Match>().Property(match => match.Title).HasMaxLength(50);
            modelBuilder.Entity<Match>().Property(match => match.Competition).HasMaxLength(40);

            modelBuilder.Entity<User>().Property(user => user.Email).HasMaxLength(30);
            modelBuilder.Entity<User>().Property(user => user.Username).HasMaxLength(20);
            modelBuilder.Entity<User>().Property(user => user.Name).HasMaxLength(35);
            modelBuilder.Entity<User>().Property(user => user.Password).HasMaxLength(64);
            modelBuilder.Entity<User>().Property(user => user.PhoneNumber).HasMaxLength(15);
            modelBuilder.Entity<User>().Property(user => user.Role).HasMaxLength(13);

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Match>().ToTable("Matches");
            modelBuilder.Entity<PlaylistItem>().ToTable("PlaylistItems");

            base.OnModelCreating(modelBuilder);
        }
    }
}
