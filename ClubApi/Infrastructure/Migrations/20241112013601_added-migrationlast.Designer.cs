﻿// <auto-generated />
using System;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20241112013601_added-migrationlast")]
    partial class addedmigrationlast
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.8");

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ApprovedBy")
                        .HasColumnType("TEXT");

                    b.Property<int>("Capacity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("CreatedBy")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("Domain.Entities.MembershipFee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("TEXT");

                    b.Property<float>("Price")
                        .HasColumnType("REAL");

                    b.HasKey("Id");

                    b.ToTable("MembershipFees");
                });

            modelBuilder.Entity("Domain.Entities.MembershipFeePayment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("FeeId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MemberId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("PaymentDate")
                        .HasColumnType("TEXT");

                    b.Property<float>("Price")
                        .HasColumnType("REAL");

                    b.Property<int>("Status")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("FeeId");

                    b.HasIndex("MemberId");

                    b.ToTable("MembershipFeePayments");
                });

            modelBuilder.Entity("Domain.Entities.News", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("PublicationDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("News");
                });

            modelBuilder.Entity("Domain.Entities.Sport", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Capacity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Sports");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Capacity = 60,
                            ImageURL = "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg",
                            Name = "Basquet"
                        },
                        new
                        {
                            Id = 2,
                            Capacity = 100,
                            ImageURL = "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg",
                            Name = "Futbol"
                        },
                        new
                        {
                            Id = 3,
                            Capacity = 60,
                            ImageURL = "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg",
                            Name = "Voley"
                        },
                        new
                        {
                            Id = 4,
                            Capacity = 40,
                            ImageURL = "https://deportivoromeral.cl/images/ramas/tenis2.jpg",
                            Name = "Tenis"
                        });
                });

            modelBuilder.Entity("Domain.Entities.SportsField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("SportId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("SportId");

                    b.ToTable("SportsFields");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Cancha de Basquet 1",
                            SportId = 1
                        },
                        new
                        {
                            Id = 2,
                            Name = "Cancha de Basquet 2",
                            SportId = 1
                        },
                        new
                        {
                            Id = 3,
                            Name = "Cancha de Tenis 1",
                            SportId = 4
                        },
                        new
                        {
                            Id = 4,
                            Name = "Cancha de Tenis 2",
                            SportId = 4
                        },
                        new
                        {
                            Id = 5,
                            Name = "Cancha de Tenis 3",
                            SportId = 4
                        },
                        new
                        {
                            Id = 6,
                            Name = "Cancha de Tenis 4",
                            SportId = 4
                        },
                        new
                        {
                            Id = 7,
                            Name = "Cancha de Futbol 1",
                            SportId = 2
                        },
                        new
                        {
                            Id = 8,
                            Name = "Cancha de Futbol 2",
                            SportId = 2
                        },
                        new
                        {
                            Id = 9,
                            Name = "Cancha de Voley 1",
                            SportId = 3
                        },
                        new
                        {
                            Id = 10,
                            Name = "Cancha de Voley 2",
                            SportId = 3
                        });
                });

            modelBuilder.Entity("Domain.Entities.TrainingSession", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CoachId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DaysOfWeek")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Duration")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SportId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SportsFieldId")
                        .HasColumnType("INTEGER");

                    b.Property<TimeOnly>("Time")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CoachId");

                    b.HasIndex("SportId");

                    b.HasIndex("SportsFieldId");

                    b.ToTable("TrainingSessions");
                });

            modelBuilder.Entity("Domain.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateOnly>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Dni")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("UserDeletionDate")
                        .HasColumnType("datetime");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<DateTime>("UserRegistrationDate")
                        .HasColumnType("datetime");

                    b.Property<string>("UserType")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("Id");

                    b.ToTable("Users");

                    b.HasDiscriminator<string>("UserType").HasValue("User");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("MemberSport", b =>
                {
                    b.Property<int>("MembersId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SportsAttendedId")
                        .HasColumnType("INTEGER");

                    b.HasKey("MembersId", "SportsAttendedId");

                    b.HasIndex("SportsAttendedId");

                    b.ToTable("MembersSportsAttended", (string)null);

                    b.HasData(
                        new
                        {
                            MembersId = 4,
                            SportsAttendedId = 1
                        },
                        new
                        {
                            MembersId = 5,
                            SportsAttendedId = 1
                        },
                        new
                        {
                            MembersId = 6,
                            SportsAttendedId = 1
                        },
                        new
                        {
                            MembersId = 6,
                            SportsAttendedId = 2
                        });
                });

            modelBuilder.Entity("MemberTrainingSession", b =>
                {
                    b.Property<int>("MembersId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SessionsAttendedId")
                        .HasColumnType("INTEGER");

                    b.HasKey("MembersId", "SessionsAttendedId");

                    b.HasIndex("SessionsAttendedId");

                    b.ToTable("MemberTrainingSession");
                });

            modelBuilder.Entity("Domain.Entities.Admin", b =>
                {
                    b.HasBaseType("Domain.Entities.User");

                    b.HasDiscriminator().HasValue("Admin");

                    b.HasData(
                        new
                        {
                            Id = 7,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "david.king@club.com",
                            Name = "David King",
                            Password = "password123",
                            PhoneNumber = "341-789-0123",
                            UserName = "admin_david",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 8,
                            Address = "Av. Libertador 456, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "laura.hill@club.com",
                            Name = "Laura Hill",
                            Password = "password123",
                            PhoneNumber = "341-890-1234",
                            UserName = "admin_laura",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 9,
                            Address = "Calle San Martin 789, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "chris.baker@club.com",
                            Name = "Chris Baker",
                            Password = "password123",
                            PhoneNumber = "341-901-2345",
                            UserName = "admin_chris",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Domain.Entities.Coach", b =>
                {
                    b.HasBaseType("Domain.Entities.User");

                    b.Property<int>("SportId")
                        .HasColumnType("INTEGER");

                    b.HasIndex("SportId");

                    b.HasDiscriminator().HasValue("Coach");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "john.smith@club.com",
                            Name = "John Smith",
                            Password = "password123",
                            PhoneNumber = "341-123-4567",
                            UserName = "coach_john",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            SportId = 1
                        },
                        new
                        {
                            Id = 2,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "susan.green@club.com",
                            Name = "Susan Green",
                            Password = "password123",
                            PhoneNumber = "341-234-5678",
                            UserName = "coach_susan",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            SportId = 2
                        },
                        new
                        {
                            Id = 3,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "mike.johnson@club.com",
                            Name = "Mike Johnson",
                            Password = "password123",
                            PhoneNumber = "341-345-6789",
                            UserName = "coach_mike",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            SportId = 3
                        });
                });

            modelBuilder.Entity("Domain.Entities.Director", b =>
                {
                    b.HasBaseType("Domain.Entities.User");

                    b.HasDiscriminator().HasValue("Director");

                    b.HasData(
                        new
                        {
                            Id = 10,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "facundolgomez87@gmail.com",
                            Name = "Facundo Gomez",
                            Password = "password123",
                            PhoneNumber = "341-012-3456",
                            UserName = "facu_gomez",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 11,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "manueldema6@gmail.com",
                            Name = "Manuel de Macedo",
                            Password = "password123",
                            PhoneNumber = "341-135-2468",
                            UserName = "manu_demacedo",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 12,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "ayluguy@gmail.com",
                            Name = "Aylen Guy",
                            Password = "password123",
                            PhoneNumber = "341-246-3579",
                            UserName = "aylu_guy",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 13,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "francocallegari12@gmail.com",
                            Name = "Franco Callegari",
                            Password = "password123",
                            PhoneNumber = "341-357-4680",
                            UserName = "fran_callegari",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 14,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "delfiisaguirre26@gmail.com",
                            Name = "Delfina Isaguirre",
                            Password = "password123",
                            PhoneNumber = "341-468-5791",
                            UserName = "delfi_isaguirre",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 15,
                            Address = "Calle Principal 123, Ciudad",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "22345678",
                            Email = "anabellarustici@gmail.com",
                            Name = "Anabella Rustici",
                            Password = "password123",
                            PhoneNumber = "341-579-6802",
                            UserName = "ana_rustici",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Domain.Entities.Member", b =>
                {
                    b.HasBaseType("Domain.Entities.User");

                    b.Property<int?>("EventId")
                        .HasColumnType("INTEGER");

                    b.HasIndex("EventId");

                    b.HasDiscriminator().HasValue("Member");

                    b.HasData(
                        new
                        {
                            Id = 4,
                            Address = "Av. Pellegrini 1234, Rosario, Santa Fe, Argentina",
                            DateOfBirth = new DateOnly(1990, 5, 15),
                            Dni = "20123456",
                            Email = "emily.davis@club.com",
                            Name = "Emily Davis",
                            Password = "password123",
                            PhoneNumber = "341-456-7890",
                            UserName = "member_emily",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 5,
                            Address = "Calle Santa Fe 5678, Rosario, Santa Fe, Argentina",
                            DateOfBirth = new DateOnly(1985, 3, 22),
                            Dni = "21234567",
                            Email = "tom.brown@club.com",
                            Name = "Tom Brown",
                            Password = "password123",
                            PhoneNumber = "341-567-8901",
                            UserName = "member_tom",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 6,
                            Address = "Av. Rivadavia 91011, Rosario, Santa Fe, Argentina",
                            DateOfBirth = new DateOnly(1992, 11, 30),
                            Dni = "22345678",
                            Email = "anna.white@club.com",
                            Name = "Anna White",
                            Password = "password123",
                            PhoneNumber = "341-678-9012",
                            UserName = "member_anna",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        });
                });

            modelBuilder.Entity("Domain.Entities.MembershipFeePayment", b =>
                {
                    b.HasOne("Domain.Entities.MembershipFee", "Fee")
                        .WithMany()
                        .HasForeignKey("FeeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Member", "Member")
                        .WithMany()
                        .HasForeignKey("MemberId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Fee");

                    b.Navigation("Member");
                });

            modelBuilder.Entity("Domain.Entities.SportsField", b =>
                {
                    b.HasOne("Domain.Entities.Sport", "Sport")
                        .WithMany()
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sport");
                });

            modelBuilder.Entity("Domain.Entities.TrainingSession", b =>
                {
                    b.HasOne("Domain.Entities.Coach", "Coach")
                        .WithMany()
                        .HasForeignKey("CoachId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Sport", "Sport")
                        .WithMany()
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.SportsField", "Field")
                        .WithMany()
                        .HasForeignKey("SportsFieldId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Coach");

                    b.Navigation("Field");

                    b.Navigation("Sport");
                });

            modelBuilder.Entity("MemberSport", b =>
                {
                    b.HasOne("Domain.Entities.Member", null)
                        .WithMany()
                        .HasForeignKey("MembersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Sport", null)
                        .WithMany()
                        .HasForeignKey("SportsAttendedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MemberTrainingSession", b =>
                {
                    b.HasOne("Domain.Entities.Member", null)
                        .WithMany()
                        .HasForeignKey("MembersId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.TrainingSession", null)
                        .WithMany()
                        .HasForeignKey("SessionsAttendedId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.Coach", b =>
                {
                    b.HasOne("Domain.Entities.Sport", "SportAssigned")
                        .WithMany()
                        .HasForeignKey("SportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("SportAssigned");
                });

            modelBuilder.Entity("Domain.Entities.Member", b =>
                {
                    b.HasOne("Domain.Entities.Event", null)
                        .WithMany("Members")
                        .HasForeignKey("EventId");
                });

            modelBuilder.Entity("Domain.Entities.Event", b =>
                {
                    b.Navigation("Members");
                });
#pragma warning restore 612, 618
        }
    }
}
