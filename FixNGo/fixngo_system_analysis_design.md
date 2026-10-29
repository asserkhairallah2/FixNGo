# FixNGo: System Analysis & Design

---

## 1. Problem Statement & Objectives

### 1.1 Problem Statement
When a vehicle breaks down on the road, the driver is stressed, usually does not know what is wrong, is exposed to traffic hazards, and has no reliable way to find help. Today the process is manual and phone-based: the driver calls mechanics or tow operators one by one, cannot verify who is coming, cannot know the price in advance, and gets no arrival time or record of the service. Every dead-end call wastes time during which the driver stays at risk. Preventive car care is also disconnected from emergency repair, so vehicles move from breakdown to breakdown without a maintained history.

- **Who is affected:** Drivers (customers), mechanics and tow operators (providers), and repair garages (service centers).
- **Why current solutions fail:** They are unverified, price-opaque, slow, and leave no system of record.
- **FixNGo's answer:** A platform that detects the driver's location, classifies the problem through a short guided flow, matches the driver with the nearest verified available provider, shows a transparent estimate, tracks the provider live, handles payment, and records the service history. The same platform lets drivers search and book service centers for maintenance.

### 1.2 Project Objectives

| ID | Objective | Success metric | Trace |
| :--- | :--- | :--- | :--- |
| **G-01** | Fast dispatch acknowledgement | $p95 \le 5\text{ s}$ from request receipt to first offer sent to a provider | NFR-01 |
| **G-03** | Fast provider list | Candidate list shown within $10\text{ s}$ ($p95$) of confirming location and problem | NFR-02 |
| **G-04** | Fresh live tracking | Provider position updated every $5\text{--}10\text{ s}$ | NFR-03 |
| **G-07** | Verified-only fulfillment | $100\%$ of requests handled by admin-verified providers | FR-05, NFR-10 |
| **G-11** | Emergency prioritization | $100\%$ of injury/accident (P0) requests use the expedited path (parallel offers to top 3 providers) | NFR-05 |
| **G-14** | Weak-network resilience | $\ge 95\%$ of interrupted operations complete on replay without data loss | NFR-15 |
| **G-19** | Transparent pricing | $100\%$ of non-P0 requests show an itemized estimate before dispatch | FR-18, FR-37 |
| **G-20** | Low-cognitive-load UX | $\le 8\text{ taps} / \le 60\text{ s}$ to request help; $\le 4\text{ taps}$ for the injury path | NFR-13 |

---

## 2. Use Case Diagram & Descriptions

### 2.1 Actors

| Actor | Description |
| :--- | :--- |
| **Customer** | A driver who requests roadside assistance, tracks the provider, pays, books service centers, and rates |
| **Service Provider** | A mechanic, tow operator, or specialist who receives and fulfills assistance requests |
| **Service Center** | A repair garage that publishes services and hours and manages bookings |
| **Admin** | Platform staff who verify accounts, moderate reviews, and monitor the system |

### 2.2 Use Case Diagram Description
The Use Case Diagram illustrates the interactions between the four main actors (Customer, Provider, Service Center, Admin) and the system's core use cases. Use cases are grouped by actor; use cases shared by all actors are shown once.

#### Actors & Use Cases Overview

| Actor | Use Cases |
| :--- | :--- |
| **All actors** | Register / Login; Upload Verification Documents (Provider and Service Center only, as an extension of Register / Login) |
| **Customer** | Manage Vehicles, Request Assistance, Confirm Location, Set Location Manually, Select Problem Type, Answer Follow-up Questions, Upload Photos, Select Provider, Track Provider, View ETA, Chat / Call Provider, Search & Book Service Center, Book Follow-up After Emergency, Pay, Generate Invoice, Pay Online, Rate Provider, View Service History |
| **Provider** | Manage Availability, Accept / Reject Request, Update Request Status, Share Live Location, View Earnings & History, Chat / Call |
| **Service Center** | Manage Catalog & Working Hours, Accept / Reject Booking |
| **Admin** | Verify Providers & Centers, Manage Users, Moderate Reviews & Complaints, View Reports, Configure Platform |

#### Use Case Relationships

| Type | Base use case | Included / Extending use case |
| :--- | :--- | :--- |
| `<<include>>` | Request Assistance | Confirm Location |
| `<<include>>` | Request Assistance | Select Problem Type |
| `<<include>>` | Request Assistance | Select Provider |
| `<<include>>` | Track Provider | View ETA |
| `<<include>>` | Pay | Generate Invoice |
| `<<include>>` | Update Request Status | Share Live Location |
| `<<extend>>` | Request Assistance | Upload Photos |
| `<<extend>>` | Request Assistance | Answer Follow-up Questions |
| `<<extend>>` | Confirm Location | Set Location Manually |
| `<<extend>>` | Pay | Pay Online |
| `<<extend>>` | Search & Book Service Center | Book Follow-up After Emergency |
| `<<extend>>` | Register / Login | Upload Verification Documents |

#### Use Case Summary Table

| ID | Use Case | Actors | Relationship |
| :--- | :--- | :--- | :--- |
| **UC-01** | Register / Login | All actors | — |
| **UC-02** | Upload Verification Documents | Provider, Service Center | `<<extend>>` UC-01 |
| **UC-03** | Manage Vehicles | Customer | — |
| **UC-04** | Request Assistance | Customer | `<<include>>` UC-05, UC-07, UC-10 |
| **UC-05** | Confirm Location | Customer | `<<include>>` of UC-04 |
| **UC-06** | Set Location Manually | Customer | `<<extend>>` UC-05 |
| **UC-07** | Select Problem Type | Customer | `<<include>>` of UC-04 |
| **UC-08** | Answer Follow-up Questions | Customer | `<<extend>>` UC-04 |
| **UC-09** | Upload Photos | Customer | `<<extend>>` UC-04 |
| **UC-10** | Select Provider (Match & Dispatch) | Customer, Provider, System | `<<include>>` of UC-04 |
| **UC-11** | Track Provider | Customer | `<<include>>` UC-12 |
| **UC-12** | View ETA | Customer | `<<include>>` of UC-11 |
| **UC-13** | Chat / Call Provider | Customer, Provider | — |
| **UC-14** | Search & Book Service Center | Customer, Service Center | — |
| **UC-15** | Book Follow-up After Emergency | Customer | `<<extend>>` UC-14 |
| **UC-16** | Pay | Customer | `<<include>>` UC-17 |
| **UC-17** | Generate Invoice | Customer, System | `<<include>>` of UC-16 |
| **UC-18** | Pay Online | Customer | `<<extend>>` UC-16 |
| **UC-19** | Rate Provider | Customer | — |
| **UC-20** | View Service History | Customer | — |
| **UC-21** | Manage Availability | Provider | — |
| **UC-22** | Accept / Reject Request | Provider | — |
| **UC-23** | Update Request Status | Provider | `<<include>>` UC-24 |
| **UC-24** | Share Live Location | Provider | `<<include>>` of UC-23 |
| **UC-25** | View Earnings & History | Provider | — |
| **UC-26** | Manage Catalog & Working Hours | Service Center | — |
| **UC-27** | Accept / Reject Booking | Service Center | — |
| **UC-28** | Verify Providers & Centers | Admin | — |
| **UC-29** | Manage Users | Admin | — |
| **UC-30** | Moderate Reviews & Complaints | Admin | — |
| **UC-31** | View Reports | Admin | — |
| **UC-32** | Configure Platform | Admin | — |

