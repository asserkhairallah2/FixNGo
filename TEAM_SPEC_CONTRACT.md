# FixNGo — Team Specification Contract & Architecture Blueprint
> **Version:** 1.0.0  
> **Target Delivery:** Current Milestone  
> **Status:** Active Project Living Contract (`TEAM_SPEC_CONTRACT.md`)  
> **Document Role:** Binding team contract for shared standards, business cycles, API routing, and AI workflows.

---

## 1. Project Overview & Architectural Boundaries

FixNGo is an integrated automotive care and emergency roadside dispatch platform connecting vehicle owners (**Clients**), automotive service providers (**Mechanics, Tow Trucks, and Service Centers**), and platform operators (**Admins**).

### Architecture Pattern: Clean / Onion Architecture
To ensure complete separation of concerns and maintainability across team members, the solution is organized into distinct layers:
```
FixNGo.sln
 ├── FixNGo.Domain             (Enterprise Entities, Value Objects, Domain Enums)
 ├── FixNGo.Application        (CQRS/Use Cases, Interfaces, DTOs, AutoMapper, FluentValidation)
 ├── FixNGo.Infrastructure     (EF Core AppDbContext, IEntityTypeConfiguration, Identity, Seed Data)
 ├── FixNGo.Web                (ASP.NET Core MVC, ViewModels, Controllers, Views, Tag Helpers)
 └── FixNGo.UnitTests          (Automated Domain & Application Test Suite)
```

---

## 2. The Three Core Business Cycles (Happy Path + Validation)

### 2.1 Provider Cycle (مقدم الخدمة)
1. **Auto Service Centers:**
   - **Dashboard & Profile:** Manage center name, address, coordinates, operating hours, and compliance documents.
   - **Service Catalog & Pricing:** Dynamic management of services offered (Oil Change, Brake Inspection, Diagnostics) with price tags.
   - **Real-time Bookings:** Receive client bookings, confirm appointments, and mark them completed.
2. **Roadside Mechanics:**
   - **Online/Offline Dispatch Toggle:** Switch availability to accept nearby emergency tickets.
   - **Mission Progression:** Accept request ➔ En Route ➔ Arrived at Scene ➔ In Service ➔ Complete.
   - **Profile & Equipment Validation:** Update bio, trade licenses, national ID, and specialty.
3. **Winch / Tow Trucks:**
   - **Tow Dispatch Workflow:** View tow requests with breakdown location, destination workshop, vehicle plate, and payload tonnage.
   - **Trip Stages:** `Accepted` ➔ `EnRouteToPickup` ➔ `ArrivedAtPickup` ➔ `LoadingAndTowing` ➔ `Completed`.
   - **Tow Truck Specifications:** Enforce validation on load capacity (0.5 to 50 Tons), truck make/model, and plate number.

### 2.2 End User / Client Cycle (المستخدم النهائي)
1. **Service Center Discovery:**
   - Browse certified centers with **Search by name/city**, **City Filter (Cairo, Giza, Alexandria)**, and **Multi-field Sorting (Name, Rating, Reviews)**.
   - Server-side **Pagination** to navigate large catalogs efficiently.
2. **Service Booking:**
   - Client selects service center and desired service.
   - Client specifies date, time, vehicle notes, and agreed price.
3. **Booking Lifecycle & Status Tracking:**
   - Real-time status visibility: `Pending` ➔ `Confirmed` ➔ `Completed` (or `Rejected` / `Cancelled`).

### 2.3 Platform Administrator Cycle (المدير والمشرف)
1. **Platform Overview (Dashboard):**
   - High-level KPIs: Active users, registered providers, verified centers, active missions, and platform revenue.
2. **Roadside Dispatch Coordination:**
   - Real-time ticket board displaying client emergency requests.
   - Manual override to assign or reassign tickets to verified providers.
   - Cancellation capability with reason logging.
3. **Service Center Appointments Oversight:**
   - Cross-center view of all customer bookings with status change override.
4. **Provider Verification & KYC Queue:**
   - Review pending provider applications, trade license numbers, and plate numbers.
   - Direct `Approve & Verify` or `Reject` actions.
5. **User & Access Governance:**
   - User directory with search and role filtering (`Admin`, `Provider`, `Customer`).
   - Ability to suspend or reactivate compromised accounts.

---

## 3. Technical Standards & Code Guidelines

### 3.1 Entity Configuration Classes (`IEntityTypeConfiguration<T>`)
- Every domain entity configuration must reside in `FixNGo.Infrastructure/Persistence/Configurations/`.
- Fluent API must be used for table mappings, primary keys, indexes, and delete behaviors (e.g. `DeleteBehavior.Restrict` on bookings and requests to preserve audit trails).
- No inline configuration bloat inside `OnModelCreating`.

### 3.2 AutoMapper Standard
- All mappings between Domain Entities and Application DTOs must be registered in `FixNGo.Application/Common/Mappings/MappingProfile.cs`.
- Hand-rolled manual mappings in controllers are prohibited.

### 3.3 Dual-Layer Validation Standard
Every user-facing form must implement both client and server validation:
1. **Client-Side Validation:**
   - Powered by `jQuery Validate` and `jQuery Validation Unobtrusive`.
   - Included via `<partial name="_ValidationScriptsPartial" />` in view scripts sections.
   - Immediate feedback without page reload on required fields, length limits, and numerical ranges.
