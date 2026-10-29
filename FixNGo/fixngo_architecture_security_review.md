# FIXNGO ARCHITECTURE & SECURITY REVIEW

**FixNGo**  
*Architecture Decision & Security Review*  
Clean Architecture | Modular Monolith | ASP.NET Core MVC | EF Core | SQL Server

---

### Purpose
A practical, beginner-team-friendly architecture decision and security-focused review of the FixNGo project specifications. This document distinguishes requirements stated in the supplied SRS/SAD from recommendations and unresolved decisions.

* **Prepared for:** The FixNGo student development team
* **Working architecture decision:** Based on FixNGo SRS v1.0 and Expanded SAD v1.0

---

## Executive Summary

**Recommended direction:** Use Clean Architecture as a small modular monolith, not microservices. Keep the four principal projects already described in the SAD: `FixNGo.Domain`, `FixNGo.Application`, `FixNGo.Infrastructure`, and `FixNGo.Web`. Add focused unit and integration test projects.

This recommendation reflects FixNGo's workflows: emergency assistance and provider dispatch, live tracking, service-center bookings, payments, reviews, verification, and role-specific access. The architecture should isolate core rules and integrations, while remaining simple enough for a six-person beginner team to implement and explain.

| Decision | Recommendation | Status |
| :--- | :--- | :--- |
| **Architecture** | Clean Architecture, modular monolith, one deployable application | Recommended |
| **Framework** | ASP.NET Core MVC + EF Core + SQL Server | SAD baseline; exact .NET LTS version to verify |
| **Team context** | Six beginner developers; learning EF Core, DI, and testing while building | Working context supplied by team |
| **Redis** | Defer until an actual caching or multi-instance SignalR need is demonstrated | Provisional recommendation |
| **Transactional outbox** | Do not dismiss globally: SAD explicitly relies on it for critical status/event delivery. Implement a minimal version if those requirements remain in scope, or formally revise the requirement with supervisor approval. | Decision required |
| **Security** | Treat authorization, ownership, location privacy, payment safety, upload safety, and auditability as release-critical | Required by SRS/SAD |
| **Deadline / exact .NET LTS** | Still unconfirmed; do not present the 12-week model as fact | Open |

> ### Important finding
> The Expanded SAD is considerably more detailed than a typical student implementation plan. Some controls are essential security/reliability requirements; others are production-scale operational targets. Keep the security outcomes, but implement them in a staged and understandable way. Do not silently drop a control that the SAD marks **Must**.

---

## 1. Source Documents and Review Scope

This review is based on the following project materials available for inspection:
* **FixNGo Software Requirements Specification (SRS)**, Version 1.0, dated 12 September 2026.
* **FixNGo System Analysis & Design (SAD)**, Foundational Technical Sections, Expanded Edition v1.0, 71 pages.
* **The provided FixNGo Architecture Decision Report**, including the proposed weighted comparison and four-project structure.

The SRS defines the product scope and requirements; the SAD elaborates roles, module-level requirements, non-functional controls, architecture, and verification. Where this report adds advice beyond those documents, it is explicitly described as a recommendation or a point requiring confirmation.

---

## 2. Architecture Decision

### 2.1 Decision
Adopt Clean Architecture principles in a modular monolith. The application remains a single ASP.NET Core MVC deployment backed by SQL Server. Do not introduce microservices, a message broker, CQRS, event sourcing, or a generic repository framework simply to make the design look enterprise-grade.

### 2.2 Why it fits FixNGo
* Core workflows have real business rules: request lifecycle, emergency priority, provider eligibility and verification, booking availability, payment state, cancellation, and reviews.
* Integrations such as maps, payments, OTP, notifications, and file storage should not be embedded in controllers or core business rules.
* Authorization must consider both the actor's role and their relationship to the specific resource (for example, who owns a request or is assigned to it).
* Critical workflows need automated tests that do not require every external provider to be live.
* A single deployable application is simpler to build, debug, demo, and deploy for a beginner student team.