---

### 2.3 Detailed Use Case Descriptions

> **Request Status Life-cycle:** `OPEN`, `ACCEPTED`, `EN_ROUTE`, `ARRIVED`, `IN_SERVICE`, `COMPLETED`, `PAID`, `CANCELLED`.  
> **Priority P0:** Denotes an injury/accident request that uses the expedited dispatch path.

#### Shared Use Cases (All Actors)

##### UC-01: Register / Login
* **Actors:** Customer, Service Provider, Service Center, Admin
* **Description:** Allows a user to create an account and verify their contact, then log in and out securely. After login, each user sees only the features of their own role.
* **Pre-conditions:**
  1. The user has downloaded the app or opened the website.
  2. For login: the account already exists.
* **Main Flow:**
  - **Registration:**
    1. The user selects a role and provides name, email/phone, and password.
    2. The system validates the input and checks that the email/phone is not already registered.
    3. The system sends an OTP to the provided contact method.
    4. The user enters the OTP.
    5. The system verifies the OTP, creates the account, and marks the contact as verified.
    6. Customer: the system opens the home screen. Provider / Service Center: the account is set to `PENDING_VERIFICATION` and the user continues to UC-02.
  - **Login:**
    7. The user enters email/phone and password.
    8. The system authenticates the user, starts a secure session, and shows only the features allowed for the user's role.
* **Alternative Flows:**
  - `2a.` Email/phone already registered: the system rejects the registration and offers login or password reset.
  - `3a.` OTP not received: the user requests a resend.
  - `4a.` Invalid or expired OTP: the system prompts for retry.
  - `7a.` Invalid credentials: the system shows an error and the user retries.
  - `7b.` Forgotten password: the user requests a reset, the system sends a reset code/link to the verified contact, and the user sets a new password.
  - `8a.` Provider / Service Center not yet approved by Admin: login succeeds, but the account cannot receive requests or bookings until approved.
  - `9.` Logout: the user can log out at any time and the system ends the session.
* **Post-conditions:** Customer account is created and contact is verified; the user is authenticated with a role-based session.
* **Relationships:** Extended by UC-02 (Provider and Service Center registration only).
* **Related Requirements:** FR-01, FR-02, FR-03, FR-04, FR-06, NFR-08, NFR-09

---

##### UC-02: Upload Verification Documents
* **Actors:** Service Provider, Service Center (primary); Admin (reviews in UC-28)
* **Description:** Providers and service centers submit their business/professional documents so that the Admin can verify them before they are allowed to receive requests.
* **Pre-conditions:**
  1. The user registered as Provider or Service Center (UC-01) and verified their contact.
* **Main Flow:**
  1. The system shows the list of required documents.
  2. The user selects or captures each document and uploads it.
  3. The system validates file type and size and stores the files securely.
  4. The user submits the documents for review.
  5. The system sets the account status to `PENDING_VERIFICATION` and adds it to the Admin's verification queue.
  6. The system informs the user that the account will be activated after approval.
* **Alternative Flows:**
  - `2a.` Weak or lost connection during upload: the upload is retried when the connection returns, without losing the files already selected.
  - `3a.` Unsupported file type or file too large: the system rejects the file with a message and the user uploads another.
  - `4a.` Required documents missing: the system blocks submission and highlights what is missing.
  - `5a.` Admin rejects the documents (UC-28): the user is notified with the reason and may upload corrected documents.
* **Post-conditions:** Documents are stored and the account is awaiting Admin verification.
* **Relationships:** `<<extend>>` UC-01: applies only when the registering user is a Provider or Service Center.
* **Related Requirements:** FR-02, FR-05, NFR-10, Section 6 (Legal Requirements), TBD-03

---

#### Customer Use Cases

##### UC-03: Manage Vehicles
* **Actors:** Customer
* **Description:** Lets the customer add, update, and delete the vehicles linked to their account. Vehicle data is used when requesting assistance and for per-vehicle service history.
* **Pre-conditions:**
  1. The customer is logged in.
* **Main Flow:**
  1. The customer opens *My Vehicles*.
  2. The customer selects *Add Vehicle* and enters make, model, year, and plate number.
  3. The system validates the data and saves the vehicle.
  4. The system shows the updated vehicle list.
  5. To update: the customer selects a vehicle, edits its data, and saves.
  6. To delete: the customer selects a vehicle and confirms; the system removes it from the list.
* **Alternative Flows:**
  - `3a.` Required field missing or invalid: the system shows an error beside the field and keeps the entered data.
  - `6a.` The vehicle has an active (not completed) request: the system blocks deletion and explains why.
  - `6b.` Deleting a vehicle does not remove its past service records from the customer's history.
* **Post-conditions:** The vehicle list is updated and the vehicle is available for selection in UC-04.
* **Relationships:** None.
* **Related Requirements:** FR-07, FR-08, FR-09

---

##### UC-04: Request Assistance
* **Actors:** Customer (primary); System, Service Provider (secondary)
* **Description:** The core use case. The customer asks for roadside help through a short guided flow: location, problem, follow-up details, and provider selection. The system recommends the assistance type and dispatches a verified provider.
* **Pre-conditions:**
  1. The customer is logged in.
  2. The customer has at least one registered vehicle (or adds one during the flow).
* **Main Flow:**
  1. The customer taps *Get Help* on the home screen; the system shows local emergency numbers on the intake screen.
  2. The customer selects the affected vehicle.
  3. The system performs Confirm Location (UC-05).
  4. The system performs Select Problem Type (UC-07).
  5. The system asks the follow-up questions (UC-08) and the customer may attach photos (UC-09).
  6. The system recommends the assistance type (towing, mechanic, battery service) from the answers and creates the request with status `OPEN`.
  7. The system performs Select Provider (UC-10): the customer reviews the ranked list with itemized estimates, selects a provider, and confirms.
  8. The provider accepts; the system sets the status to `ACCEPTED`, notifies the customer, and live tracking starts (UC-11).
