using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MembershipFees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<float>(type: "REAL", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipFees", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "News",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    PublicationDate = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_News", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sports",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "nvarchar(64)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(128)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(128)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(128)", nullable: false),
                    UserType = table.Column<string>(type: "nvarchar(20)", maxLength: 8, nullable: false),
                    UserRegistrationDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    UserDeletionDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    EventId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SportsFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Available = table.Column<bool>(type: "INTEGER", nullable: false),
                    SportId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SportsFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SportsFields_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MembersSportsAttended",
                columns: table => new
                {
                    MembersId = table.Column<int>(type: "INTEGER", nullable: false),
                    SportsAttendedId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembersSportsAttended", x => new { x.MembersId, x.SportsAttendedId });
                    table.ForeignKey(
                        name: "FK_MembersSportsAttended_Sports_SportsAttendedId",
                        column: x => x.SportsAttendedId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MembersSportsAttended_Users_MembersId",
                        column: x => x.MembersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TrainingSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    FieldId = table.Column<int>(type: "INTEGER", nullable: false),
                    CoachId = table.Column<int>(type: "INTEGER", nullable: false),
                    SportId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_SportsFields_FieldId",
                        column: x => x.FieldId,
                        principalTable: "SportsFields",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_Users_CoachId",
                        column: x => x.CoachId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 1, "john.smith@club.com", "John Smith", "password123", null, "coach_john", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" },
                    { 2, "susan.green@club.com", "Susan Green", "password123", null, "coach_susan", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" },
                    { 3, "mike.johnson@club.com", "Mike Johnson", "password123", null, "coach_mike", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "EventId", "Name", "Password", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 4, "emily.davis@club.com", null, "Emily Davis", "password123", null, "member_emily", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" },
                    { 5, "tom.brown@club.com", null, "Tom Brown", "password123", null, "member_tom", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" },
                    { 6, "anna.white@club.com", null, "Anna White", "password123", null, "member_anna", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 7, "david.king@club.com", "David King", "password123", null, "admin_david", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 8, "laura.hill@club.com", "Laura Hill", "password123", null, "admin_laura", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 9, "chris.baker@club.com", "Chris Baker", "password123", null, "admin_chris", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 10, "facundolgomez87@gmail.com", "Facundo Gomez", "password123", null, "facu_gomez", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 11, "manueldema6@gmail.com", "Manuel de Macedo", "password123", null, "manu_demacedo", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 12, "ayluguy@gmail.com", "Aylen Guy", "password123", null, "aylu_guy", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 13, "francocallegari12@gmail.com", "Franco Callegari", "password123", null, "fran_callegari", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 14, "delfiisaguirre26@gmail.com", "Delfina Isaguirre", "password123", null, "delfi_isaguirre", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 15, "anabellarustici@gmail.com", "Anabella Rustici", "password123", null, "ana_rustici", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MembersSportsAttended_SportsAttendedId",
                table: "MembersSportsAttended",
                column: "SportsAttendedId");

            migrationBuilder.CreateIndex(
                name: "IX_SportsFields_SportId",
                table: "SportsFields",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_CoachId",
                table: "TrainingSessions",
                column: "CoachId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_FieldId",
                table: "TrainingSessions",
                column: "FieldId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_SportId",
                table: "TrainingSessions",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EventId",
                table: "Users",
                column: "EventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MembershipFees");

            migrationBuilder.DropTable(
                name: "MembersSportsAttended");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "TrainingSessions");

            migrationBuilder.DropTable(
                name: "SportsFields");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Sports");

            migrationBuilder.DropTable(
                name: "Events");
        }
    }
}