### 2.3 Weighted comparison (provisional)
The supplied architecture report gives Clean Architecture $94/100$ and traditional N-Tier $64/100$. These are reasoned project-specific judgments, not measured results. Retain them as a starting point only; do not treat them as objectively proven scores. The beginner team's learning curve and the real deadline should be reflected in the final decision.

| Criterion | Weight | Traditional N-Tier | Clean Architecture | Interpretation |
| :--- | :--- | :--- | :--- | :--- |
| **Domain complexity** | 20% | $3/5$ | $5/5$ | Dispatch, bookings, and payment states benefit from explicit boundaries. |
| **Maintainability** | 15% | $3/5$ | $5/5$ | Rules and integrations remain easier to locate and change. |
| **Testability** | 15% | $3/5$ | $5/5$ | Use cases can be tested with fake adapters and controlled data. |
| **Dependency control** | 15% | $2/5$ | $5/5$ | Application/Domain do not depend on infrastructure implementations. |
| **Team collaboration** | 10% | $4/5$ | $4/5$ | Both can work; team conventions and code review matter more than the label. |
| **Time-to-market** | 10% | $5/5$ | $3/5$ | Clean Architecture has setup/learning cost; keep it deliberately small. |
| **Future extensibility** | 10% | $3/5$ | $5/5$ | Useful for real boundaries, not a reason to create speculative abstractions. |
| **Deployment simplicity** | 5% | $5/5$ | $5/5$ | Both can be deployed as one application. |

> ### Beginner-team guardrail
> Use the four projects and inward dependency rule, but avoid creating an interface plus multiple classes for every method. Introduce abstractions where they support a real integration boundary, a test seam, or a domain/application need.

---

## 3. Recommended Solution Structure

| Project | Responsibilities | Must not do |
| :--- | :--- | :--- |
| `FixNGo.Domain` | Entities, value objects, enums, domain invariants and valid state transitions. | Reference MVC, EF Core, Infrastructure, or Web. |
| `FixNGo.Application` | Use cases, orchestration, DTOs, validation, authorization checks relevant to use cases, and application-owned contracts. | Reference Infrastructure or Web; instantiate `DbContext` directly. |
| `FixNGo.Infrastructure` | EF Core/SQL Server, persistence configuration and migrations, Identity integration, payment/maps/OTP/notification/file adapters. | Own business policy or bypass application/domain rules. |
| `FixNGo.Web` | MVC controllers, views, ViewModels, authentication entry points, SignalR hubs, middleware, DI composition root. | Perform direct database queries or decide pricing/provider/status business rules in controllers. |
| `FixNGo.UnitTests` | Domain and Application tests, especially state transitions and eligibility rules. | Depend on live third-party services. |
| `FixNGo.IntegrationTests` | Persistence, authorization endpoint behavior, webhook handling, and adapter contracts. | Replace security tests with UI-only checks. |

### 3.1 Allowed project references

| Project | Allowed references |
| :--- | :--- |
| `FixNGo.Domain` | No references to other FixNGo projects. |
| `FixNGo.Application` | `FixNGo.Domain`. |
| `FixNGo.Infrastructure` | `FixNGo.Application` and `FixNGo.Domain`. |
| `FixNGo.Web` | `FixNGo.Application`; `FixNGo.Infrastructure` only at startup/composition root for DI registration. |

### 3.2 Feature folders
Within projects, organize by recognizable feature/module so six beginners can own work without hunting through a single large `Services` folder:
* **Domain candidates:** Accounts, Vehicles, Assistance, Bookings, Payments, Reviews.
* **Application features:** Accounts, Vehicles, Assistance/CreateRequest, MatchProviders, DispatchRequest, UpdateRequestStatus, Tracking, Bookings, Payments, Reviews, Administration.
* **Infrastructure:** Persistence, Identity, Maps, Payments, Notifications, FileStorage. Add Caching only when needed.
* **Web:** Controllers, Views, ViewModels, Hubs, Middleware, Areas/Admin.

---

## 4. Security Review - Priority Requirements

Security is not a separate final phase. It crosses every layer and every feature. The SAD maps SRS NFR-08 through NFR-12 to encryption, role/resource authorization, provider verification, payment audit, and data minimization.