* **Alternative Flows:**
  - `2a.` No vehicle saved: the customer adds one inline (UC-03) and continues.
  - `5a.` Injury or accident (P0): the system flags the request as P0, highlights the emergency numbers, skips the remaining questions (target: $\le 4\text{ taps}$), skips the provider list, and sends offers in parallel to the top 3 providers (see UC-10).
  - `6a.` Problem type is unknown: the system recommends general mechanic assistance and the provider diagnoses on site.
  - `7a.` No providers available: the system expands the search radius (see UC-10).
  - `*a.` Connection lost while submitting: the request is saved on the device and replayed automatically when the connection returns, without creating a duplicate.
  - `*b.` Customer cancels before completion: the system always asks for confirmation, and asks a second time if the request is urgent or already `ACCEPTED`; the status becomes `CANCELLED`.
* **Post-conditions:** A request exists and is assigned to a provider with status `ACCEPTED` (or the request is `CANCELLED`).
* **Relationships:** `<<include>>` UC-05 Confirm Location, UC-07 Select Problem Type, UC-10 Select Provider. `<<extend>>` by UC-08 Answer Follow-up Questions and UC-09 Upload Photos.
* **Related Requirements:** FR-10, FR-13, FR-14, FR-16, FR-19, NFR-01, NFR-05, NFR-06, NFR-07, NFR-13, NFR-15

---

##### UC-05: Confirm Location
* **Actors:** Customer
* **Description:** The system detects the customer's current position using GPS and the customer confirms it on a map.
* **Pre-conditions:**
  1. The Request Assistance flow has started (UC-04).
  2. Location permission is granted on the device.
* **Main Flow:**
  1. The system reads the device location using GPS.
  2. The system shows the detected position on a map with the address.
  3. The customer confirms the location.
  4. The system stores the confirmed location with the request.
* **Alternative Flows:**
  - `1a.` GPS unavailable, permission denied, or accuracy too low: the system offers Set Location Manually (UC-06).
  - `3a.` The detected position is wrong: the customer chooses to correct it (UC-06).
* **Post-conditions:** A confirmed location is attached to the request.
* **Relationships:** Included by UC-04. `<<extend>>` by UC-06 Set Location Manually.
* **Related Requirements:** FR-11, FR-12

---

##### UC-06: Set Location Manually
* **Actors:** Customer
* **Description:** The customer sets or corrects their location on the map when GPS is unavailable or inaccurate.
* **Pre-conditions:**
  1. Confirm Location (UC-05) is in progress.
  2. GPS is unavailable or the detected position is wrong.
* **Main Flow:**
  1. The customer opens the map selector.
  2. The customer searches for an address/landmark or drags the pin to the exact spot.
  3. The system shows the address of the selected point.
  4. The customer confirms the location.
  5. The system returns to UC-05 with the manual location.
* **Alternative Flows:**
  - `2a.` Address not found: the customer tries other search terms or drops the pin directly on the map.
  - `3a.` Address lookup is slow or unavailable: the system accepts the pin coordinates without the address text.
* **Post-conditions:** A manually chosen location is attached to the request.
* **Relationships:** `<<extend>>` UC-05 Confirm Location.
* **Related Requirements:** FR-12

---

##### UC-07: Select Problem Type
* **Actors:** Customer
* **Description:** The customer picks the type of problem from a short list so the system can classify the request.
* **Pre-conditions:**
  1. The Request Assistance flow has started (UC-04) and the location is confirmed.
* **Main Flow:**
  1. The system shows the problem types: flat tire, dead battery, out of fuel, mechanical problem, accident, locked out, unknown.
  2. The customer selects one type.
  3. The system records the problem type and moves on to the follow-up questions (UC-08).
* **Alternative Flows:**
  - `2a.` The customer selects accident: the system asks about injuries first and applies the P0 path if anyone is injured.
  - `2b.` The customer selects unknown: the flow continues and the follow-up questions help narrow the problem.
* **Post-conditions:** The problem type is stored in the request.
* **Relationships:** Included by UC-04.
* **Related Requirements:** FR-13

---

##### UC-08: Answer Follow-up Questions
* **Actors:** Customer
* **Description:** The system asks a few short questions (for example, whether the vehicle can move and whether anyone is injured) to understand the situation, recommend the assistance type, and set the priority.
* **Pre-conditions:**
  1. A problem type has been selected (UC-07).
* **Main Flow:**
  1. The system shows short questions based on the problem type, such as: is the vehicle movable, is anyone injured.
  2. The customer answers with single taps.
  3. The system stores the answers.
  4. The system uses the answers to recommend the assistance type (towing, mechanic, battery service) and to set the request priority.
* **Alternative Flows:**
  - `2a.` Someone is injured: the request is marked P0, the emergency numbers are shown, and the expedited dispatch path is used.
  - `2b.` The customer is not sure about an answer: the system continues with the most cautious assumption (for example, vehicle not movable).
* **Post-conditions:** Answers are stored; the assistance type and priority are determined.
* **Relationships:** `<<extend>>` UC-04 Request Assistance.
* **Related Requirements:** FR-14, FR-16, NFR-05

---

##### UC-09: Upload Photos
* **Actors:** Customer
* **Description:** The customer attaches photos of the vehicle problem to help the provider prepare.
* **Pre-conditions:**
  1. The Request Assistance flow is in progress (UC-04).
* **Main Flow:**
  1. The customer taps *Add Photos*.
  2. The customer takes a photo with the camera or picks one from the gallery.
  3. The system uploads the photo, attaches it to the request, and shows a thumbnail.
  4. The customer can remove a photo or add more.
* **Alternative Flows:**
  - `2a.` Camera permission denied: the system offers the gallery instead.
  - `3a.` Weak network or upload failure: the photo is queued and retried; the request continues without waiting for the upload.
  - `3b.` File too large or unsupported: the system compresses it or asks for another photo.
* **Post-conditions:** Photos are attached to the request and shown to the provider as part of the problem details.
* **Relationships:** `<<extend>>` UC-04 Request Assistance.
* **Related Requirements:** FR-15, NFR-15

---

##### UC-10: Select Provider (Match & Dispatch)
* **Actors:** Customer, System, Service Provider
* **Description:** The system finds and ranks nearby verified providers, shows the customer a transparent estimate, and sends the offer to the chosen provider. For P0 requests it skips the list and offers the job to the top 3 providers at once.
* **Pre-conditions:**
  1. An `OPEN` request exists with a confirmed location, problem type, and recommended assistance type.
  2. Verified, available (online) providers exist.
* **Main Flow:**
  1. The system finds nearby verified providers that are available and match the required assistance type.
  2. The system ranks them by distance, ETA, rating, and price.
  3. The system shows the ranked list with rating, distance, ETA, and an itemized estimated cost.
  4. The customer selects a provider and confirms the request.
  5. The system sends an offer notification to the provider.
  6. The provider accepts the offer (UC-22).
  7. The system sets the status to `ACCEPTED`, notifies the customer, and shares the customer's name, location, and vehicle info with the provider.
