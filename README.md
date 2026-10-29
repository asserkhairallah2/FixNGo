# FixNGo

ASP.NET Core 8 (MVC + SignalR) project, built with Clean Architecture:

| Project | Role |
|---|---|
| `FixNGo.Domain` | Entities, enums, business rules |
| `FixNGo.Application` | Services, DTOs, repository contracts |
| `FixNGo.Infrastructure` | EF Core, repositories, migrations, seeding |
| `FixNGo.Web` | MVC web app (controllers + Razor views) |
| `FixNGo.UnitTests` | xUnit tests |

## Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- Git
- SQL Server. The default connection string uses **SQL Server LocalDB** (Windows only, installed with Visual Studio).
  On Mac/Linux, use SQL Server in Docker and change the connection string (see below).

## Run from scratch (first time after `git clone`)

```bash
# 1. Clone and enter the project
git clone https://github.com/asserkhairallah2/FixNGo.git
cd FixNGo

# 2. Install the EF Core CLI tool (once per machine)
dotnet tool install --global dotnet-ef --version 8.*

# 3. Restore packages
dotnet restore

# 4. Build
dotnet build

# 5. Create / update the database (run BEFORE the first run of the app)
dotnet ef database update --project FixNGo.Infrastructure --startup-project FixNGo.Web

# 6. Run the web app
dotnet run --project FixNGo.Web
```

Open **https://localhost:60101** (or http://localhost:60102).
On first run the app seeds roles and an admin user: `admin@fixngo.com` / `Admin@123456` (development only).

> **Important:** run step 5 *before* the first launch. The seeder can create the schema by itself,
> which then conflicts with migrations (`already an object named ...`). If that happens, see Troubleshooting.

## After every `git pull`

```bash
git pull
dotnet restore
dotnet build
dotnet ef database update --project FixNGo.Infrastructure --startup-project FixNGo.Web
dotnet run --project FixNGo.Web
```

A new migration may have arrived, so always run `database update` after pulling.

## Run the tests

```bash
dotnet test
```

`EndToEndDbInitializerTests` needs SQL Server LocalDB (Windows). On other systems, skip it:

```bash
dotnet test --filter "FullyQualifiedName!~EndToEnd"
```

## Using a different SQL Server (Mac / Linux / Docker)

```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Your_password123" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

Do **not** edit `appsettings.json` (that would show up in git). Override the connection string locally instead:

```bash
cd FixNGo.Web
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost,1433;Database=FixNGo;User Id=sa;Password=Your_password123;TrustServerCertificate=True;MultipleActiveResultSets=true"
```

## Troubleshooting

| Problem | Fix |
|---|---|
| `dotnet ef` not found | `dotnet tool install --global dotnet-ef --version 8.*`, then reopen the terminal |
| `There is already an object named ... in the database` | Drop the local DB and recreate it: `dotnet ef database drop --force --project FixNGo.Infrastructure --startup-project FixNGo.Web`, then run step 5 again |
| Build errors right after a pull | `dotnet clean`, then `dotnet restore`, then `dotnet build` |
| Cannot connect to the database | Make sure LocalDB / SQL Server is running and the connection string is right |
| HTTPS certificate warning | `dotnet dev-certs https --trust` |

## Team workflow (so it works on every machine)

- Never push `bin/`, `obj/` or `.vs/` (already in `.gitignore`).
- Never push straight to `main`: create a branch, push, then open a Pull Request.
  ```bash
  git checkout -b feature/my-change
  git add .
  git commit -m "Describe the change"
  git push -u origin feature/my-change
  ```
- Run `dotnet build` and `dotnet test` before pushing.
- Keep local settings in `dotnet user-secrets`, not in `appsettings.json`.