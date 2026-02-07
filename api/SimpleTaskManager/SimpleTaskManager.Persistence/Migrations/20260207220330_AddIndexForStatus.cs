using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SimpleTaskManager.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexForStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Tasks_Status",
                table: "Tasks",
                column: "Status");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Tasks_Status",
                table: "Tasks");
        }
    }
}