* **Alternative Flows:**
  - `1a.` No providers nearby: the system expands the search radius step by step; if still none, it informs the customer and shows the emergency numbers.
  - `2a.` The external distance/ETA service takes longer than $2\text{ seconds}$: the system falls back to straight-line distance estimates.
  - `3a.` P0 request: steps 3–4 are skipped; the system sends offers in parallel to the top 3 providers with a 15-second timeout. The first provider to accept gets the job and the other offers are withdrawn. If nobody accepts, the system widens the search and repeats.
  - `6a.` The provider rejects or the offer times out: the system notifies the customer and suggests the next provider (back to step 3).
* **Post-conditions:** The request is assigned to a specific provider and its status is `ACCEPTED`.
* **Relationships:** Included by UC-04. Uses UC-22 Accept / Reject Request on the provider side.
* **Related Requirements:** FR-17, FR-18, FR-19, FR-20, FR-21, FR-22, FR-35, NFR-02, NFR-05, NFR-10, NFR-12

---

##### UC-11: Track Provider
* **Actors:** Customer (primary); Service Provider, System (secondary)
* **Description:** After a provider accepts, the customer follows the provider's live position on a map and is notified of every status change until the provider arrives.
* **Pre-conditions:**
  1. The request status is `ACCEPTED`.
* **Main Flow:**
  1. The provider starts moving toward the customer (the provider sets `EN_ROUTE` in UC-23).
  2. The provider's device sends its location every $5\text{--}10\text{ seconds}$ (UC-24).
  3. The system updates the customer's map with the provider's position and shows the ETA (UC-12).
  4. The provider updates the status to `EN_ROUTE` and then `ARRIVED`.
  5. The system notifies the customer of each status change (push and in-app).
* **Alternative Flows:**
  - `2a.` The provider loses connection: the system shows a "last seen" message and switches to ETA-only mode until updates resume.
  - `3a.` The customer's own connection drops: the map refreshes to the latest position as soon as the connection returns.
  - `5a.` The customer needs to cancel while tracking: the system requires a confirmation, and a second confirmation because the request is `ACCEPTED`.
* **Post-conditions:** The provider reaches the customer and the status is `ARRIVED`.
* **Relationships:** `<<include>>` UC-12 View ETA. Depends on UC-23 and UC-24 on the provider side.
* **Related Requirements:** FR-23, FR-24, FR-25, FR-26, NFR-03, NFR-07, NFR-15

---

##### UC-12: View ETA
* **Actors:** Customer, System
* **Description:** The system calculates and shows the provider's estimated time of arrival and keeps it up to date while the provider is on the way.
* **Pre-conditions:**
  1. Track Provider (UC-11) is in progress and the request status is `ACCEPTED` or `EN_ROUTE`.
* **Main Flow:**
  1. The system takes the provider's latest position and the customer's confirmed location.
  2. The system calculates the ETA using the maps service.
  3. The system shows the ETA on the tracking screen.
  4. Each time a new provider position arrives, the system recalculates and refreshes the ETA.
* **Alternative Flows:**
  - `2a.` The maps service is slow (over $2\text{ seconds}$) or unavailable: the system shows a straight-line estimate marked as approximate.
  - `4a.` Provider position updates stop: the system keeps showing the last ETA with a "last seen" note (ETA-only mode).
* **Post-conditions:** The customer sees an up-to-date ETA.
* **Relationships:** Included by UC-11.
* **Related Requirements:** FR-18, FR-25, NFR-02, NFR-03

---

##### UC-13: Chat / Call Provider
* **Actors:** Customer, Service Provider
* **Description:** The customer and the provider communicate directly during the service: in-app chat (including sharing the exact location) and calling the provider from the app.
* **Pre-conditions:**
  1. The request is `ACCEPTED` and not yet `COMPLETED`.
  2. Both users are logged in.
* **Main Flow:**
  - **Chat:**
    1. The customer opens the chat from the tracking screen.
    2. The customer types a message (or shares the exact location, see step 5) and sends it.
    3. The system delivers the message in real time to the provider and sends a push notification if the provider is away from the chat.
    4. The provider reads and replies; the system delivers the reply to the customer.
    5. To share the exact location, the customer taps *Share Location* and the system sends the current position as a map message.
  - **Call:**
    6. The customer taps *Call*; the system opens the phone dialer with the provider's number.
* **Alternative Flows:**
  - `3a.` The recipient is offline or the network is weak: the message is queued and delivered when the connection returns.
  - `5a.` GPS unavailable: the customer shares the location confirmed in UC-05/UC-06 instead.
  - `6a.` The call cannot be placed or is not answered: the customer continues using chat.
  - `*a.` After the request is `COMPLETED` or `CANCELLED`: chat becomes read-only and the call option is disabled.
* **Post-conditions:** Messages are stored with the request; the provider has the information needed to reach the customer.
* **Relationships:** None.
* **Related Requirements:** FR-27, FR-28, FR-29, NFR-12

---

##### UC-14: Search & Book Service Center
* **Actors:** Customer, Service Center, System
* **Description:** The customer finds a nearby service center for maintenance or repair and books an appointment, either after an emergency or independently.
* **Pre-conditions:**
  1. The customer is logged in.
  2. Service centers have published their working hours and services (UC-26).
* **Main Flow:**
  1. The customer opens *Service Centers* and searches for nearby centers.
  2. The system lists centers with distance, rating, and services.
  3. The customer filters by service type, rating, and distance.
  4. The customer selects a center, a service, and an available time slot.
  5. The customer submits the booking request; the system creates it with status `PENDING`, holds the slot temporarily, and notifies the center.
  6. The center accepts the booking (UC-27).
  7. The system sets the booking to `CONFIRMED` and notifies the customer.
* **Alternative Flows:**
  - `2a.` No centers found in the area: the system widens the search radius or suggests changing the filters.
  - `4a.` No free time slot: the customer chooses another day, another service, or another center.
  - `6a.` The center rejects the booking or does not respond in time: the booking expires, the slot is released, and the system notifies the customer and suggests other centers.
  - `7a.` The customer cancels the booking: the system asks for confirmation, then notifies the center.
* **Post-conditions:** An appointment is booked and confirmed with the selected center, service, and time slot, without double-booking.
* **Relationships:** `<<extend>>` by UC-15 Book Follow-up After Emergency. Uses UC-27 Accept / Reject Booking on the service center side.
* **Related Requirements:** FR-30, FR-31, FR-32, FR-33, FR-34

---

##### UC-15: Book Follow-up After Emergency
* **Actors:** Customer, Service Center
* **Description:** After an emergency request is finished, the system offers the customer a quick way to book a service center for the repair or maintenance the vehicle still needs.
* **Pre-conditions:**
  1. An emergency request for the customer is `COMPLETED`.
  2. The customer is logged in.
* **Main Flow:**
  1. After the service is completed, the system offers to book a follow-up at a service center.
  2. The customer accepts the offer.
  3. The system opens Search & Book Service Center (UC-14) with the vehicle and the problem type from the emergency request already filled in.
  4. The customer completes the booking as in UC-14.
  5. The system links the booking to the original request.
