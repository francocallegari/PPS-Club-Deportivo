using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FifthMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DNI",
                table: "Users",
                newName: "Dni");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Dni",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 7,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 8,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Av. Libertador 456, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 9,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle San Martin 789, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 11,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 12,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 13,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 14,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 15,
                columns: new[] { "Address", "DateOfBirth", "Dni" },
                values: new object[] { "Calle Principal 123, Ciudad", new DateOnly(1990, 5, 15), "22345678" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Dni",
                table: "Users",
                newName: "DNI");

            migrationBuilder.AlterColumn<string>(
                name: "DNI",
                table: "Users",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "Users",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateOnly),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Address",
                table: "Users",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