| Area | What the specifications call for | Practical implementation/test |
| :--- | :--- | :--- |
| **Authentication** | SRS FR-01...FR-06; SAD identity and session constraints. | Use ASP.NET Core Identity. Require verified contact where dispatch is gated. Use secure session cookies, safe sign-out, rate limits, lockout progressive throttling, and non-enumerating error messages. |
| **Authorization / IDOR / Provider/center verification / Sensitive data and location** | NFR-09; SAD server-side RBAC, resource-based authorization, deny-by-default, owner-scoped queries.<br><br>NFR-10; admin-gated verification lifecycle.<br><br>NFR-08 and NFR-12; field-level visibility and DTO masking. | Authorize every protected action on the server. Check role + resource ownership/assignment + verification state. Test customer A cannot access customer B's request, vehicle, chat, booking, or documents.<br><br>Unverified, suspended, or revoked providers/centers must not receive requests. Re-check verification status on write/dispatch paths, not only in the UI or stale claims.<br><br>Expose exact customer location only to people who need it and only at the permitted workflow stage. Never trust client-supplied user IDs, role, price, ETA, priority, or status. |
| **Transport and storage** | NFR-08; TLS/HSTS and encryption at rest in the SAD. | Use HTTPS; secure cookie flags; store secrets outside source control. Use platform/database encryption where available. Do not log passwords, OTPs, tokens, full payment data, or precise location unnecessarily. |
| **Payments and audit** | FR-35...FR-38; NFR-11; payment transactions logged for audit. | Never store card number/CVV. Use a payment gateway/token/reference. Verify webhook signatures, deduplicate event IDs, validate amount/currency/reference, and make settlement/refund operations idempotent. |
| **Uploads** | Provider/center verification requires documentation; SAD calls for protecting uploaded documents. | Validate extension, MIME type and file signature; enforce size limits; randomize stored names; keep private files outside public `wwwroot`; authorize download; scan files where feasible; prevent path traversal. |
| **SignalR / live tracking** | FR-23...FR-26; FRE-01/FRE-02 require authenticated hub and request-level access checks. | Authenticate hub connections and authorize group joins server-side. Only the customer who owns a request and provider assigned to it may join that request group. Reject telemetry from non-assigned providers. |
| **Input / web protections** | SAD security headers and validation controls. | Use server-side validation, Razor's output encoding, anti-forgery protection for cookie-authenticated state changes, safe redirects, CSP/security headers, and generic production error responses. |
| **Abuse and audit** | SAD requires rate limits and immutable privileged-action audit history. | Rate-limit login, OTP, request creation, chat, search, and telemetry. Log admin changes, verification decisions, payment transitions, access denials, and suspicious attempts without writing secrets or excessive PII. |
| **Dependencies and secrets** | SAD calls for secret scanning, dependency scans, and external-service isolation. | Use user-secrets in development and protected deployment secrets in production; restrict public API keys; scan repository for secrets and dependencies; rotate exposed keys. |
| **Backup / recovery** | SAD reliability section defines backups and restore goals. | For a student deployment, at minimum automate backups, restrict access to them, and test restoring one. Production RPO/RTO targets require supervisor/product-owner agreement. |

### 4.1 Security tests that should block a release
* **Authorization matrix:** Exercise each protected endpoint as Customer, Provider, ServiceCenter, and Admin; include unauthenticated users and wrong-resource owners.
* **IDOR tests:** Change request, booking, vehicle, payment, and document IDs in requests; no data may leak across owners.
* **Provider verification tests:** Pending, Suspended, and Revoked providers cannot receive or accept work.
* **Payment tests:** Invalid signature rejected; duplicate webhook processed once; wrong amount/reference cannot settle a payment.
* **Concurrency tests:** Two providers cannot both win one assistance request; two customers cannot book the same slot.
* **Location privacy tests:** Unauthorized users cannot read exact coordinates or subscribe to another request's tracking/chat stream.
* **Upload tests:** Reject oversized, mismatched, unsafe, or unauthorized file access.
* **Secret scan and dependency vulnerability scan:** No secrets in repository or logs.