* **Alternative Flows:**
  - `2a.` The customer declines: the flow ends, and the customer can still book later through UC-14.
  - `4a.` The booking cannot be completed (no slot or rejection): the customer follows the alternative flows of UC-14.
* **Post-conditions:** A follow-up booking is confirmed and linked to the original emergency request.
* **Relationships:** `<<extend>>` UC-14 Search & Book Service Center.
* **Related Requirements:** FR-30, FR-32, Section 4.7

---

##### UC-16: Pay
* **Actors:** Customer
* **Description:** The customer reviews the total cost of the completed service, chooses a payment method (cash or online), and receives an invoice.
* **Pre-conditions:**
  1. The provider has set the request status to `COMPLETED`.
* **Main Flow:**
  1. The system calculates the total cost of the service, including any additional approved parts (FR-35).
  2. The system shows the service summary and total to the customer.
  3. The customer chooses a payment method: cash or online.
  4. For cash: the customer pays the provider and both confirm the cash transaction in the app.
  5. For online: the system runs Pay Online (UC-18).
  6. The system verifies the payment, sets the status to `PAID`, records it in the transaction log, and generates the invoice/receipt (UC-17).
  7. The system closes the request and invites the customer to rate the provider (UC-19).
* **Alternative Flows:**
  - `2a.` The customer disagrees with the total: the customer can report the issue as a complaint (reviewed by Admin in UC-30).
  - `4a.` One side does not confirm the cash transaction: the request stays unpaid and the system reminds both users.
  - `5a.` Online payment fails: the customer retries or switches to cash.
* **Post-conditions:** The service is paid (`PAID`), the receipt is generated, and the service is added to the vehicle history.
* **Relationships:** `<<include>>` UC-17 Generate Invoice. `<<extend>>` by UC-18 Pay Online.
* **Related Requirements:** FR-35, FR-36, FR-37, NFR-11, TBD-01

---

##### UC-17: Generate Invoice
* **Actors:** Customer, System
* **Description:** The system produces an invoice/receipt for every completed payment and stores it with the request.
* **Pre-conditions:**
  1. The payment has been completed (online) or confirmed by both sides (cash) in UC-16.
* **Main Flow:**
  1. The system compiles the invoice: invoice number, date, customer, provider, vehicle, itemized charges, total, and payment method.
  2. The system saves the invoice with the request.
  3. The system shows the invoice to the customer and sends a copy by in-app notification.
* **Alternative Flows:**
  - `1a.` Invoice generation fails: the payment stays recorded, the system retries in the background, and the customer is notified when the invoice is ready.
* **Post-conditions:** The invoice is stored and visible in the customer's service history.
* **Relationships:** Included by UC-16.
* **Related Requirements:** FR-37, FR-44, NFR-11

---

##### UC-18: Pay Online
* **Actors:** Customer, Payment Gateway (external system)
* **Description:** The customer pays the service cost online through a secure payment gateway. FixNGo does not store card data.
* **Pre-conditions:**
  1. UC-16 is in progress and the customer selected online payment.
* **Main Flow:**
  1. The system creates a payment session with the gateway for the total amount and the request reference.
  2. The customer enters payment details on the gateway's secure form.
  3. The gateway processes the payment and returns the result.
  4. The system verifies the result, records the transaction in the immutable audit log, and marks the request as paid.
  5. The system returns to UC-16 to generate the invoice.
* **Alternative Flows:**
  - `1a.` Gateway unavailable: the system informs the customer and offers cash payment.
  - `3a.` Payment declined: the system shows the reason and the customer retries or switches to cash.
  - `3b.` Connection lost during payment: the system checks the payment status with the gateway before allowing a retry, so the customer is never charged twice.
* **Post-conditions:** The online payment is completed and logged.
* **Relationships:** `<<extend>>` UC-16 Pay.
* **Related Requirements:** FR-36, FR-38, NFR-08, NFR-11, TBD-02

---

##### UC-19: Rate Provider
* **Actors:** Customer
* **Description:** After the service, the customer rates the provider from 1 to 5 stars and may write a text review. Ratings help other customers choose.
* **Pre-conditions:**
  1. The request is `COMPLETED` and paid (UC-16).
* **Main Flow:**
  1. The system shows the rating screen after payment.
  2. The customer selects a rating from 1 to 5 stars.
  3. The customer optionally writes a text review.
  4. The customer submits.
  5. The system saves the rating and review and updates the provider's average rating shown to other customers.
* **Alternative Flows:**
  - `2a.` The customer skips the rating: the request stays closed and the customer can still rate later from the service history.
  - `4a.` The request was already rated: the system does not allow a second rating.
  - `5a.` A review is reported or flagged as inappropriate: Admin handles it in UC-30.
* **Post-conditions:** The rating is stored and the provider's average rating is updated.
* **Relationships:** None.
* **Related Requirements:** FR-39, FR-40, FR-41, FR-42

---

##### UC-20: View Service History
* **Actors:** Customer
* **Description:** The customer reviews past requests and their details, per vehicle or overall.
* **Pre-conditions:**
  1. The customer is logged in.
* **Main Flow:**
  1. The customer opens *Service History*.
  2. The system lists the customer's completed requests, newest first, optionally filtered by vehicle.
  3. The customer selects a request.
  4. The system shows its details: date, service type, location, cost, rating given, and the invoice.
* **Alternative Flows:**
  - `2a.` No completed requests yet: the system shows an empty-state message.
* **Post-conditions:** None (read-only).
* **Relationships:** None.
* **Related Requirements:** FR-09, FR-43, FR-44

---

#### Service Provider Use Cases

##### UC-21: Manage Availability
* **Actors:** Service Provider
* **Description:** The provider turns availability on or off so that the system only offers requests to providers who can actually take them.
* **Pre-conditions:**
  1. The provider is logged in.
  2. The provider account has been verified and approved by Admin (UC-28).
* **Main Flow:**
  1. The provider opens the dashboard.
  2. The provider switches the status to *Online* (available).
  3. The system records the status, starts using the provider's location, and makes the provider eligible for matching (UC-10).
  4. When the provider is no longer available, the provider switches to *Offline*.
  5. The system stops sending offers to the provider.
* **Alternative Flows:**
  - `2a.` Account not yet verified: the system blocks going Online and explains that approval is pending.
  - `4a.` The provider has an active request: the system keeps the provider unavailable for new offers and does not allow going Offline until the request is completed or cancelled.
  - `*a.` The provider's app stops reporting for a period (connection lost): the system treats the provider as unavailable until the app reconnects.
* **Post-conditions:** The provider's availability status is updated and drives matching.
* **Relationships:** None.
* **Related Requirements:** FR-05, FR-17, NFR-10, Section 2.7

---

