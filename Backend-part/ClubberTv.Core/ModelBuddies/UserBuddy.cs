﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ClubberTV.Core.Entities
{
    [ModelMetadataType(typeof(UserBuddy))]
    public partial class User
    {
        
    }
    public class UserBuddy
    {
        [StringLength(20), RegularExpression(@"[a-zA-Z0-9_]+", ErrorMessage = "Invalid username")]
        [MaxLength(20, ErrorMessage = "Input exceeded the allowed length"), MinLength(3, ErrorMessage = "Input is below the minimum length")]
        public required string Username { get; set; }

        [StringLength(35), RegularExpression(@"^[A-Za-z\s]+$", ErrorMessage = "Invalid name")]
        [MaxLength(35, ErrorMessage = "Input exceeded the allowed length"), MinLength(2, ErrorMessage = "Input is below the minimum length")]
        public required string Name { get; set; }

        [StringLength(40), RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$", ErrorMessage = "Invalid password")]
        [MaxLength(40, ErrorMessage = "Input exceeded the allowed length"), MinLength(6, ErrorMessage = "Input is below the minimum length")]
        public required string Password { get; set; }

        [EmailAddress(ErrorMessage = "Invalid email"), MaxLength(30, ErrorMessage = "Input exceeded the allowed length"), StringLength(30)]
        public required string Email { get; set; }

        [Phone(ErrorMessage = "Phone Number must consist of numbers only"), MaxLength(15, ErrorMessage = "Input exceeded the allowed length"), StringLength(15)]
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Role is required"), StringLength(13)]
        public required string Role { get; set; }

    }
}
