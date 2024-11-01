using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FourthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Available",
                table: "SportsFields");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "TrainingSessions",
                newName: "Time");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DNI",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "DateOfBirth",
                table: "Users",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "Duration",
                table: "TrainingSessions",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "DaysOfWeek",
                table: "TrainingSessions",
                type: "TEXT",
                nullable: false,
                defaultValue: "[]");

            migrationBuilder.AddColumn<string>(
                name: "ImageURL",
                table: "Sports",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 1,
                column: "ImageURL",
                value: "http://webipedia.es/wp-content/uploads/2020/11/06_PelotaEntrandoACanasta.jpg");

            migrationBuilder.UpdateData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 2,
                column: "ImageURL",
                value: "https://www.timbo.sc.gov.br/wp-content/uploads/2018/11/futsal-divulgacao.jpg");

            migrationBuilder.UpdateData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 3,
                column: "ImageURL",
                value: "https://1.bp.blogspot.com/-F0PamBjTPXY/UZtg4uUZG3I/AAAAAAAACRI/6QIdNWnUeuA/s1600/Annerys-Victoria-Vargas-Valdez-Volleyball-London-2012-Olympics.jpg");

            migrationBuilder.UpdateData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 4,
                column: "ImageURL",
                value: "https://deportivoromeral.cl/images/ramas/tenis2.jpg");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "PhoneNumber",
                value: "341-123-4567");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "PhoneNumber",
                value: "341-234-5678");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "PhoneNumber",
                value: "341-345-6789");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Address", "DNI", "DateOfBirth", "PhoneNumber" },
                values: new object[] { "Av. Pellegrini 1234, Rosario, Santa Fe, Argentina", "20123456", new DateOnly(1990, 5, 15), "341-456-7890" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Address", "DNI", "DateOfBirth", "PhoneNumber" },
                values: new object[] { "Calle Santa Fe 5678, Rosario, Santa Fe, Argentina", "21234567", new DateOnly(1985, 3, 22), "341-567-8901" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Address", "DNI", "DateOfBirth", "PhoneNumber" },
                values: new object[] { "Av. Rivadavia 91011, Rosario, Santa Fe, Argentina", "22345678", new DateOnly(1992, 11, 30), "341-678-9012" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                column: "PhoneNumber",
                value: "341-789-0123");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                column: "PhoneNumber",
                value: "341-890-1234");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                column: "PhoneNumber",
                value: "341-901-2345");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                column: "PhoneNumber",
                value: "341-012-3456");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11,
                column: "PhoneNumber",
                value: "341-135-2468");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12,
                column: "PhoneNumber",
                value: "341-246-3579");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13,
                column: "PhoneNumber",
                value: "341-357-4680");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14,
                column: "PhoneNumber",
                value: "341-468-5791");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15,
                column: "PhoneNumber",
                value: "341-579-6802");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DNI",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DaysOfWeek",
                table: "TrainingSessions");

            migrationBuilder.DropColumn(
                name: "ImageURL",
                table: "Sports");

            migrationBuilder.RenameColumn(
                name: "Time",
                table: "TrainingSessions",
                newName: "Date");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Duration",
                table: "TrainingSessions",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<bool>(
                name: "Available",
                table: "SportsFields",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 1,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 2,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 3,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 4,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 5,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 6,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 7,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 8,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 9,
                column: "Available",
                value: false);

            migrationBuilder.UpdateData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 10,
                column: "Available",
                value: false);
        }
    }
}