##### UC-22: Accept / Reject Request
* **Actors:** Service Provider, System
* **Description:** The provider receives an offer for an assistance request and accepts or rejects it within the offer timeout.
* **Pre-conditions:**
  1. The provider is Online and verified.
  2. The system has sent an offer to the provider (UC-10).
* **Main Flow:**
  1. The provider receives the offer by push notification and in the app.
  2. The provider reviews the problem type, distance, and estimated cost.
  3. The provider accepts the offer before it times out.
  4. The system assigns the request to the provider, sets the status to `ACCEPTED`, and notifies the customer.
  5. The system reveals the customer's name, exact location, and vehicle info to the provider.
  6. The provider starts moving and updates the status (UC-23).
* **Alternative Flows:**
  - `3a.` The provider rejects the offer: the system notifies the customer and offers the next provider (UC-10).
  - `3b.` The offer times out ($15\text{ seconds}$ for P0 requests): it is treated as a rejection.
  - `3c.` P0 parallel offers: another provider accepted first, so the system withdraws this offer and informs the provider.
  - `3d.` The provider's connection is lost: the offer expires through the timeout.
* **Post-conditions:** 
  - *Accepted:* the request is assigned to the provider with status `ACCEPTED`.
  - *Rejected or expired:* the request goes back to matching.
* **Relationships:** Used by UC-10 Select Provider (Match & Dispatch).
* **Related Requirements:** FR-20, FR-21, FR-22, NFR-05, NFR-12

---

##### UC-23: Update Request Status
* **Actors:** Service Provider; Customer (notified)
* **Description:** The provider moves the request through its lifecycle so the customer always knows what is happening. Each change notifies the customer.
* **Pre-conditions:**
  1. The request status is `ACCEPTED` and assigned to this provider.
* **Main Flow:**
  1. The provider taps *Start Trip*; the system sets `EN_ROUTE` and starts live location sharing (UC-24).
  2. On arrival, the provider taps *Arrived*; the system sets `ARRIVED` and notifies the customer.
  3. The provider starts the work and taps *Start Service*; the system sets `IN_SERVICE`.
  4. When finished, the provider taps *Complete*; the system sets `COMPLETED` and starts the payment step (UC-16).
  5. At every change, the system checks the change is a valid next step, stores it with a timestamp, and notifies the customer.
* **Alternative Flows:**
  - `*a.` Weak network: the update is stored on the device and sent in order when the connection returns, with no loss or duplicates.
  - `*b.` Invalid change (for example, Complete before Arrived): the system rejects it and shows the allowed next step.
  - `*c.` The customer cancels (after confirmation): the system sets `CANCELLED` and notifies the provider, who stops the trip.
* **Post-conditions:** The request holds the latest status (`EN_ROUTE`, `ARRIVED`, `IN_SERVICE`, or `COMPLETED`) and the customer has been notified.
* **Relationships:** `<<include>>` UC-24 Share Live Location.
* **Related Requirements:** FR-24, FR-26, NFR-15

---

##### UC-24: Share Live Location
* **Actors:** Service Provider, System
* **Description:** The provider's device sends its position at a regular interval so the customer can follow the provider on the map.
* **Pre-conditions:**
  1. The provider set the request to `EN_ROUTE` (UC-23).
  2. Location permission is granted on the provider's device.
* **Main Flow:**
  1. The provider's app reads the device location every $5\text{--}10\text{ seconds}$.
  2. The app sends the position to the system.
  3. The system stores the latest position and pushes it in real time to the customer's map (UC-11) and to the ETA calculation (UC-12).
  4. Sharing continues until the status becomes `ARRIVED` (or the request is `CANCELLED`), then stops.
* **Alternative Flows:**
  - `1a.` Location permission denied or GPS off: the app asks the provider to enable it before continuing the trip.
  - `2a.` Connection lost: the app keeps trying, sends the newest position on reconnect, and the customer sees "last seen" meanwhile.
* **Post-conditions:** The customer sees a fresh provider position; sharing stops when the trip ends.
* **Relationships:** Included by UC-23.
* **Related Requirements:** FR-23, NFR-03, NFR-15

---

##### UC-25: View Earnings & History
* **Actors:** Service Provider
* **Description:** The provider reviews completed services, earnings, and customer ratings.
* **Pre-conditions:**
  1. The provider is logged in.
* **Main Flow:**
  1. The provider opens *Earnings & History*.
  2. The system shows total earnings for the selected period and the list of completed services.
  3. The provider selects a service.
  4. The system shows its details: date, service type, amount, and the rating received.
* **Alternative Flows:**
  - `2a.` No completed services yet: the system shows an empty-state message.
* **Post-conditions:** None (read-only).
* **Relationships:** None.
* **Related Requirements:** FR-45, FR-41

---

#### Service Center Use Cases

##### UC-26: Manage Catalog & Working Hours
* **Actors:** Service Center
* **Description:** The service center publishes the services it offers with their prices and sets its working hours, which customers see when searching and booking.
* **Pre-conditions:**
  1. The service center is logged in.
  2. The service center has been verified and approved by Admin.
* **Main Flow:**
  1. The center opens *Catalog & Working Hours*.
  2. The center adds, edits, or removes a service (name and price).
  3. The center sets its working days and hours.
  4. The center saves.
  5. The system validates the data and publishes it, so the center appears with up-to-date services, prices, and available time slots in UC-14.
* **Alternative Flows:**
  - `2a.` Removing a service that has pending or confirmed bookings: the system warns and lists the affected bookings first.
  - `3a.` A working-hours change conflicts with confirmed bookings: the system warns the center and lists the affected bookings.
  - `5a.` Invalid data (empty name, invalid price, closing time before opening time): the system shows an error and keeps the entered data.
* **Post-conditions:** Services, prices, and working hours are saved and visible to customers.
* **Relationships:** Feeds UC-14 Search & Book Service Center.
* **Related Requirements:** FR-34, FR-30, FR-31, FR-32

---

##### UC-27: Accept / Reject Booking
* **Actors:** Service Center; Customer (notified)
* **Description:** The service center responds to a booking request from a customer.
* **Pre-conditions:**
  1. A booking with status `PENDING` exists for the center (UC-14).
* **Main Flow:**
  1. The center receives a notification of the new booking request.
  2. The center reviews the service, vehicle, and requested time slot.
  3. The center accepts the booking.
  4. The system sets the booking to `CONFIRMED` and notifies the customer.
* **Alternative Flows:**
  - `3a.` The center rejects the booking (optionally with a reason): the system sets it to `REJECTED` and notifies the customer, who can pick another center.
  - `3b.` No response in time: the system expires the booking, releases the held slot, and notifies the customer.
  - `3c.` The slot was taken or the center's hours changed in the meantime: the system warns the center and suggests an alternative time.
* **Post-conditions:** The booking is `CONFIRMED`, or `REJECTED`/expired and the customer has been notified.
* **Relationships:** Used by UC-14 Search & Book Service Center.
* **Related Requirements:** FR-33