> ### Security principle
> The UI hiding a button is not authorization. Every operation must be validated on the server, including AJAX endpoints, SignalR hub methods, downloads, payment callbacks, and admin operations.

---

## 5. Security and Reliability Risk Register

| Risk | Impact | Required control | Priority |
| :--- | :--- | :--- | :--- |
| **Broken object-level authorization / IDOR** | Private data, documents, requests, and location exposed. | Resource-based authorization + owner-scoped queries + cross-user tests. | **Critical** |
| **Location or tracking group leakage** | Personal safety and privacy risk. | Hub-side authorization; least-privilege DTOs; retention/access rules. | **Critical** |
| **Duplicate payment callback / replay** | Duplicate settlement/refund or inconsistent payment state. | Signature validation, event-ID uniqueness, idempotent handler, audit trail. | **Critical** |
| **Concurrent provider acceptance** | Two providers assigned; unsafe or confusing emergency flow. | Atomic conditional update/transaction + concurrency token + conflict response. | **Critical** |
| **Malicious document upload** | Malware, data disclosure, or server-side compromise. | Private storage, content validation, limits, safe download authorization. | **High** |
| **Secrets committed to Git** | Unauthorized API, database, or payment access. | Secret manager/user-secrets, repository scanning, rotation procedure. | **High** |
| **Weak authentication throttling** | Credential stuffing, OTP abuse, enumeration. | Rate limits, lockout/progressive delay, generic errors, security monitoring. | **High** |
| **Overly detailed logs** | Passwords, OTPs, tokens, payment details, or location leak. | Structured logs with redaction and restricted access/retention. | **High** |
| **Live status event lost after DB commit** | UI shows stale state; weak-network recovery fails. | Minimal transactional outbox or approved documented change to SAD requirement. | **High** |
| **Unrestored backups** | Data loss after accidental deletion or corruption. | Automated backups and restore drill. | **High** |

---

## 6. Outbox, Redis, and Other Advanced Infrastructure

### 6.1 Redis
**Recommendation:** Defer Redis for the initial student implementation unless the chosen deployment requires a SignalR backplane or measured caching need. A single application instance can begin without Redis. Do not make authorization depend on a cache; stale cache data must never grant access.

### 6.2 Transactional outbox - specification conflict to resolve
The SAD explicitly describes a transactional outbox for critical status broadcasts and says the state, history, and outbox row should be committed together. Therefore, a blanket decision to defer the outbox would conflict with the current SAD's reliability design (NFR-15 and the tracking/status requirements).

* Begin with the simplest database-backed outbox that the team can explain: persist the business state change and an event row in the same database transaction; a small background dispatcher publishes pending events and marks them processed.
* Make delivery idempotent because an event may be delivered more than once. Keep the database authoritative; clients must refresh from server state after reconnect.
* Do not add a broker or microservices as part of this decision.
* If the supervisor decides outbox implementation is outside scope, record the decision, the accepted failure mode, the affected requirements/tests, and revise the SAD/traceability matrix explicitly.

### 6.3 Other advanced items

| Item | Initial recommendation | Revisit when |
| :--- | :--- | :--- |
| **Microservices / broker** | Defer | Independent deployment/scaling or sustained event volume demonstrates need. |
| **CORS / MediatR / event sourcing** | Do not introduce by default | A specific use case demonstrates material benefit and team can maintain it. |
| **Generic repository / generic Unit of Work** | Avoid duplicating EF Core DbContext capabilities | A concrete domain persistence boundary benefits from a focused repository. |
| **Outbox** | Keep a minimal implementation if critical reliable events remain required | Reassess only with a documented change to reliability requirements. |
| **Redis** | Defer unless multi-instance SignalR or real cache requirement exists | Deployment or measured performance calls for it. |
| **Advanced SAST / load tooling** | Use available CI checks and focused tests first | Before production scale-up or when CI infrastructure is available. |

---

## 7. Specification Gaps and Decisions to Confirm

The architecture report identified G-04, G-06, G-07, and G-14 as unresolved. The SAD traceability matrix associates G-04/G-06 with telemetry/tracking and reliability, and G-14 with communication/offline resilience. The supplied excerpts do not fully define the disposition of each gap; do not infer a resolution without reviewing the relevant Appendix C entries and confirming with the team/supervisor.

