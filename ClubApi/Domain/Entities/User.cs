using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static Domain.Enums.Enums;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(64)")]
        public string Name { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string Email { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string Password { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(128)")]
        public string UserName { get; set; }

        [Required]
        public UserType UserType { get; set; }

        [Required]
        [Column(TypeName = "datetime")]
        public DateTime UserRegistrationDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? UserDeletionDate { get; set; }


        public static bool CompareUserType(User user, string userTypeString)
        {
            if (Enum.TryParse<UserType>(userTypeString, out var userTypeEnum))
                return user.UserType == userTypeEnum;

            return false;
        }

        public static string ToUserTypeString(UserType userType)
        {
            switch (userType)
            {
                case UserType.Admin: return "Admin";
                case UserType.Client: return "Client";
                default: throw new ArgumentOutOfRangeException(nameof(userType), userType, null);
            }
        }
    }
}