---

#### Admin Use Cases

##### UC-28: Verify Providers & Centers
* **Actors:** Admin
* **Description:** The Admin reviews registration data and documents of providers and service centers and approves or rejects them. Only approved accounts can receive requests or bookings.
* **Pre-conditions:**
  1. The Admin is logged in.
  2. At least one account is in `PENDING_VERIFICATION` with documents submitted (UC-02).
* **Main Flow:**
  1. The Admin opens the verification queue.
  2. The Admin selects an application.
  3. The Admin reviews the account data and the uploaded documents.
  4. The Admin approves the account.
  5. The system sets the account to `VERIFIED`, enables it for dispatch or bookings, records the decision (admin and time), and notifies the user.
* **Alternative Flows:**
  - `4a.` The Admin rejects the account with a reason: the system notifies the user, who may resubmit documents (UC-02).
  - `4b.` Documents are unclear or incomplete: the Admin requests additional documents and the account stays `PENDING_VERIFICATION`.
* **Post-conditions:** The account is `VERIFIED` (can receive requests/bookings) or `REJECTED` / still pending.
* **Relationships:** Handles the submissions from UC-02.
* **Related Requirements:** FR-05, NFR-10, TBD-03

---

##### UC-29: Manage Users
* **Actors:** Admin
* **Description:** The Admin views and manages customer, provider, and service center accounts.
* **Pre-conditions:**
  1. The Admin is logged in.
* **Main Flow:**
  1. The Admin opens the users dashboard and searches or filters by role and status.
  2. The Admin opens a user's profile.
  3. The Admin reviews the account details and activity.
  4. The Admin suspends, reactivates, or removes the account.
  5. The system applies the change, records it, and notifies the user.
* **Alternative Flows:**
  - `4a.` The user has an active request or booking: the system warns the Admin before applying the change.
  - `5a.` A suspended user tries to log in: the system denies access and shows that the account is suspended.
* **Post-conditions:** The user account status is updated and enforced across the platform.
* **Relationships:** None.
* **Related Requirements:** FR-04, FR-05, NFR-09

---

##### UC-30: Moderate Reviews & Complaints
* **Actors:** Admin
* **Description:** The Admin reviews reported or inappropriate reviews and customer/provider complaints and takes action.
* **Pre-conditions:**
  1. The Admin is logged in.
  2. At least one review or complaint is waiting for review.
