using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FixNGo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProviderAndAssistanceRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProviderProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    PrimaryServiceType = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    IsOnline = table.Column<bool>(type: "bit", nullable: false),
                    VerificationStatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Rating = table.Column<decimal>(type: "decimal(3,2)", precision: 3, scale: 2, nullable: false, defaultValue: 5.00m),
                    TotalReviews = table.Column<int>(type: "int", nullable: false),
                    CompletedJobsCount = table.Column<int>(type: "int", nullable: false),
                    NationalId = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DriverLicenseNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    VehiclePlateNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    City = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    Bio = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CurrentLatitude = table.Column<double>(type: "float", nullable: true),
                    CurrentLongitude = table.Column<double>(type: "float", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProviderProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProviderProfiles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AssistanceRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CustomerPhone = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    ProviderId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    ServiceType = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ProblemDescription = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(25)", maxLength: 25, nullable: false),
                    CustomerAddress = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    CustomerLatitude = table.Column<double>(type: "float", nullable: false),
                    CustomerLongitude = table.Column<double>(type: "float", nullable: false),
                    ProviderLatitude = table.Column<double>(type: "float", nullable: true),
                    ProviderLongitude = table.Column<double>(type: "float", nullable: true),
                    EstimatedFare = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    FinalFare = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    VehicleInfo = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    VehiclePlateNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsP0Emergency = table.Column<bool>(type: "bit", nullable: false),
                    RejectionReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    CancellationReason = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    AcceptedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EnRouteAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ArrivedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    InServiceAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CompletedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CancelledAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Rating = table.Column<int>(type: "int", nullable: true),
                    ReviewText = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PaymentMethod = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    PaidAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    DeletedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssistanceRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AssistanceRequests_AspNetUsers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AssistanceRequests_AspNetUsers_ProviderId",
                        column: x => x.ProviderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssistanceRequests_CustomerId",
                table: "AssistanceRequests",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_AssistanceRequests_CustomerId_Status",
                table: "AssistanceRequests",
                columns: new[] { "CustomerId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AssistanceRequests_ProviderId",
                table: "AssistanceRequests",
                column: "ProviderId");

            migrationBuilder.CreateIndex(
                name: "IX_AssistanceRequests_ProviderId_Status",
                table: "AssistanceRequests",
                columns: new[] { "ProviderId", "Status" });

            migrationBuilder.CreateIndex(
                name: "IX_AssistanceRequests_Status",
                table: "AssistanceRequests",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_ProviderProfiles_IsOnline_VerificationStatus",
                table: "ProviderProfiles",
                columns: new[] { "IsOnline", "VerificationStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_ProviderProfiles_UserId",
                table: "ProviderProfiles",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssistanceRequests");

            migrationBuilder.DropTable(
                name: "ProviderProfiles");
        }
    }
}
