using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MemberTrainingSesson : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MemberTrainingSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MemberId = table.Column<int>(type: "INTEGER", nullable: false),
                    TrainingSessionId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemberTrainingSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MemberTrainingSessions_TrainingSessions_TrainingSessionId",
                        column: x => x.TrainingSessionId,
                        principalTable: "TrainingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MemberTrainingSessions_Users_MemberId",
                        column: x => x.MemberId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MemberTrainingSessions_MemberId",
                table: "MemberTrainingSessions",
                column: "MemberId");

            migrationBuilder.CreateIndex(
                name: "IX_MemberTrainingSessions_TrainingSessionId",
                table: "MemberTrainingSessions",
                column: "TrainingSessionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MemberTrainingSessions");
        }
    }
}