| Open item | Why it matters | Action before implementation |
| :--- | :--- | :--- |
| **G-04 / G-06** | Mapped to tracking/telemetry and reliability goals in the SAD traceability matrix. | Read the exact Appendix C entry; define acceptance criteria and retention/privacy rules for tracking data. |
| **G-07** | Referenced as an open product gap in the architecture report; full definition is not established in the material reviewed here. | Locate the exact SRS/SAD entry and document its owner, decision, and test implication. |
| **G-14** | Mapped to offline/weak-network behavior and communication; SAD proposes idempotent replay and degraded-mode behavior. | Decide which replay/reconnection behaviors are MVP requirements and how duplicate submissions are prevented. |
| **Exact .NET LTS version** | Tooling, hosting, compatibility, and support lifecycle depend on the version. | Verify current project files, course setup, and supervisor requirements before pinning SDK/runtime. |
| **Deadline** | Changes time-to-market weight and the amount of infrastructure that can be delivered safely. | Get the real deadline; treat 12 weeks as a planning scenario only. |
| **MVP scope** | SRS Appendix A does not clearly list an agreed MVP subset in the reviewed context. | Agree a written MVP and map every deferred use case to a later phase. |
| **Security / privacy ownership** | Location, chat, documents, and payment data are sensitive. | Agree who can access each field, retention periods, and who approves provider verification/admin actions. |

> ### Do not silently resolve gaps
> A missing definition is not permission to invent a rule. Record the question, decision owner, deadline for decision, and which requirement/test is blocked.

---

## 8. Requirements-to-Architecture Traceability

| SRS/SAD area | Architecture responsibility | Minimum verification evidence |
| :--- | :--- | :--- |
| **FR-01...FR-06; NFR-09** | Web authentication; Application authorization + Identity adapter. | Role/resource authorization matrix; IDOR tests; session/cookie checks. |
| **FR-07...FR-09; NFR-12** | Vehicle feature use cases and owner-scoped persistence. | Cross-user vehicle access tests; data-minimization checks. |
| **FR-10...FR-22; NFR-01/02/15** | Create request, matching, dispatch use cases and Domain state rules. | P0/P1 path tests; timeout/fallback tests; no double assignment; idempotent creation. |
| **FR-23...FR-26; NFR-03/04/15** | Tracking use cases, authenticated SignalR hub, location policies, status history. | Hub membership tests; wrong-provider telemetry rejected; reconnect resync test. |
| **FR-27...FR-29; NFR-09/12/15** | Chat/communication with authorization, limits, and private data handling. | Wrong-request access denied; rate limit and content handling tests. |
| **FR-30...FR-34; NFR-10/15** | Booking use cases, slot rules, verified center status, concurrency controls. | Concurrent booking test; unverified center blocked. |
| **FR-35...FR-38; NFR-08/11/12** | Payment adapter, payment state machine, webhook handling, audit trail. | Signature/replay/amount tests; no card data stored; duplicate event idempotency. |
| **FR-39...FR-45; NFR-11** | Review rules and audit history. | Only eligible completed service can be reviewed; audit entries cannot be casually edited. |
| **SAD §4.3 security** | Cross-cutting middleware, policies, validation, secret handling, logs, uploads. | Security release gates in Section 4.1 of this report. |

---

## 9. Beginner-Friendly Implementation Roadmap

