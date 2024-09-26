using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SecondMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSessions_SportsFields_FieldId",
                table: "TrainingSessions");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "MembershipFees");

            migrationBuilder.RenameColumn(
                name: "FieldId",
                table: "TrainingSessions",
                newName: "SportsFieldId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingSessions_FieldId",
                table: "TrainingSessions",
                newName: "IX_TrainingSessions_SportsFieldId");

            migrationBuilder.AddColumn<int>(
                name: "SportId",
                table: "Users",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ApprovedBy",
                table: "Events",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Events",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "MembershipFeePayments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    FeeId = table.Column<int>(type: "INTEGER", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    PaymentDate = table.Column<DateTime>(type: "TEXT", nullable: false)
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

            migrationBuilder.InsertData(
                table: "Sports",
                columns: new[] { "Id", "Capacity", "Name" },
                values: new object[,]
                {
                    { 1, 60, "Basquet" },
                    { 2, 100, "Futbol" },
                    { 3, 60, "Voley" },
                    { 4, 40, "Tenis" }
                });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "SportId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "SportId",
                value: 2);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "SportId",
                value: 3);

            migrationBuilder.InsertData(
                table: "SportsFields",
                columns: new[] { "Id", "Available", "Name", "SportId" },
                values: new object[,]
                {
                    { 1, false, "Cancha de Basquet 1", 1 },
                    { 2, false, "Cancha de Basquet 2", 1 },
                    { 3, false, "Cancha de Tenis 1", 4 },
                    { 4, false, "Cancha de Tenis 2", 4 },
                    { 5, false, "Cancha de Tenis 3", 4 },
                    { 6, false, "Cancha de Tenis 4", 4 },
                    { 7, false, "Cancha de Futbol 1", 2 },
                    { 8, false, "Cancha de Futbol 2", 2 },
                    { 9, false, "Cancha de Voley 1", 3 },
                    { 10, false, "Cancha de Voley 2", 3 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SportId",
                table: "Users",
                column: "SportId");

            migrationBuilder.CreateIndex(
                name: "IX_MembershipFeePayments_FeeId",
                table: "MembershipFeePayments",
                column: "FeeId");

            migrationBuilder.CreateIndex(
                name: "IX_MembershipFeePayments_MemberId",
                table: "MembershipFeePayments",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSessions_SportsFields_SportsFieldId",
                table: "TrainingSessions",
                column: "SportsFieldId",
                principalTable: "SportsFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Sports_SportId",
                table: "Users",
                column: "SportId",
                principalTable: "Sports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrainingSessions_SportsFields_SportsFieldId",
                table: "TrainingSessions");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Sports_SportId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "MembershipFeePayments");

            migrationBuilder.DropIndex(
                name: "IX_Users_SportId",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "SportsFields",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Sports",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DropColumn(
                name: "SportId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ApprovedBy",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "SportsFieldId",
                table: "TrainingSessions",
                newName: "FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_TrainingSessions_SportsFieldId",
                table: "TrainingSessions",
                newName: "IX_TrainingSessions_FieldId");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "MembershipFees",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingSessions_SportsFields_FieldId",
                table: "TrainingSessions",
                column: "FieldId",
                principalTable: "SportsFields",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
