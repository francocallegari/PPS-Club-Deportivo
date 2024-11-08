using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class NewMigration : Migration
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
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedBy = table.Column<string>(type: "TEXT", nullable: false),
                    ApprovedBy = table.Column<string>(type: "TEXT", nullable: true)
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
                    ExpirationDate = table.Column<DateTime>(type: "TEXT", nullable: false)
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
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageURL = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sports", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SportsFields",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
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
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Dni = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    SportId = table.Column<int>(type: "INTEGER", nullable: true),
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
                    table.ForeignKey(
                        name: "FK_Users_Sports_SportId",
                        column: x => x.SportId,
                        principalTable: "Sports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MembershipFeePayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    FeeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Price = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MembershipFeePayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MembershipFeePayments_MembershipFees_FeeId",
                        column: x => x.FeeId,
                        principalTable: "MembershipFees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MembershipFeePayments_Users_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Users",
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
                    Time = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Duration = table.Column<int>(type: "INTEGER", nullable: false),
                    SportsFieldId = table.Column<int>(type: "INTEGER", nullable: false),
                    CoachId = table.Column<int>(type: "INTEGER", nullable: false),
                    SportId = table.Column<int>(type: "INTEGER", nullable: false),
                    DaysOfWeek = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingSessions_SportsFields_SportsFieldId",
                        column: x => x.SportsFieldId,
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
                table: "Sports",
                columns: new[] { "Id", "Capacity", "ImageURL", "Name" },
                values: new object[,]
                {
                    { 1, 60, "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg", "Basquet" },
                    { 2, 100, "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg", "Futbol" },
                    { 3, 60, "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg", "Voley" },
                    { 4, 40, "https://deportivoromeral.cl/images/ramas/tenis2.jpg", "Tenis" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "DateOfBirth", "Dni", "Email", "EventId", "Name", "Password", "PhoneNumber", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 4, "Av. Pellegrini 1234, Rosario, Santa Fe, Argentina", new DateOnly(1990, 5, 15), "20123456", "emily.davis@club.com", null, "Emily Davis", "password123", "341-456-7890", null, "member_emily", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" },
                    { 5, "Calle Santa Fe 5678, Rosario, Santa Fe, Argentina", new DateOnly(1985, 3, 22), "21234567", "tom.brown@club.com", null, "Tom Brown", "password123", "341-567-8901", null, "member_tom", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" },
                    { 6, "Av. Rivadavia 91011, Rosario, Santa Fe, Argentina", new DateOnly(1992, 11, 30), "22345678", "anna.white@club.com", null, "Anna White", "password123", "341-678-9012", null, "member_anna", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Member" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "DateOfBirth", "Dni", "Email", "Name", "Password", "PhoneNumber", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 7, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "david.king@club.com", "David King", "password123", "341-789-0123", null, "admin_david", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 8, "Av. Libertador 456, Ciudad", new DateOnly(1990, 5, 15), "22345678", "laura.hill@club.com", "Laura Hill", "password123", "341-890-1234", null, "admin_laura", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 9, "Calle San Martin 789, Ciudad", new DateOnly(1990, 5, 15), "22345678", "chris.baker@club.com", "Chris Baker", "password123", "341-901-2345", null, "admin_chris", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Admin" },
                    { 10, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "facundolgomez87@gmail.com", "Facundo Gomez", "password123", "341-012-3456", null, "facu_gomez", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 11, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "manueldema6@gmail.com", "Manuel de Macedo", "password123", "341-135-2468", null, "manu_demacedo", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 12, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "ayluguy@gmail.com", "Aylen Guy", "password123", "341-246-3579", null, "aylu_guy", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 13, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "francocallegari12@gmail.com", "Franco Callegari", "password123", "341-357-4680", null, "fran_callegari", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 14, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "delfiisaguirre26@gmail.com", "Delfina Isaguirre", "password123", "341-468-5791", null, "delfi_isaguirre", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" },
                    { 15, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "anabellarustici@gmail.com", "Anabella Rustici", "password123", "341-579-6802", null, "ana_rustici", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Director" }
                });

            migrationBuilder.InsertData(
                table: "MembersSportsAttended",
                columns: new[] { "MembersId", "SportsAttendedId" },
                values: new object[,]
                {
                    { 4, 1 },
                    { 5, 1 },
                    { 6, 1 },
                    { 6, 2 }
                });

            migrationBuilder.InsertData(
                table: "SportsFields",
                columns: new[] { "Id", "Name", "SportId" },
                values: new object[,]
                {
                    { 1, "Cancha de Basquet 1", 1 },
                    { 2, "Cancha de Basquet 2", 1 },
                    { 3, "Cancha de Tenis 1", 4 },
                    { 4, "Cancha de Tenis 2", 4 },
                    { 5, "Cancha de Tenis 3", 4 },
                    { 6, "Cancha de Tenis 4", 4 },
                    { 7, "Cancha de Futbol 1", 2 },
                    { 8, "Cancha de Futbol 2", 2 },
                    { 9, "Cancha de Voley 1", 3 },
                    { 10, "Cancha de Voley 2", 3 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "DateOfBirth", "Dni", "Email", "Name", "Password", "PhoneNumber", "SportId", "UserDeletionDate", "UserName", "UserRegistrationDate", "UserType" },
                values: new object[,]
                {
                    { 1, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "john.smith@club.com", "John Smith", "password123", "341-123-4567", 1, null, "coach_john", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" },
                    { 2, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "susan.green@club.com", "Susan Green", "password123", "341-234-5678", 2, null, "coach_susan", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" },
                    { 3, "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678", "mike.johnson@club.com", "Mike Johnson", "password123", "341-345-6789", 3, null, "coach_mike", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Coach" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_MembershipFeePayments_FeeId",
                table: "MembershipFeePayments",
                column: "FeeId");

            migrationBuilder.CreateIndex(
                name: "IX_MembershipFeePayments_MemberId",
                table: "MembershipFeePayments",
                column: "MemberId");

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
                name: "IX_TrainingSessions_SportId",
                table: "TrainingSessions",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingSessions_SportsFieldId",
                table: "TrainingSessions",
                column: "SportsFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_EventId",
                table: "Users",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_SportId",
                table: "Users",
                column: "SportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MembershipFeePayments");

            migrationBuilder.DropTable(
                name: "MembersSportsAttended");

            migrationBuilder.DropTable(
                name: "News");

            migrationBuilder.DropTable(
                name: "TrainingSessions");

            migrationBuilder.DropTable(
                name: "MembershipFees");

            migrationBuilder.DropTable(
                name: "SportsFields");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Sports");
        }
    }
}
