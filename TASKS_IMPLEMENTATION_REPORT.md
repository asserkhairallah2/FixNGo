# FixNGo — Tasks & Requirements Implementation Report
## تقرير إنجاز ومطابقة المتطلبات البرمجية والمواصفات الأساسية والبونص

This document provides a comprehensive technical breakdown and verification mapping for all tasks specified in the instructor's milestone requirements for the **FixNGo** project. It details **WHERE** each requirement was implemented, **HOW** it works under the hood, and **ON WHAT** components, entities, or views it operates.

---

## Table of Contents
1. [Core Business Cycle (Happy Path / CRUD for All 3 Parties)](#1-core-business-cycle-happy-path--crud-for-all-3-parties)
   - [1.1 Service Provider: Mobile Mechanic](#11-service-provider-mobile-mechanic)
   - [1.2 Service Provider: Tow Truck Captain](#12-service-provider-tow-truck-captain)
   - [1.3 Service Provider: Maintenance Service Center](#13-service-provider-maintenance-service-center)
   - [1.4 End User / Client: Browse, Book, and Status Tracking](#14-end-user--client-browse-book-and-status-tracking)
   - [1.5 Admin: Dispatch Coordination, Governance, & KYC](#15-admin-dispatch-coordination-governance--kyc)
2. [Display, Search, Sort & Pagination](#2-display-search-sort--pagination)
   - [2.1 Search & Filter](#21-search--filter)
   - [2.2 Sorting](#22-sorting)
   - [2.3 Database-Level Pagination](#23-database-level-pagination)
3. [Technical Code Requirements (Bare Minimum)](#3-technical-code-requirements-bare-minimum)
   - [3.1 AutoMapper Integration](#31-automapper-integration)
   - [3.2 Entity Configuration Classes (IEntityTypeConfiguration)](#32-entity-configuration-classes-ientitytypeconfiguration)
   - [3.3 Comprehensive Validation (Client-Side & Server-Side)](#33-comprehensive-validation-client-side--server-side)
4. [Team Workflow & AI Governance](#4-team-workflow--ai-governance)
   - [4.1 Shared Team Markdown Contract](#41-shared-team-markdown-contract)
   - [4.2 AI Skills, Common Sense Rules, & State Tracking](#42-ai-skills-common-sense-rules--state-tracking)
5. [Bonus Features & Advanced Capabilities](#5-bonus-features--advanced-capabilities)
   - [5.1 FluentValidation on the Server](#51-fluentvalidation-on-the-server)
   - [5.2 Asynchronous Web Requests, AJAX, & REST Web API](#52-asynchronous-web-requests-ajax--rest-web-api)
6. [Traceability & Verification Matrix](#6-traceability--verification-matrix)

---

# 1. Core Business Cycle (Happy Path / CRUD for All 3 Parties)
> **المطلوب:** إغلاق دورة العمل الأساسية للأطراف الثلاثة (مقدم الخدمة، المستخدم النهائي، والمدير) مع صفحات شغالة فعلياً وتعديل وبيانات وتحقق وليس مجرد تصميم.

---

### 1.1 Service Provider: Mobile Mechanic
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/ProviderController.cs`](FixNGo.Web/Controllers/ProviderController.cs)
  * Views: [`FixNGo.Web/Views/Provider/Profile.cshtml`](FixNGo.Web/Views/Provider/Profile.cshtml), [`Dashboard.cshtml`](FixNGo.Web/Views/Provider/Dashboard.cshtml), [`ActiveRequest.cshtml`](FixNGo.Web/Views/Provider/ActiveRequest.cshtml), [`Requests.cshtml`](FixNGo.Web/Views/Provider/Requests.cshtml)
* **ON WHAT:**
  * `ProviderProfile` & `ApplicationUser` entities, emergency `AssistanceRequest` records, and `UpdateProviderProfileDto`.
* **HOW:**
  * **Profile Edit & Validation:** Implemented in `[HttpGet] Profile()` and `[HttpPost] Profile(UpdateProviderProfileDto model)`. Evaluates `ModelState.IsValid` and persists updates via `_providerService.UpdateProfileAsync(...)`.
  * **Availability Toggle:** `[HttpPost] ToggleAvailability()` switches the mechanic's status dynamically between `Online` and `Offline` in real time.
  * **Emergency Job Progression:** The mechanic accepts open roadside maintenance requests, transitions them to `InService`, completes the service with the final fare, and reviews aggregated earnings.

---

### 1.2 Service Provider: Tow Truck Captain
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/TowProviderController.cs`](FixNGo.Web/Controllers/TowProviderController.cs)
  * Views: [`FixNGo.Web/Views/TowProvider/Profile.cshtml`](FixNGo.Web/Views/TowProvider/Profile.cshtml), [`ActiveTow.cshtml`](FixNGo.Web/Views/TowProvider/ActiveTow.cshtml), [`Navigation.cshtml`](FixNGo.Web/Views/TowProvider/Navigation.cshtml), [`Dashboard.cshtml`](FixNGo.Web/Views/TowProvider/Dashboard.cshtml)
* **ON WHAT:**
  * `TowProviderProfileViewModel`, truck towing specs (Capacity `0.5t` to `50t`, Make/Model, Plate Number), and active towing jobs.
* **HOW:**
  * **Profile Edit & Validation:** `[HttpPost] Profile(TowProviderProfileViewModel model)` enforces `[Required]`, Egyptian phone format regex, and truck capacity range limits (`0.5 - 50.0 Tons`).
  * **Trip State Transitions:** `[HttpPost] UpdateStage(int requestId, string stage)` moves the trip through domain state machine validations: `Accepted` → `EnRoute` → `Arrived` → `InService` → `Completed`.
  * **Navigation & Fare:** Maps live GPS coordinates, computes driving distances, and calculates mileage fares.

---

### 1.3 Service Provider: Maintenance Service Center
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/ServiceCentersController.cs`](FixNGo.Web/Controllers/ServiceCentersController.cs)
  * Views: [`FixNGo.Web/Views/ServiceCenters/Profile.cshtml`](FixNGo.Web/Views/ServiceCenters/Profile.cshtml), [`Services.cshtml`](FixNGo.Web/Views/ServiceCenters/Services.cshtml), [`WorkingHours.cshtml`](FixNGo.Web/Views/ServiceCenters/WorkingHours.cshtml)
* **ON WHAT:**
  * `ServiceCenter`, `Service` maintenance packages, and weekly `WorkingHours` entities.
* **HOW:**
  * **Center Profile Edit:** `[HttpPost] Profile(CenterProfileViewModel model)` modifies workshop name, physical address, city, and phone number with validation.
  * **Service Package Catalog CRUD:** `[HttpGet] Services()` & `[HttpPost] Services(int id, CenterServicesViewModel input)` allows workshop owners to create, update, or toggle maintenance services (e.g. Oil Change, Brake Overhaul, Full Inspection) with positive pricing.
  * **Weekly Working Hours:** `[HttpPost] WorkingHours(...)` configures opening and closing times per weekday to prevent customer bookings on non-operational days.

---

### 1.4 End User / Client: Browse, Book, and Status Tracking
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/ServiceCentersController.cs`](FixNGo.Web/Controllers/ServiceCentersController.cs) and [`FixNGo.Web/Controllers/BookingsController.cs`](FixNGo.Web/Controllers/BookingsController.cs)
  * Views: [`FixNGo.Web/Views/ServiceCenters/Index.cshtml`](FixNGo.Web/Views/ServiceCenters/Index.cshtml), [`Details.cshtml`](FixNGo.Web/Views/ServiceCenters/Details.cshtml), [`FixNGo.Web/Views/Bookings/Create.cshtml`](FixNGo.Web/Views/Bookings/Create.cshtml), [`FixNGo.Web/Views/Bookings/Dashboard.cshtml`](FixNGo.Web/Views/Bookings/Dashboard.cshtml)
* **ON WHAT:**
  * `ServiceCenter`, `Service`, and `Booking` entities.
* **HOW:**
  * **1. Browse Services:** Clients explore approved workshops with transparent pricing, ratings, package lists, and locations.
  * **2. Book a Service:** Clients select workshop, service package, and appointment slot in `Bookings/Create`. The controller validates that the date is **not in the past** (`booking.AppointmentDate < DateOnly.FromDateTime(DateTime.Today)`), initializes status as `Pending`, and persists the booking.
  * **3. Status Lifecycle:** Clients track bookings in `Bookings/Dashboard` and can trigger lifecycle updates (`Confirm`, `Cancel`, `Complete`, or `Reject`) verified by [`BookingStateMachine.cs`](FixNGo.Domain/Rules/BookingStateMachine.cs).

---

### 1.5 Admin: Dispatch Coordination, Governance, & KYC
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/AdminController.cs`](FixNGo.Web/Controllers/AdminController.cs) (guarded by `[Authorize(Roles = "Admin")]`)
  * Views: [`FixNGo.Web/Views/Admin/Dashboard.cshtml`](FixNGo.Web/Views/Admin/Dashboard.cshtml), [`Requests.cshtml`](FixNGo.Web/Views/Admin/Requests.cshtml), [`Bookings.cshtml`](FixNGo.Web/Views/Admin/Bookings.cshtml), [`Providers.cshtml`](FixNGo.Web/Views/Admin/Providers.cshtml), [`Users.cshtml`](FixNGo.Web/Views/Admin/Users.cshtml)
* **ON WHAT:**
  * Platform-wide oversight of `ApplicationUser`, `AssistanceRequest`, `Booking`, and `ProviderProfile`.
* **HOW:**
  * **Dispatch Coordination Board (`/Admin/Requests`):** Monitors all emergency roadside assistance jobs, provides manual assignment/override, and manages stalled requests.
  * **Bookings Central Management (`/Admin/Bookings`):** Central dashboard tracking all appointments across all service centers.
  * **Verification Queue / KYC (`/Admin/Providers`):** Inspects commercial registrations, licenses, and permits of providers and service centers with one-click `Approve` or `Reject` actions.
  * **User Management (`/Admin/Users`):** Manages user accounts, contact information, and role assignments.

---

# 2. Display, Search, Sort & Pagination
> **المطلوب:** تطبيق الترتيب (Sort)، البحث أو التصفية (Search/Filter)، وترقيم الصفحات (Pagination) في صفحة واحدة على الأقل مناسبة للـ Business.

Implemented on the **Service Centers Directory** catalog:
* Controller Action: [`ServiceCentersController.Index`](FixNGo.Web/Controllers/ServiceCentersController.cs#L35-L105)
* Razor View: [`FixNGo.Web/Views/ServiceCenters/Index.cshtml`](FixNGo.Web/Views/ServiceCenters/Index.cshtml)
* ViewModel: [`FixNGo.Web/Models/ServiceCenterIndexViewModel.cs`](FixNGo.Web/Models/ServiceCenterIndexViewModel.cs)

---

### 2.1 Search & Filter
* **WHERE:** `ServiceCentersController.cs` (Lines 53–65)
* **HOW:**
  * **Keyword Search:** Matches workshop name, address, or maintenance service package names:
    ```csharp
    if (!string.IsNullOrWhiteSpace(search))
    {
        var s = search.Trim().ToLowerInvariant();
        query = query.Where(c => (c.Name != null && c.Name.ToLower().Contains(s))
                              || (c.Address != null && c.Address.ToLower().Contains(s))
                              || c.Services.Any(sv => sv.Name != null && sv.Name.ToLower().Contains(s)));
    }
    ```
  * **City Filter:** Filter dropdown matching cities (`Cairo`, `Giza`, `Alexandria`, `6th of October`):
    ```csharp
    if (!string.IsNullOrWhiteSpace(city))
    {
        var cLower = city.Trim().ToLowerInvariant();
        query = query.Where(c => c.Address != null && c.Address.ToLower().Contains(cLower));
    }
    ```

---

### 2.2 Sorting
* **WHERE:** `ServiceCentersController.cs` (Lines 67–74)
* **HOW:**
  * Implemented using a C# pattern switch expression supporting multi-criteria ordering:
    ```csharp
    query = sortOrder switch
    {
        "name_desc" => query.OrderByDescending(c => c.Name),
        "rating_desc" => query.OrderByDescending(c => c.Rating).ThenByDescending(c => c.TotalReviews),
        "rating_asc" => query.OrderBy(c => c.Rating),
        _ => query.OrderBy(c => c.Name) // default name_asc
    };
    ```

---

### 2.3 Database-Level Pagination
* **WHERE:** `ServiceCentersController.cs` (Lines 76–83) & `Index.cshtml`
* **HOW:**
  * Paging executes efficiently via EF Core query translation:
    ```csharp
    var totalCount = query.Count();
    var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
    var items = query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
    ```
  * In the Razor view, an interactive pagination bar (`[Previous] [1] [2] [3] ... [Next]`) renders active page indicators while preserving search, city, and sort parameters across transitions.

---

# 3. Technical Code Requirements (Bare Minimum)

---

### 3.1 AutoMapper Integration
* **WHERE:**
  * Profile: [`FixNGo.Application/Common/Mappings/MappingProfile.cs`](FixNGo.Application/Common/Mappings/MappingProfile.cs)
  * DI Registration: [`FixNGo.Web/Program.cs`](FixNGo.Web/Program.cs) (`builder.Services.AddAutoMapper(...)`)
  * Usage: [`FixNGo.Web/Controllers/ServiceCentersController.cs`](FixNGo.Web/Controllers/ServiceCentersController.cs#L84)
* **ON WHAT:**
  * Entity-to-DTO mappings: `ServiceCenter` → `ServiceCenterDto`, `Service` → `ServiceDto`, `ProviderProfile` → `ProviderProfileDto`.
* **HOW:**
  * Automatically projects domain entities into lightweight presentation DTOs without manual field assignments:
    ```csharp
    var dtos = _mapper.Map<List<ServiceCenterDto>>(items);
    ```

---

### 3.2 Entity Configuration Classes (IEntityTypeConfiguration)
* **WHERE:** [`FixNGo.Infrastructure/Persistence/Configurations/`](FixNGo.Infrastructure/Persistence/Configurations/)
  1. [`ApplicationUserConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/ApplicationUserConfiguration.cs)
  2. [`AssistanceRequestConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/AssistanceRequestConfiguration.cs)
  3. [`BookingConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/BookingConfiguration.cs)
  4. [`ProviderProfileConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/ProviderProfileConfiguration.cs)
  5. [`ServiceCenterConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/ServiceCenterConfiguration.cs)
  6. [`ServiceConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/ServiceConfiguration.cs)
  7. [`WorkingHoursConfiguration.cs`](FixNGo.Infrastructure/Persistence/Configurations/WorkingHoursConfiguration.cs)
* **ON WHAT:** All 7 core domain entities.
* **HOW:**
  * Each entity has an isolated configuration class implementing `IEntityTypeConfiguration<T>`.
  * Configures Fluent API constraints: decimal precision (`builder.Property(x => x.EstimatedFare).HasPrecision(18, 2)`), string length limits, and relational constraints (`DeleteBehavior.Restrict`).
  * Discovered automatically in `AppDbContext.cs` via assembly scanning:
    ```csharp
    modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    ```

---

### 3.3 Comprehensive Validation (Client-Side & Server-Side)

#### A. Client-Side Validation
* **WHERE:**
  * Shared Partial: [`FixNGo.Web/Views/Shared/_ValidationScriptsPartial.cshtml`](FixNGo.Web/Views/Shared/_ValidationScriptsPartial.cshtml)
  * Included on all form views via `@section Scripts { <partial name="_ValidationScriptsPartial" /> }`.
  * Active on: `Bookings/Create.cshtml`, `Provider/Profile.cshtml`, `TowProvider/Profile.cshtml`, `ServiceCenters/Profile.cshtml`, `Account/Login.cshtml`.
* **HOW:**
  * Uses `jquery.validate.js` and `jquery.validate.unobtrusive.js`.
  * ASP.NET Core Razor Tag Helpers (`asp-for`, `asp-validation-for`) generate HTML5 `data-val-*` attributes, giving instant client feedback before form submission.

#### B. Server-Side Validation (Data Annotations)
* **WHERE:**
  * ViewModels: [`TowProviderViewModels.cs`](FixNGo.Web/ViewModels/TowProviderViewModels.cs), [`ProviderViewModels.cs`](FixNGo.Web/ViewModels/ProviderViewModels.cs), [`BookingViewModels.cs`](FixNGo.Web/ViewModels/BookingViewModels.cs), [`ServiceCenterViewModels.cs`](FixNGo.Web/ViewModels/ServiceCenterViewModels.cs).
  * Controllers: Evaluated in every POST action via `if (!ModelState.IsValid) return View(model);`.
* **HOW:**
  * Enforces `[Required]`, `[Phone]`, `[Range(0.5, 50.0)]`, and `[StringLength]`. Re-renders forms with model validation summaries when validation fails.

---

# 4. Team Workflow & AI Governance

---

### 4.1 Shared Team Markdown Contract
* **WHERE:** [`TEAM_SPEC_CONTRACT.md`](TEAM_SPEC_CONTRACT.md) in the repository root.
* **ON WHAT:** Shared technical contract for team collaboration.
* **HOW:**
  * Defines agreed endpoint paths (`/Bookings/Create`, `/ServiceCenters/Index`, `/TowProvider/ActiveTow`).
  * Enforces unified ViewModel and DTO conventions.
  * Standardizes error handling and toast notifications (`TempData["Success"]` / `TempData["Error"]`).
  * Documents Git branching rules and pull request workflow.

---

### 4.2 AI Skills, Common Sense Rules, & State Tracking
* **WHERE:** [`AGENT.md`](AGENT.md) and [`STATE.md`](STATE.md) in the repository root.
* **HOW:**
  * `AGENT.md` establishes AI guardrails: never bypass validation, adhere strictly to Clean Architecture separation, and never make destructive changes to working business logic.
  * `STATE.md` maintains a dynamic log of completed cycles, architectural decisions (ADR), and active tasks to preserve AI context across sessions.

---

# 5. Bonus Features & Advanced Capabilities

---

### 5.1 FluentValidation on the Server
* **WHERE:**
  * Validators: [`FixNGo.Application/Common/Validation/Validators.cs`](FixNGo.Application/Common/Validation/Validators.cs)
  * Registration: [`FixNGo.Web/Program.cs`](FixNGo.Web/Program.cs) (Line 39: `builder.Services.AddValidatorsFromAssemblyContaining<BookingValidator>();`)
* **ON WHAT:** `Booking`, `CreateAssistanceRequestDto`, `UpdateProviderProfileDto`.
* **HOW:**
  * Replaces or augments standard Data Annotations with clean, maintainable validation rules:
    * `BookingValidator`: Asserts `AppointmentDate >= DateOnly.FromDateTime(DateTime.Today)` and `Price > 0`.
    * `CreateAssistanceRequestDtoValidator`: Asserts coordinate limits (`Latitude` between -90 and 90, `Longitude` between -180 and 180) and Egyptian phone regex pattern (`^01[0125][0-9]{8}$`).
    * `UpdateProviderProfileDtoValidator`: Validates phone format and non-empty biography length.

---

### 5.2 Asynchronous Web Requests, AJAX, & REST Web API
* **WHERE:**
  * Controller: [`FixNGo.Web/Controllers/Api/AssistanceRequestsApiController.cs`](FixNGo.Web/Controllers/Api/AssistanceRequestsApiController.cs)
  * Live Views: [`FixNGo.Web/Views/TowProvider/ActiveTow.cshtml`](FixNGo.Web/Views/TowProvider/ActiveTow.cshtml), [`Views/Provider/ActiveRequest.cshtml`](FixNGo.Web/Views/Provider/ActiveRequest.cshtml)
* **ON WHAT:** Live GPS tracking and real-time request status updates.
* **HOW:**
  * Inherits from `ControllerBase` with `[ApiController]` and `[Route("api/assistance-requests")]`.
  * Provides RESTful JSON endpoints:
    * `GET /api/assistance-requests/active`: Retrieves current journey GPS coordinates and trip state.
    * `POST /api/assistance-requests/{id}/location`: Receives live GPS updates from provider devices asynchronously.
    * `PUT /api/assistance-requests/{id}/status`: Updates trip lifecycle status with JSON status responses without full page reloads.

---

# 6. Traceability & Verification Matrix

| # | Instructor Requirement | Status | Primary Implementation File(s) | Verification Command / Check |
|---|---|:---:|---|---|
| **1** | **Provider: Mobile Mechanic** | ✅ Done | `ProviderController.cs`, `Views/Provider/` | Interactive Profile Edit & Requests |
| **2** | **Provider: Tow Truck Captain** | ✅ Done | `TowProviderController.cs`, `Views/TowProvider/` | Towing Specs & Dispatch Progression |
| **3** | **Provider: Service Center** | ✅ Done | `ServiceCentersController.cs`, `Views/ServiceCenters/` | Services CRUD & Working Hours Edit |
| **4** | **Client: Browse Services** | ✅ Done | `ServiceCentersController.cs:Index`, `Details` | Workshop Catalog & Details Views |
| **5** | **Client: Book Service** | ✅ Done | `BookingsController.cs:Create`, `Views/Bookings/` | Date & Price Validation, Booking creation |
| **6** | **Client: Status Tracking** | ✅ Done | `BookingsController.cs:Dashboard`, `BookingStateMachine` | Transition confirmations & cancellations |
| **7** | **Admin: Coordination & Dispatch** | ✅ Done | `AdminController.cs`, `Views/Admin/` | Dispatch Board, Bookings, KYC Queue |
| **8** | **Search & Filter** | ✅ Done | `ServiceCentersController.cs:Index` | Keyword search & City dropdown |
| **9** | **Sorting** | ✅ Done | `ServiceCentersController.cs:Index` | Sort by Name, Rating, Reviews |
| **10** | **Pagination** | ✅ Done | `ServiceCentersController.cs:Index` | EF Core `Skip`/`Take` + Page numbers bar |
| **11** | **AutoMapper** | ✅ Done | `MappingProfile.cs`, `ServiceCentersController.cs` | DTO projection without manual mapping |
| **12** | **IEntityTypeConfiguration** | ✅ Done | `FixNGo.Infrastructure/Persistence/Configurations/` | 7 independent Fluent API classes |
| **13** | **Client-Side Validation** | ✅ Done | `_ValidationScriptsPartial.cshtml` | Unobtrusive jQuery validation on forms |
| **14** | **Server-Side Validation** | ✅ Done | ViewModels Data Annotations & `ModelState.IsValid` | Server-side validation on all POST actions |
| **15** | **Shared Markdown Contract** | ✅ Done | `TEAM_SPEC_CONTRACT.md` | Root markdown contract in repository |
| **16** | **AI Workflow & Governance** | ✅ Done | `AGENT.md`, `STATE.md` | Persona and progressive state tracking |
| **17** | **Bonus: FluentValidation** | ✅ Done | `Validators.cs`, `Program.cs` | Server-side FluentValidation rules |
| **18** | **Bonus: Web API & AJAX** | ✅ Done | `AssistanceRequestsApiController.cs`, `ActiveTow.cshtml` | Asynchronous GPS updates and REST API |

---
*Generated and verified for the FixNGo project team submission.*
