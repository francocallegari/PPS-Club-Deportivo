using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class appcontext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberTrainingSession");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MemberTrainingSessions",
                table: "MemberTrainingSessions");

            migrationBuilder.DropIndex(
                name: "IX_MemberTrainingSessions_MemberId",
                table: "MemberTrainingSessions");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "MemberTrainingSessions",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddColumn<int>(
                name: "MembershipFeeId",
                table: "MemberTrainingSessions",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MemberTrainingSessions",
                table: "MemberTrainingSessions",
                columns: new[] { "MemberId", "TrainingSessionId" });

            migrationBuilder.CreateIndex(
                name: "IX_MemberTrainingSessions_MembershipFeeId",
                table: "MemberTrainingSessions",
                column: "MembershipFeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_MemberTrainingSessions_MembershipFees_MembershipFeeId",
                table: "MemberTrainingSessions",
                column: "MembershipFeeId",
                principalTable: "MembershipFees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MemberTrainingSessions_MembershipFees_MembershipFeeId",
                table: "MemberTrainingSessions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_MemberTrainingSessions",
                table: "MemberTrainingSessions");

            migrationBuilder.DropIndex(
                name: "IX_MemberTrainingSessions_MembershipFeeId",
                table: "MemberTrainingSessions");

            migrationBuilder.DropColumn(
                name: "MembershipFeeId",
                table: "MemberTrainingSessions");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "MemberTrainingSessions",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MemberTrainingSessions",
                table: "MemberTrainingSessions",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "MemberTrainingSession",
                columns: table => new
                {
                    MembersId = table.Column<int>(type: "INTEGER", nullable: false),
                    SessionsAttendedId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberTrainingSession", x => new { x.MembersId, x.SessionsAttendedId });
                    table.ForeignKey(
                        name: "FK_MemberTrainingSession_TrainingSessions_SessionsAttendedId",
                        column: x => x.SessionsAttendedId,
                        principalTable: "TrainingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberTrainingSession_Users_MembersId",
                        column: x => x.MembersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberTrainingSessions_MemberId",
                table: "MemberTrainingSessions",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberTrainingSession_SessionsAttendedId",
                table: "MemberTrainingSession",
                column: "SessionsAttendedId");
        }
    }
}