* **Main Flow:**
  1. The Admin opens the reviews and complaints queue.
  2. The Admin selects an item and reads the review or complaint with its request context.
  3. The Admin decides: keep the review, hide/remove it, or resolve the complaint.
  4. The system applies the decision (recalculating the provider's average rating if a review is removed) and records it.
  5. The system notifies the reporter and, where relevant, the affected user.
* **Alternative Flows:**
  - `3a.` The complaint shows serious misconduct: the Admin takes account action through UC-29 (for example, suspension).
  - `3b.` More information is needed: the item stays open and the Admin contacts the parties.
* **Post-conditions:** The item is resolved and the platform data (ratings, account status) reflects the decision.
* **Relationships:** Handles reports from UC-16 and UC-19; can lead to UC-29.
* **Related Requirements:** FR-42

---

##### UC-31: View Reports
* **Actors:** Admin
* **Description:** The Admin views platform statistics to monitor how the system and the service are performing.
* **Pre-conditions:**
  1. The Admin is logged in.
* **Main Flow:**
  1. The Admin opens *Reports*.
  2. The Admin selects the report type and the period (for example: requests by status, number of active providers, payments, ratings).
  3. The system collects the data and shows it as tables and charts.
* **Alternative Flows:**
  - `3a.` No data for the selected period: the system shows an empty-state message.
* **Post-conditions:** None (read-only).
* **Relationships:** None.
* **Related Requirements:** Section 3.1, FR-04

---

##### UC-32: Configure Platform
* **Actors:** Admin
* **Description:** The Admin manages platform-wide settings that affect how the system behaves.
* **Pre-conditions:**
  1. The Admin is logged in with permission to change settings.
* **Main Flow:**
  1. The Admin opens *Platform Settings*.
  2. The Admin selects a setting group: emergency contact numbers per country, pricing rules, matching parameters (search radius, offer timeout), or payment methods.
  3. The Admin edits the values and saves.
  4. The system validates the values and applies them to new requests (requests already in progress are not changed).
  5. The system records the change (admin, time, old and new value).
* **Alternative Flows:**
  - `4a.` Invalid value (for example, a negative price or an empty emergency number): the system rejects the change and keeps the old value.
* **Post-conditions:** The new configuration is active and the change is logged.
* **Relationships:** None.
* **Related Requirements:** NFR-06, NFR-05, TBD-01, TBD-04

---

## 3. Functional & Non-Functional Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority |
| :--- | :--- | :--- |
| **Authentication & Authorization** | | |
| **FR-01** | Customers can register with name, email/phone, and password. | Must Have |
| **FR-02** | Providers and service centers can register and submit verification documents. | Must Have |
| **FR-03** | All users can log in and log out securely. | Must Have |
| **FR-04** | Role-based access: each role sees only its own features. | Must Have |
| **FR-05** | Admin verifies and approves providers and centers before they receive requests. | Must Have |
| **FR-06** | Users can reset a forgotten password. | Must Have |
| **Vehicle Management** | | |
| **FR-07** | Customers can add one or more vehicles (make, model, year, plate). | Must Have |
| **FR-08** | Customers can update or delete vehicle information. | Must Have |
| **FR-09** | The system keeps a service history for each vehicle. | Must Have |
| **Request Emergency Assistance** | | |
| **FR-10** | Customers can request roadside assistance. | Must Have |
| **FR-11** | The system detects the customer's location using GPS. | Must Have |
| **FR-12** | Customers can set their location manually on a map if GPS is unavailable. | Must Have |
| **FR-13** | Customers select the problem type (flat tire, dead battery, out of fuel, mechanical, accident, locked out, unknown). | Must Have |
| **FR-14** | The system asks follow-up questions (movable vehicle, injuries). | Must Have |
| **FR-15** | Customers can upload photos of the problem. | Must Have |
| **FR-16** | The system recommends the assistance type (towing, mechanic, battery service) from the answers. | Must Have |
| **Provider Matching** | | |
| **FR-17** | The system lists nearby available providers matching the assistance type. | Must Have |
| **FR-18** | Each provider shows rating, distance, ETA, and estimated cost. | Must Have |
| **FR-19** | Customers select a provider and confirm the request. | Must Have |
| **FR-20** | The system notifies the selected provider. | Must Have |
| **FR-21** | Providers can accept or reject the request. | Must Have |
| **FR-22** | On rejection, the system notifies the customer and suggests another provider. | Must Have |
| **Live Tracking** | | |
| **FR-23** | The customer sees the provider's live location on a map after acceptance. | Must Have |
| **FR-24** | The request status updates as the provider moves (On The Way, Arrived). | Must Have |
| **FR-25** | The customer sees the estimated arrival time. | Must Have |
| **FR-26** | Providers can update the status manually (Arrived, In Service, Completed). | Must Have |
| **Communication** | | |
| **FR-27** | Customers can call the provider from the app. | Should Have |
| **FR-28** | Customer and provider can chat in the app. | Should Have |
| **FR-29** | Customers can share their exact location through the chat. | Should Have |
| **Service Centers** | | |
| **FR-30** | Customers can search nearby service centers. | Must Have |
| **FR-31** | Customers can filter centers by service type, rating, and distance. | Must Have |
| **FR-32** | Customers can book an appointment at a center. | Must Have |
| **FR-33** | Centers can accept or reject booking requests. | Must Have |
| **FR-34** | Centers manage their working hours, services, and prices. | Must Have |
| **Payment** | | |
| **FR-35** | The system calculates the total cost of the service. | Must Have |
| **FR-36** | Customers choose a payment method (cash or online). | Must Have |
| **FR-37** | The system generates an invoice/receipt after payment. | Must Have |
| **FR-38** | Online payments are processed securely through a payment gateway. | Must Have |
| **Rating & Reviews** | | |
| **FR-39** | Customers rate the provider from 1 to 5 stars after service. | Should Have |
| **FR-40** | Customers can write a text review. | Should Have |
| **FR-41** | The provider's average rating is shown to other customers. | Should Have |
| **FR-42** | Admin monitors reviews and handles reported or inappropriate ones. | Should Have |
| **Service History** | | |
| **FR-43** | Every completed request is saved in the customer's history. | Should Have |
| **FR-44** | Customers can view past request details (date, type, location, cost, rating). | Should Have |
| **FR-45** | Providers can view their completed services and earnings. | Should Have |

---

### 3.2 Non-Functional Requirements

| ID | Category | Requirement | Measure |
| :--- | :--- | :--- | :--- |
| **NFR-01** | Performance | Respond to an assistance request within $5\text{ s}$ | $p95 \le 5\text{ s}$ to first offer sent |
| **NFR-02** | Performance | Show nearby providers within $10\text{ s}$ | $p95 \le 10\text{ s}$; external distance call capped at $2\text{ s}$ with fallback |
| **NFR-03** | Performance | Update live location every $5\text{--}10\text{ s}$ | Position update interval $\le 10\text{ s}$ worst case |
| **NFR-04** | Performance | Support 1,000 concurrent users | $p95$ degradation $\le 20\%$ vs. baseline |
| **NFR-05** | Safety | Prioritize accident/emergency requests | P0: parallel offers to top 3 providers, $15\text{ s}$ offer timeout |
| **NFR-06** | Safety | Display emergency contact numbers | Shown on the intake screen, configurable per country |
| **NFR-07** | Safety | No accidental cancellation | Confirmation step always; second confirmation for urgent or accepted requests |
| **NFR-08** | Security | Encrypt sensitive data in transit and at rest | TLS 1.2+, database encryption, no card data stored |
| **NFR-09** | Security | Restrict features by role | Policy-based RBAC; authorization matrix tested on every release |
| **NFR-10** | Security | Verify providers and centers before requests | Admin-gated; unverified accounts never receive dispatches |
| **NFR-11** | Security | Log all payment transactions | Immutable audit log, no gaps |
| **NFR-12** | Security | Share customer data only as needed | Name, location, vehicle info shared only after acceptance |
| **NFR-13** | Usability | Simple, minimal-step interface | $\le 8\text{ taps} / \le 60\text{ s}$ standard; $\le 4\text{ taps}$ injury path |
| **NFR-14** | Availability | Available 24/7 | $\ge 99.5\%$ monthly in v1 |
| **NFR-15** | Reliability | No data loss on brief interruptions | Idempotent, replayable requests; $\ge 95\%$ successful replay |
| **NFR-16** | Scalability | Support growth in users, providers, centers | Stateless web tier, horizontal scale-out |
| **NFR-17** | Maintainability | Modular architecture | One module = one service interface + one test suite |
| **NFR-18** | Compatibility | Work on mobile, tablet, desktop browsers | Responsive at 360 / 768 / 1024 / 1440 px; last 2 browser versions |

---

## 4. Software Architecture

### 4.1 Architectural Style: N-Tier (Layered) Modular Monolith
FixNGo uses a strict N-tier architecture with four tiers plus an integration layer. We chose it over microservices because the domain is a single bounded context with strong transactional coupling between request state, assignment, and payment. It gives the modularity we need at the lowest coordination cost, and services can still be extracted later.

| Tier | Project | Responsibility |
| :--- | :--- | :--- |
| **Presentation** | `FixNGo.Web` (ASP.NET Core MVC, Razor, responsive JS, SignalR hubs) | Controllers, views, real-time transport, localization. No business rules |
| **Application / Business Logic** | `FixNGo.Application` + `FixNGo.Domain` | Services (Intake, Matching, Dispatch, Tracking, Chat, Booking, Payment, Rating, Verification, Account), entities, state machines |
| **Data Access + Integration** | `FixNGo.Infrastructure` | EF Core DbContext, repositories, Unit of Work, adapters for Google Maps, payment gateway, FCM, Redis cache, background workers |
| **Persistence** | SQL Server (+ Redis cache, blob storage) | Tables, spatial indexes, constraints, audit data |

> **Dependency Rules:**
> - `Domain` references nothing.
> - `Application` never references `Infrastructure` or `Web`.
> - Only `Infrastructure` uses EF Core.
> - Controllers call application services, never repositories directly.

### 4.2 Technology Stack

| Concern | Technology |
| :--- | :--- |
| **Backend** | ASP.NET Core (.NET), Entity Framework Core |
| **Database** | SQL Server |
| **Real-time (tracking, chat)** | SignalR (WebSockets with fallbacks) |
| **Maps, geocoding, ETA** | Google Maps Platform |
| **Push notifications** | Firebase Cloud Messaging (FCM) |
| **Payments** | Payment gateway behind an interface (provider not yet chosen, TBD-02) |
| **Caching** | In-memory cache + Redis |
| **Client** | Responsive web app / installable PWA |

### 4.3 Key Design Patterns

| Pattern | Purpose |
| :--- | :--- |
| **Repository + Unit of Work** | Separate services from data access; one transaction per use case |
| **Strategy / Adapter** | Swap payment, map, and ETA providers; fallbacks when a service is down |
| **State Machine** | Controlled transitions for request, booking, and verification states |
| **Outbox** | Reliable event publishing that survives crashes |
| **Idempotency keys** | Safe retries on weak networks without duplicates |
| **Dependency Injection** | Constructor injection with explicit lifetimes (Scoped, Singleton, Transient) |