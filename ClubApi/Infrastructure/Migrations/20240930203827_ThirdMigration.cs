using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ThirdMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "MembersSportsAttended",
                keyColumns: new[] { "MembersId", "SportsAttendedId" },
                keyValues: new object[] { 4, 1 });

            migrationBuilder.DeleteData(
                table: "MembersSportsAttended",
                keyColumns: new[] { "MembersId", "SportsAttendedId" },
                keyValues: new object[] { 5, 1 });

            migrationBuilder.DeleteData(
                table: "MembersSportsAttended",
                keyColumns: new[] { "MembersId", "SportsAttendedId" },
                keyValues: new object[] { 6, 1 });

            migrationBuilder.DeleteData(
                table: "MembersSportsAttended",
                keyColumns: new[] { "MembersId", "SportsAttendedId" },
                keyValues: new object[] { 6, 2 });
        }
    }
}
