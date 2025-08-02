using System;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class TodoDbContext : DbContext
    {
        public TodoDbContext(DbContextOptions<TodoDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
        public DbSet<AppUser> AppUsers => Set<AppUser>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ✅ Configure relationships explicitly (Owner & AssignedToUser)
            modelBuilder.Entity<TodoItem>()
                .HasOne(t => t.Owner)
                .WithMany(u => u.OwnedTasks)
                .HasForeignKey(t => t.AppUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TodoItem>()
                .HasOne(t => t.AssignedToUser)
                .WithMany(u => u.AssignedTasks)
                .HasForeignKey(t => t.AssignedToUserId)
                .OnDelete(DeleteBehavior.Restrict);

            // ✅ Seed Admin and Users
            modelBuilder.Entity<AppUser>().HasData(
                new AppUser { Id = 1, Username = "admin", Password = "admin", Email = "admin@example.com", Role = "Admin" },
                new AppUser { Id = 2, Username = "user1", Password = "1234", Email = "user1@example.com", Role = "User" },
                new AppUser { Id = 3, Username = "user2", Password = "1234", Email = "user2@example.com", Role = "User" }
            );

            // ✅ Seed TodoItems
            var staticDueDate = new DateTime(2025, 07, 01, 8, 0, 0);

            modelBuilder.Entity<TodoItem>().HasData(
                new TodoItem
                {
                    Id = 1,
                    Title = "Wake Up",
                    Description = "Wake up early in the morning",
                    DueDate = staticDueDate,
                    IsCompleted = false,
                    Priority = 1,
                    Category = "Personal",
                    AppUserId = 2,               // Owner is user1
                    AssignedToUserId = 2         // Assigned to user1
                },
                new TodoItem
                {
                    Id = 2,
                    Title = "Sleep",
                    Description = "Go to bed early",
                    DueDate = staticDueDate,
                    IsCompleted = false,
                    Priority = 0,
                    Category = "Personal",
                    AppUserId = 1,               // Owner is admin
                    AssignedToUserId = 3         // Assigned to user2
                },
                new TodoItem
                {
                    Id = 3,
                    Title = "Exercise",
                    Description = "Morning walk",
                    DueDate = staticDueDate,
                    IsCompleted = false,
                    Priority = 2,
                    Category = "Health",
                    AppUserId = 3,               // Owner is user2
                    AssignedToUserId = 3
                }
            );
        }
    }
}