2. **Server-Side Validation (Data Annotations + FluentValidation):**
   - Models and DTOs decorated with Data Annotations (`[Required]`, `[StringLength]`, `[Range]`, `[Phone]`, `[EmailAddress]`).
   - Complex business validation rules registered using `FluentValidation.AbstractValidator<T>` (e.g. `UpdateProviderProfileDtoValidator`, `BookingValidator`).
   - Every controller action must guard with `if (!ModelState.IsValid) return View(...)`.

### 3.4 Display Standard: Search, Sort & Pagination
Any catalog or list view must implement the standard parameter pattern:
```csharp
public async Task<IActionResult> Index(
    string? search, 
    string? filterCity, 
    string? sortBy, 
    int page = 1)
```
- Minimum page size: 6–10 items per page.
- URL state must preserve current search, filter, and sort queries during pagination.

---

## 4. Domain Data Dictionary & Enums

| Enum | Key Values | Purpose |
|---|---|---|
| `AssistanceType` | `Mechanic`, `TowTruck`, `TireChange`, `BatteryJump`, `FuelDelivery`, `Locksmith` | Categorizes emergency assistance requests |
| `AssistanceRequestStatus` | `Requested`, `Accepted`, `EnRoute`, `Arrived`, `Completed`, `Cancelled` | Lifecycle stages of a roadside ticket |
| `BookingStatus` | `Pending`, `Confirmed`, `Completed`, `Rejected`, `Cancelled` | Lifecycle stages of a service center booking |
| `VerificationStatus` | `Pending`, `Verified`, `Rejected` | Provider KYC compliance status |
| `TowTripStage` | `Accepted`, `EnRouteToPickup`, `ArrivedAtPickup`, `LoadingAndTowing`, `Completed` | Step-by-step progress for tow truck drivers |

---

## 5. Route & Controller Endpoint Catalog

### 5.1 End User & Service Centers (`ServiceCentersController`, `BookingsController`)
- `GET  /ServiceCenters` — Catalog with Search, City Filter, Sorting, and Pagination.
- `GET  /ServiceCenters/Dashboard` — Service center operations center.
- `GET  /ServiceCenters/Profile` & `POST /ServiceCenters/Profile` — Center operational details with validation.
- `GET  /ServiceCenters/Services` & `POST /ServiceCenters/Services` — Dynamic service pricing.
- `GET  /Bookings/Create` & `POST /Bookings/Create` — Appointment booking form with validation.
- `GET  /Bookings/Dashboard` — Real-time booking dashboard with status change actions.
- `POST /Bookings/UpdateStatus` — Update booking status (`Confirm`, `Complete`, `Reject`, `Cancel`).

### 5.2 Provider Portal (`ProviderController`, `TowProviderController`)
- `GET  /Provider/Dashboard` — Mechanic stats and active ticket.
- `GET  /Provider/Requests` & `POST /Provider/AcceptRequest` — Incoming roadside dispatch.
- `GET  /Provider/ActiveRequest` — Live mission navigation and status progression.
- `GET  /Provider/Profile` & `POST /Provider/Profile` — Mechanic profile with FluentValidation & Data Annotations.
- `GET  /TowProvider/Dashboard` — Tow driver dashboard & online toggle.
- `GET  /TowProvider/Requests` & `POST /TowProvider/AcceptRequest` — Incoming tow requests.
- `GET  /TowProvider/ActiveTow` & `POST /TowProvider/UpdateTowStage` — 5-stage tow progress tracker.
- `GET  /TowProvider/Profile` & `POST /TowProvider/Profile` — Tow truck specs & capacity validation.

### 5.3 Admin Governance (`AdminController`)
- `GET  /Admin/Dashboard` — Platform KPIs, live missions, and recent dispatches.
- `GET  /Admin/Requests` — Roadside dispatch board with filter, search, and pagination.
- `POST /Admin/AssignProvider` — Intervene and assign/reassign provider to emergency request.
- `POST /Admin/CancelRequest` — Admin cancellation of emergency ticket.
- `GET  /Admin/Bookings` — Cross-center booking board with status update override.
- `GET  /Admin/Providers` & `POST /Admin/VerifyProvider` — Review & approve/reject KYC applications.
- `GET  /Admin/Users` & `POST /Admin/ToggleUserStatus` — User access governance (active / suspended).

---

## 6. Team Collaboration & Git Workflow

1. **Working in Harmony:**
   - Always run `git pull` before starting a new feature to ensure synchronization.
   - Do not modify shared infrastructure configurations or database initializers without team consensus.
2. **Quality Gates Before Commit/Push:**
   - `dotnet build FixNGo.sln` must compile with **0 Errors**.
   - `dotnet test` must pass **100% of unit tests**.
   - Ensure both Client-Side and Server-Side validation are intact on all updated views.
3. **AI-Assisted Workflow with Common Sense:**
   - Any AI-generated code must respect the Clean Architecture boundaries.
   - No mock/placeholder templates in production flows; all forms must be backed by real persistence and validation.
   - Check and handle edge cases (e.g., negative prices, past dates, unassigned providers).
