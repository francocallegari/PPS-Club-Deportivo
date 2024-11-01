using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(64)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(128)")]
        public string Email { get; set; }

        [Column(TypeName = "nvarchar(128)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(128)")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string UserType { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime UserRegistrationDate { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? UserDeletionDate { get; set; }
        public string PhoneNumber { get; set; }
    }
}
