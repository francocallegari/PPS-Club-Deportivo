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
    [Migration("20240930203827_ThirdMigration")]
    partial class ThirdMigration
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

                    b.Property<DateTime>("PaymentDate")
                        .HasColumnType("TEXT");

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
                            Name = "Basquet"
                        },
                        new
                        {
                            Id = 2,
                            Capacity = 100,
                            Name = "Futbol"
                        },
                        new
                        {
                            Id = 3,
                            Capacity = 60,
                            Name = "Voley"
                        },
                        new
                        {
                            Id = 4,
                            Capacity = 40,
                            Name = "Tenis"
                        });
                });

            modelBuilder.Entity("Domain.Entities.SportsField", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Available")
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
                            Available = false,
                            Name = "Cancha de Basquet 1",
                            SportId = 1
                        },
                        new
                        {
                            Id = 2,
                            Available = false,
                            Name = "Cancha de Basquet 2",
                            SportId = 1
                        },
                        new
                        {
                            Id = 3,
                            Available = false,
                            Name = "Cancha de Tenis 1",
                            SportId = 4
                        },
                        new
                        {
                            Id = 4,
                            Available = false,
                            Name = "Cancha de Tenis 2",
                            SportId = 4
                        },
                        new
                        {
                            Id = 5,
                            Available = false,
                            Name = "Cancha de Tenis 3",
                            SportId = 4
                        },
                        new
                        {
                            Id = 6,
                            Available = false,
                            Name = "Cancha de Tenis 4",
                            SportId = 4
                        },
                        new
                        {
                            Id = 7,
                            Available = false,
                            Name = "Cancha de Futbol 1",
                            SportId = 2
                        },
                        new
                        {
                            Id = 8,
                            Available = false,
                            Name = "Cancha de Futbol 2",
                            SportId = 2
                        },
                        new
                        {
                            Id = 9,
                            Available = false,
                            Name = "Cancha de Voley 1",
                            SportId = 3
                        },
                        new
                        {
                            Id = 10,
                            Available = false,
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

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("TEXT");

                    b.Property<int>("SportId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SportsFieldId")
                        .HasColumnType("INTEGER");

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

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(64)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(128)");

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

            modelBuilder.Entity("Domain.Entities.Admin", b =>
                {
                    b.HasBaseType("Domain.Entities.User");

                    b.HasDiscriminator().HasValue("Admin");

                    b.HasData(
                        new
                        {
                            Id = 7,
                            Email = "david.king@club.com",
                            Name = "David King",
                            Password = "password123",
                            UserName = "admin_david",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 8,
                            Email = "laura.hill@club.com",
                            Name = "Laura Hill",
                            Password = "password123",
                            UserName = "admin_laura",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 9,
                            Email = "chris.baker@club.com",
                            Name = "Chris Baker",
                            Password = "password123",
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
                            Email = "john.smith@club.com",
                            Name = "John Smith",
                            Password = "password123",
                            UserName = "coach_john",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            SportId = 1
                        },
                        new
                        {
                            Id = 2,
                            Email = "susan.green@club.com",
                            Name = "Susan Green",
                            Password = "password123",
                            UserName = "coach_susan",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            SportId = 2
                        },
                        new
                        {
                            Id = 3,
                            Email = "mike.johnson@club.com",
                            Name = "Mike Johnson",
                            Password = "password123",
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
                            Email = "facundolgomez87@gmail.com",
                            Name = "Facundo Gomez",
                            Password = "password123",
                            UserName = "facu_gomez",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 11,
                            Email = "manueldema6@gmail.com",
                            Name = "Manuel de Macedo",
                            Password = "password123",
                            UserName = "manu_demacedo",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 12,
                            Email = "ayluguy@gmail.com",
                            Name = "Aylen Guy",
                            Password = "password123",
                            UserName = "aylu_guy",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 13,
                            Email = "francocallegari12@gmail.com",
                            Name = "Franco Callegari",
                            Password = "password123",
                            UserName = "fran_callegari",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 14,
                            Email = "delfiisaguirre26@gmail.com",
                            Name = "Delfina Isaguirre",
                            Password = "password123",
                            UserName = "delfi_isaguirre",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 15,
                            Email = "anabellarustici@gmail.com",
                            Name = "Anabella Rustici",
                            Password = "password123",
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
                            Email = "emily.davis@club.com",
                            Name = "Emily Davis",
                            Password = "password123",
                            UserName = "member_emily",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 5,
                            Email = "tom.brown@club.com",
                            Name = "Tom Brown",
                            Password = "password123",
                            UserName = "member_tom",
                            UserRegistrationDate = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified)
                        },
                        new
                        {
                            Id = 6,
                            Email = "anna.white@club.com",
                            Name = "Anna White",
                            Password = "password123",
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