| Stage | Deliverable | Exit criteria |
| :--- | :--- | :--- |
| **0. Confirm scope** | Confirm deadline, .NET version, MVP, unresolved gaps, and supervisor rules. | Open decisions are documented; no invented scope. |
| **1. Foundation** | Create solution/projects, dependency references, Identity setup, configuration/secrets, basic CI. | Build succeeds; no secrets committed; policies are deny-by-default. |
| **2. First vertical slice** | Register/login, create a vehicle, create an assistance request, persist to SQL Server. | Happy path and invalid input tested; user cannot read another user's data. |
| **3. Domain safety** | Request state machine, provider verification, status history, concurrency handling. | Invalid transitions rejected; two providers cannot both accept. |
| **4. Dispatch & tracking** | Matching/dispatch, authenticated SignalR hub, location visibility rules, reconnect resync. | Wrong request group access denied; fallback behavior verified. |
| **5. Booking & payment** | Booking availability/conflict logic, gateway adapter, signed/idempotent webhook handling. | No double booking/settlement; no card details stored. |
| **6. Hardening** | Uploads, audit logs, rate limits, security headers, backup/restore, dependency/secret scans. | Security release checklist passes; high-risk findings resolved or formally accepted. |
| **7. Final verification** | Integration tests, traceability matrix, demo data, deployment runbook. | Each in-scope requirement maps to code and test evidence. |

> The order is a suggested learning sequence, not a promise that all 32 use cases fit a specific deadline. If time is short, define an explicit MVP with the supervisor rather than removing security controls ad hoc.

---

## 10. Architecture Decision Record (ADR-001)

**Status:** Recommended for team and supervisor approval

### Context
FixNGo is a roadside-assistance and car-care platform with customer, provider, service-center, and admin roles. Its critical workflows include emergency dispatch, live tracking, bookings, payments, verification, reviews, and service history. The project is developed by six beginner team members who are still building practical experience.

### Decision
Use Clean Architecture principles in a four-project modular monolith: `Domain`, `Application`, `Infrastructure`, and `Web`. Add unit/integration test projects. Keep `Domain` independent, `Application` dependent on `Domain`, `Infrastructure` implementing inward-facing contracts, and `Web` using `Application` with `Infrastructure` referenced only for composition-root registration.

### Consequences
* **Positive:** Clearer responsibilities, improved testability, integration isolation, and stronger server-side security boundaries.
* **Costs:** Learning curve, project setup, mapping, interfaces at real boundaries, and architectural discipline.
* **Constraints:** No microservices or framework-heavy patterns without evidence; no direct DbContext/repository use from MVC controllers; no sensitive card data storage.
* **Reliability condition:** Preserve the SAD's critical event-delivery requirements. A minimal outbox is appropriate if transactional status-event delivery remains a Must requirement; deferral requires an explicit, approved specification change.
* **Security condition:** Authorization, resource ownership, location privacy, payment integrity, upload protection, and secret management are release-blocking concerns.

### Validation
1. `Domain` has no project references to `Application`, `Infrastructure`, or `Web`.
2. `Application` references `Domain` only among FixNGo application projects.
3. Protected endpoints and SignalR methods enforce server-side role and resource authorization.
4. Unit tests cover state transitions, provider eligibility, booking conflicts, and payment idempotency.
5. Integration tests cover persistence, authorization boundaries, webhook validation, and file access.
6. Security scans show no committed secrets and no unresolved critical vulnerabilities.
7. The team and supervisor have approved the MVP, unresolved gaps, .NET version, deadline, and outbox scope.

---

## 11. Decisions Needed Before Coding at Full Speed

1. Confirm actual deadline and agree on a written MVP.
2. Confirm the .NET LTS version based on the course and project setup.
3. Review Appendix C and resolve G-04, G-06, G-07, and G-14 with named owners.
4. Approve a field-level access matrix for exact location, chat, identity documents, and payment records.
5. Decide whether the SAD's transactional outbox requirement remains in scope; do not defer it silently.
6. Defer Redis unless the chosen deployment or measured need requires it.
7. Agree on project references, feature ownership, code review rules, and a small vertical-slice workflow.
8. Run authorization and IDOR tests before considering the system demo-ready.

---

## Source Notes
* **Primary sources reviewed:** FixNGo SRS v1.0 (12 September 2026); FixNGo System Analysis & Design, Foundational Technical Sections (Expanded Edition v1.0); and the supplied FixNGo Architecture Decision Report.
* The SRS defines the product requirements. The SAD contains additional detailed design constraints and verification expectations.
* This report summarizes and prioritizes those materials for a beginner student team; it does not replace the source documents or formally amend them. Any change to a Must requirement should be approved and reflected in the SRS/SAD and traceability matrix.