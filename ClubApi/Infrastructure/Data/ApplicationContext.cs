using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Coach> Coaches { get; set; }
        public DbSet<Member> Members { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<MembershipFee> MembershipFees { get; set; }
        public DbSet<TrainingSession> TrainingSessions { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<SportsField> SportsFields { get; set; }
        public DbSet<MembershipFeePayment> MembershipFeePayments { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasDiscriminator(u => u.UserType);

            modelBuilder.Entity<Member>().HasData(CreateMemberDataSeed());

            modelBuilder.Entity<Coach>().HasData(CreateCoachDataSeed());

            modelBuilder.Entity<Admin>().HasData(CreateAdminDataSeed());

            modelBuilder.Entity<Director>().HasData(CreateDirectorDataSeed());

            modelBuilder.Entity<Sport>().HasData(CreateSportDataSeed());

            modelBuilder.Entity<SportsField>().HasData(CreateSportsFieldDataSeed());

            modelBuilder.Entity<Sport>()
                .HasMany(x => x.Members)
                .WithMany(x => x.SportsAttended)
                .UsingEntity(j => j.ToTable("MembersSportsAttended").HasData(CreateMembersSportsAttendedDataSeed()));

            base.OnModelCreating(modelBuilder);
        }

        private Sport[] CreateSportDataSeed()
        {
            return new Sport[]
            {
                new Sport
                {
                    Id = 1,
                    Name = "Basquet",
                    Capacity = 60,
                    ImageURL = "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg"
                },
                new Sport
                {
                    Id = 2,
                    Name = "Futbol",
                    Capacity = 100,
                    ImageURL = "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg"
                },
                new Sport
                {
                    Id = 3,
                    Name = "Voley",
                    Capacity = 60,
                    ImageURL = "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg"
                },
                new Sport
                {
                    Id = 4,
                    Name = "Tenis",
                    Capacity = 40,
                    ImageURL = "https://deportivoromeral.cl/images/ramas/tenis2.jpg"
                }
            };
        }

        private SportsField[] CreateSportsFieldDataSeed()
        {
            return new SportsField[]
            {
                new SportsField
                {
                    Id = 1,
                    Name = "Cancha de Basquet 1",
                    SportId = 1,
                },
                new SportsField
                {
                    Id = 2,
                    Name = "Cancha de Basquet 2",
                    SportId = 1,
                },
                new SportsField
                {
                    Id = 3,
                    Name = "Cancha de Tenis 1",
                    SportId = 4,
                },
                new SportsField
                {
                    Id = 4,
                    Name = "Cancha de Tenis 2",
                    SportId = 4,
                },
                new SportsField
                {
                    Id = 5,
                    Name = "Cancha de Tenis 3",
                    SportId = 4,
                },
                new SportsField
                {
                    Id = 6,
                    Name = "Cancha de Tenis 4",
                    SportId = 4,
                },
                new SportsField
                {
                    Id = 7,
                    Name = "Cancha de Futbol 1",
                    SportId = 2,
                },
                new SportsField
                {
                    Id = 8,
                    Name = "Cancha de Futbol 2",
                    SportId = 2,
                },
                new SportsField
                {
                    Id = 9,
                    Name = "Cancha de Voley 1",
                    SportId = 3,
                },
                new SportsField
                {
                    Id = 10,
                    Name = "Cancha de Voley 2",
                    SportId = 3,
                }
            };
        }
        private Coach[] CreateCoachDataSeed()
        {
            return new Coach[]
            {
                new Coach
                {
                    Id = 1,
                    Name = "John Smith",
                    Email = "john.smith@club.com",
                    Password = "password123",
                    UserName = "coach_john",
                    SportId = 1,
                    PhoneNumber = "341-123-4567",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Coach
                {
                    Id = 2,
                    Name = "Susan Green",
                    Email = "susan.green@club.com",
                    Password = "password123",
                    UserName = "coach_susan",
                    SportId = 2,
                    PhoneNumber = "341-234-5678",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Coach
                {
                    Id = 3,
                    Name = "Mike Johnson",
                    Email = "mike.johnson@club.com",
                    Password = "password123",
                    UserName = "coach_mike",
                    SportId = 3,
                    PhoneNumber = "341-345-6789",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
            };
        }

        private Member[] CreateMemberDataSeed()
        {
            return new Member[]
            {
                new Member
                {
                    Id = 4,
                    Name = "Emily Davis",
                    Email = "emily.davis@club.com",
                    Password = "password123",
                    UserName = "member_emily",
                    PhoneNumber = "341-456-7890",
                    Address = "Av. Pellegrini 1234, Rosario, Santa Fe, Argentina",
                    Dni = "20123456",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Member
                {
                    Id = 5,
                    Name = "Tom Brown",
                    Email = "tom.brown@club.com",
                    Password = "password123",
                    UserName = "member_tom",
                    PhoneNumber = "341-567-8901",
                    Address = "Calle Santa Fe 5678, Rosario, Santa Fe, Argentina",
                    Dni = "21234567",  
                    DateOfBirth = new DateOnly(1985, 3, 22) 

                },
                new Member
                {
                    Id = 6,
                    Name = "Anna White",
                    Email = "anna.white@club.com",
                    Password = "password123",
                    UserName = "member_anna",
                    PhoneNumber = "341-678-9012",
                    Address = "Av. Rivadavia 91011, Rosario, Santa Fe, Argentina",
                    Dni = "22345678", 
                    DateOfBirth = new DateOnly(1992, 11, 30) 

                }
            };
        }

        private Admin[] CreateAdminDataSeed()
        {
            return new Admin[]
            {
                new Admin
                {
                    Id = 7,
                    Name = "David King",
                    Email = "david.king@club.com",
                    Password = "password123",
                    UserName = "admin_david",
                    PhoneNumber = "341-789-0123",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Admin
                {
                    Id = 8,
                    Name = "Laura Hill",
                    Email = "laura.hill@club.com",
                    Password = "password123",
                    UserName = "admin_laura",
                    PhoneNumber = "341-890-1234",
                    Address = "Av. Libertador 456, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Admin
                {
                    Id = 9,
                    Name = "Chris Baker",
                    Email = "chris.baker@club.com",
                    Password = "password123",
                    UserName = "admin_chris",
                    PhoneNumber = "341-901-2345",
                    Address = "Calle San Martin 789, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                }
            };
        }

        private Director[] CreateDirectorDataSeed()
        {
            return new Director[]
            {
                new Director
                {
                    Id = 10,
                    Name = "Facundo Gomez",
                    Email = "facundolgomez87@gmail.com",
                    Password = "password123",
                    UserName = "facu_gomez",
                    PhoneNumber = "341-012-3456",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Director
                {
                    Id = 11,
                    Name = "Manuel de Macedo",
                    Email = "manueldema6@gmail.com",
                    Password = "password123",
                    UserName = "manu_demacedo",
                    PhoneNumber = "341-135-2468",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Director
                {
                    Id = 12,
                    Name = "Aylen Guy",
                    Email = "ayluguy@gmail.com",
                    Password = "password123",
                    UserName = "aylu_guy",
                    PhoneNumber = "341-246-3579",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Director
                {
                    Id = 13,
                    Name = "Franco Callegari",
                    Email = "francocallegari12@gmail.com",
                    Password = "password123",
                    UserName = "fran_callegari",
                    PhoneNumber = "341-357-4680",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Director
                {
                    Id = 14,
                    Name = "Delfina Isaguirre",
                    Email = "delfiisaguirre26@gmail.com",
                    Password = "password123",
                    UserName = "delfi_isaguirre",
                    PhoneNumber = "341-468-5791",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                },
                new Director
                {
                    Id = 15,
                    Name = "Anabella Rustici",
                    Email = "anabellarustici@gmail.com",
                    Password = "password123",
                    UserName = "ana_rustici",
                    PhoneNumber = "341-579-6802",
                    Address = "Calle Principal 123, Ciudad",
                    Dni = "22345678",
                    DateOfBirth = new DateOnly(1990, 5, 15)
                }
            };
        }
        private object[] CreateMembersSportsAttendedDataSeed()
        {
            return new object[]
            {
                new
                {
                    MembersId = 4,
                    SportsAttendedId = 1,
                },
                new
                {
                    MembersId = 5,
                    SportsAttendedId = 1,
                },
                new
                {
                    MembersId = 6,
                    SportsAttendedId = 1,
                },
                new
                {
                    MembersId = 6,
                    SportsAttendedId = 2,
                }
            };
        }
    }
}
