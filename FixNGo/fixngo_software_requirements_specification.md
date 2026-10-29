# Software Requirements Specification
## for
# FixNGo - An Integrated Vehicle Roadside Assistance and Car Care Platform

**Version:** 1.0  
**Date:** 12th September 2026  
**Supervised by:** Eng. Abdelrahman Shaaban  
**Program:** A DEPI Training Project - Digital Egypt Pioneers Initiative  

### Prepared by:
* Haneen Alaa
* Doaa Mohamed
* Youssef Sherif
* Mohamed Ayman
* Shaaban Sayed
* Asser Khairallah

---

## Table of Contents
1. [Introduction](#1-introduction)
   - [1.1 Purpose](#11-purpose)
   - [1.2 Document Conventions](#12-document-conventions)
   - [1.3 Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
   - [1.4 Product Scope](#14-product-scope)
   - [1.5 References](#15-references)
2. [Overall Description](#2-overall-description)
   - [2.1 Product Perspective](#21-product-perspective)
   - [2.2 Product Functions](#22-product-functions)
   - [2.3 User Classes and Characteristics](#23-user-classes-and-characteristics)
   - [2.4 Operating Environment](#24-operating-environment)
   - [2.5 Design and Implementation Constraints](#25-design-and-implementation-constraints)
   - [2.6 User Documentation](#26-user-documentation)
   - [2.7 Assumptions and Dependencies](#27-assumptions-and-dependencies)
3. [External Interface Requirements](#3-external-interface-requirements)
   - [3.1 User Interfaces](#31-user-interfaces)
   - [3.2 Hardware Interfaces](#32-hardware-interfaces)
   - [3.3 Software Interfaces](#33-software-interfaces)
   - [3.4 Communications Interfaces](#34-communications-interfaces)
4. [System Features](#4-system-features)
   - [4.1 Authentication and Authorization](#41-authentication-and-authorization)
   - [4.2 Vehicle Management](#42-vehicle-management)
   - [4.3 Request Emergency Assistance](#43-request-emergency-assistance)
   - [4.4 Provider Matching (Find Nearby Providers)](#44-provider-matching-find-nearby-providers)
   - [4.5 Live Tracking](#45-live-tracking)
   - [4.6 Communication (Chat/Call)](#46-communication-chat--call)
   - [4.7 Service Centers (Search & Booking)](#47-service-centers-search--booking)
   - [4.8 Payment](#48-payment)
   - [4.9 Rating & Reviews](#49-rating--reviews)
   - [4.10 Service History](#410-service-history)
5. [Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
   - [5.1 Performance Requirements](#51-performance-requirements)
   - [5.2 Safety Requirements](#52-safety-requirements)
   - [5.3 Security Requirements](#53-security-requirements)
   - [5.4 Software Quality Attributes](#54-software-quality-attributes)
6. [Other Requirements](#6-other-requirements)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Analysis Models](#appendix-b-analysis-models)
- [Appendix C: To Be Determined List](#appendix-c-to-be-determined-list)

---

## 1. Introduction

### 1.1 Purpose
The purpose of the software is to provide drivers with a platform to get help when their vehicle breaks down on the road. Normally, when a car breaks down, drivers struggle to find a nearby mechanic or towing service, and often don't even know what kind of help they need. This wastes time and can be dangerous, especially in emergency situations. To solve this problem, FixNGo provides a platform that connects drivers with the nearest available service provider based on their location and the type of problem they are facing.

### 1.2 Document Conventions
Important points have been highlighted to provide emphasis. Headings and subheadings have been written in bold font. Functional requirements are numbered as **FR-01**, **FR-02**, etc. Non-functional requirements are numbered as **NFR-01**, **NFR-02**, etc. Abbreviations used in the document will be understood by the developers of the application.

### 1.3 Intended Audience and Reading Suggestions
The intended audience is the team of developers who will be designing and implementing the FixNGo platform. Also, the document is to be utilized by the testing team who will be testing and evaluating the performance and design of the application. The document consists of all the necessary information required by the team of software engineers who will be working on the project.

### 1.4 Product Scope
FixNGo is a platform that connects drivers to nearby roadside assistance providers when their vehicle breaks down. Instead of the driver having to search for a mechanic or a towing service on their own, the application uses the driver's location and the type of problem to recommend the right kind of help and connect them with an available provider.

The application will provide all necessary functionalities for requesting assistance, tracking the provider's location in real time, and paying for the service. There will also be functionality for finding and booking nearby service centers for further car maintenance. In the future, we plan to add additional features such as an AI-based diagnosis of the vehicle problem and integration with insurance companies.

### 1.5 References
**Websites:**
- Google Maps Platform Documentation: [https://developers.google.com/maps](https://developers.google.com/maps)
- Microsoft .NET Documentation: [https://learn.microsoft.com/en-us/dotnet/](https://learn.microsoft.com/en-us/dotnet/)

---

## 2. Overall Description

### 2.1 Product Perspective
FixNGo is a new, standalone platform. It is not an extension of any existing system. The platform will be developed as a web application (built with .NET) and will also be accessible through mobile devices via a mobile-responsive interface. The system connects three main sides: drivers who need help, service providers (mechanics, towing companies, service centers) who offer help, and an admin who manages and oversees the whole platform. The platform relies on external services such as Google Maps for location tracking and a payment gateway for handling online payments.

### 2.2 Product Functions
The main functions of FixNGo are:
- Allowing customers to request roadside assistance when their vehicle breaks down.
- Detecting the customer's location and the type of problem to recommend the right kind of service.
- Connecting customers with the nearest available service provider.
- Allowing providers to accept or reject requests and update the request status.
- Allowing customers to track the provider's location in real time.
- Allowing customers to search for and book appointments at nearby service centers.
- Handling payment for completed services.
- Allowing customers to rate and review providers after service completion.
- Keeping a record of the customer's service history.
- Allowing the admin to manage users, providers, service centers, and monitor the overall system.

### 2.3 User Classes and Characteristics
The system has four main types of users:
1. **Customer:** A driver who owns a vehicle and uses the platform to request roadside assistance when needed. Customers are expected to have basic experience using mobile/web applications, and may be using the app during stressful situations (breakdowns, accidents), so the interface must be simple and fast to use.
2. **Service Provider:** A mechanic, towing service, or individual who offers roadside assistance through the platform. Providers need to manage their availability, receive and respond to requests, and update the status of the service they are providing.
3. **Service Center:** A business (such as a repair garage) that offers maintenance and repair services. Service centers manage their own services, working hours, and bookings.
4. **Admin:** A staff member responsible for managing and monitoring the platform. Admins verify providers and service centers, manage user accounts, and handle complaints or reported issues.

### 2.4 Operating Environment
FixNGo will run as a web application accessible through modern web browsers (Chrome, Edge, Firefox, Safari) on desktops, tablets, and mobile phones. The backend will be developed using .NET, with a relational database (such as SQL Server) for data storage. The application requires an internet connection and access to GPS/location services to function properly.

### 2.5 Design and Implementation Constraints
- The system must be developed using the .NET framework.
- The system depends on a third-party mapping service (such as Google Maps API) for location tracking and distance calculation.
- The system depends on a third-party payment gateway for handling online payments.
- The system must be designed to work with limited or unstable internet connections, since users may request help from remote areas (such as desert roads).
- The interface must remain simple and fast to use, since customers may be using it during emergency situations.

### 2.6 User Documentation
A simple user guide will be provided within the application (such as onboarding screens or a help section) to explain how to request assistance, track a provider, and make a payment. A separate manual will be provided for service providers and service centers to explain how to manage requests, update statuses, and view earnings.

### 2.7 Assumptions and Dependencies
- It is assumed that the customer's device has GPS enabled and an active internet connection when requesting assistance.
- It is assumed that service providers and service centers are verified and registered on the platform before they can receive requests.
- The system depends on the availability and accuracy of the third-party mapping service (Google Maps API).
- The system depends on the availability of the third-party payment gateway for processing online payments.
- It is assumed that providers will update their availability status accurately so that customers are matched with providers who are actually available.

---

## 3. External Interface Requirements

### 3.1 User Interfaces
**The customer interface will include:**
- Login / Registration screen.
- Home screen with an option to request emergency assistance.
- Location screen (map view) to confirm or manually set the customer's location.
- Problem selection screen showing common vehicle problems (flat tire, dead battery, out of fuel, mechanical problem, accident, unknown problem).
- Provider list screen showing nearby available providers with rating, distance, ETA, and estimated cost.
- Live tracking screen showing the provider's location moving toward the customer on a map.
- Chat/Call screen for communicating with the provider.
- Service centers screen for searching and booking maintenance appointments.
- Payment screen for reviewing the service summary and choosing a payment method.
- Rating screen for rating and reviewing the completed service.
- Service history screen showing past requests.

**The provider interface will include:**
- Login screen.
- Dashboard showing incoming requests with customer location, vehicle information, and problem details.
- Accept / Reject request screen.
- Status update screen (*On The Way*, *Arrived*, *In Service*, *Completed*).
- Earnings and ratings screen.

**The admin interface will include:**
- Dashboard for managing customers, providers, and service centers.
- Verification screen for approving new providers/service centers.
- Reports screen for viewing system statistics.
- Complaints / reviews management screen.

*All interfaces will be kept simple and easy to navigate, especially the customer interface, since it may be used during emergency situations.*

### 3.2 Hardware Interfaces
- **GPS:** used to detect the customer's and provider's current location.
- **Camera:** used by the customer to take and upload photos of the vehicle problem.
- **Internet connection (Wi-Fi or mobile data):** required for the application to send and receive data.

### 3.3 Software Interfaces
- **Maps API (e.g., Google Maps API):** used for detecting location, calculating distance, and displaying live tracking on a map.
- **Payment Gateway (e.g., Stripe/PayPal or a local payment provider):** used for processing online payments.
- **Database (SQL Server):** used for storing user data, requests, and service history.
- **Notification Service (e.g., Firebase Cloud Messaging):** used for sending push notifications to customers and providers.

### 3.4 Communication Interfaces
- The system will communicate over **HTTPS** to ensure secure data transmission between the client applications and the server.
- **Push notifications** will be used to alert customers and providers about request status changes (e.g., request accepted, provider arrived).
- In-app chat will use a real-time messaging protocol (e.g., **WebSockets / SignalR**) to allow instant communication between customers and providers.

---

## 4. System Features

### 4.1 Authentication and Authorization
- **Description:** This feature allows users (customers, providers, service centers, and admins) to securely register, log in, and access the system based on their role.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-01** | The system shall allow customers to register using their name, email/phone number, and password. |
| **FR-02** | The system shall allow providers and service centers to register and submit verification documents. |
| **FR-03** | The system shall allow all users to log in and log out securely. |
| **FR-04** | The system shall provide role-based access, so each user type (customer, provider, service center, admin) only sees the features relevant to them. |
| **FR-05** | The system shall allow the admin to verify and approve new providers and service centers before they can receive requests. |
| **FR-06** | The system shall allow users to reset their password if forgotten. |

### 4.2 Vehicle Management
- **Description:** This feature allows customers to add and manage information about their vehicle(s), which helps providers understand the customer's needs.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-07** | The system shall allow customers to add one or more vehicles to their account (make, model, year, plate number). |
| **FR-08** | The system shall allow customers to update or delete their vehicle information. |
| **FR-09** | The system shall maintain a service history for each vehicle. |

### 4.3 Request Emergency Assistance
- **Description:** This is the core feature of the system. It allows the customer to request help when their vehicle breaks down, by specifying their location and the type of problem.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-10** | The system shall allow customers to request roadside assistance. |
| **FR-11** | The system shall detect the customer's current location using GPS. |
| **FR-12** | The system shall allow customers to manually set their location on a map if GPS is unavailable. |
| **FR-13** | The system shall allow customers to select the type of vehicle problem (flat tire, dead battery, out of fuel, mechanical problem, accident, locked out, or unknown). |
| **FR-14** | The system shall ask the customer additional questions (e.g., whether the vehicle is movable, whether anyone is injured) to better understand the situation. |
| **FR-15** | The system shall allow customers to upload photos related to the vehicle problem. |
| **FR-16** | The system shall recommend the appropriate type of assistance (e.g., towing, mechanic, battery service) based on the customer's answers. |

### 4.4 Provider Matching (Find Nearby Providers)
- **Description:** This feature displays the nearest available service providers to the customer, based on the recommended assistance type, and allows the customer to choose one.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-17** | The system shall display a list of nearby available providers matching the recommended assistance type. |
| **FR-18** | The system shall display each provider's rating, distance, estimated time of arrival (ETA), and estimated cost. |
| **FR-19** | The system shall allow the customer to select a provider and confirm the assistance request. |
| **FR-20** | The system shall notify the selected provider of the new request. |
| **FR-21** | The system shall allow the provider to accept or reject the request. |
| **FR-22** | If the provider rejects the request, the system shall notify the customer and suggest another available provider. |

### 4.5 Live Tracking
- **Description:** This feature allows the customer to track the provider's location in real time after a request is accepted.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-23** | The system shall display the provider's live location on a map after the request is accepted. |
| **FR-24** | The system shall update the request status as the provider moves (e.g., *On The Way*, *Arrived*). |
| **FR-25** | The system shall display the estimated arrival time to the customer. |
| **FR-26** | The system shall allow the provider to update the request status manually (*Arrived*, *In Service*, *Completed*). |

### 4.6 Communication (Chat / Call)
- **Description:** This feature allows the customer and the provider to communicate directly during the service process.
- **Priority:** Should Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-27** | The system shall allow the customer to call the provider directly from the app. |
| **FR-28** | The system shall allow the customer and provider to chat with each other within the app. |
| **FR-29** | The system shall allow the customer to share their exact location with the provider through the chat. |

### 4.7 Service Centers (Search & Booking)
- **Description:** This feature allows customers to find and book nearby service centers for further vehicle maintenance, either after an emergency service or independently.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-30** | The system shall allow customers to search for nearby service centers. |
| **FR-31** | The system shall allow customers to filter service centers by service type, rating, and distance. |
| **FR-32** | The system shall allow customers to book an appointment at a service center. |
| **FR-33** | The system shall allow service centers to accept or reject booking requests. |
| **FR-34** | The system shall allow service centers to manage their working hours, offered services, and prices. |

### 4.8 Payment
- **Description:** This feature handles the cost calculation and payment process for completed services.
- **Priority:** Must Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-35** | The system shall calculate the total cost of the service. |
| **FR-36** | The system shall allow customers to choose a payment method (cash or online payment). |
| **FR-37** | The system shall generate an invoice/receipt after payment is completed. |
| **FR-38** | The system shall process online payments securely through a payment gateway. |

### 4.9 Rating & Reviews
- **Description:** This feature allows customers to rate and review the service provider after the service is completed, helping maintain service quality.
- **Priority:** Should Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-39** | The system shall allow customers to rate the provider (1 to 5 stars) after the service is completed. |
| **FR-40** | The system shall allow customers to write a text review about their experience. |
| **FR-41** | The system shall display a provider's average rating to other customers. |
| **FR-42** | The system shall allow the admin to monitor reviews and handle reported/inappropriate reviews. |

### 4.10 Service History
- **Description:** This feature keeps a record of all past requests made by the customer, including details and costs.
- **Priority:** Should Have

| ID | Requirement Specification |
| :--- | :--- |
| **FR-43** | The system shall save a record of every completed service request in the customer's history. |
| **FR-44** | The system shall allow customers to view details of a past request (date, service type, location, cost, rating given). |
| **FR-45** | The system shall allow providers to view their own history of completed services and earnings. |

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements
- **NFR-01:** The system shall respond to a customer's assistance request within 5 seconds under normal network conditions.
- **NFR-02:** The system shall be able to display nearby providers within 10 seconds of the customer confirming their location and problem.
- **NFR-03:** The system shall update the provider's live location on the tracking map at least every 5-10 seconds.
- **NFR-04:** The system shall support at least 1,000 concurrent users without noticeable performance degradation.

### 5.2 Safety Requirements
- **NFR-05:** In the case of an accident or emergency, the system shall prioritize the request and connect the customer to a provider as quickly as possible.
- **NFR-06:** The system shall clearly display emergency contact information (such as local emergency numbers) in case the situation requires official emergency services.
- **NFR-07:** The system shall not allow a request to be canceled by mistake without a confirmation step, to avoid leaving a customer without help in an unsafe situation.

### 5.3 Security Requirements
- **NFR-08:** The system shall encrypt sensitive user data (passwords, payment information) both in transit and at rest.
- **NFR-09:** The system shall restrict access to features based on user role (customer, provider, service center, admin).
- **NFR-10:** The system shall verify providers and service centers before allowing them to receive requests, to protect customers from fraudulent accounts.
- **NFR-11:** The system shall log all payment transactions for auditing purposes.
- **NFR-12:** The system shall not share a customer's personal information with a provider beyond what is necessary to complete the service (name, location, vehicle info).

### 5.4 Software Quality Attributes
- **NFR-13 (Usability):** The interface shall be simple and easy to use, especially during emergency situations, requiring minimal steps to request help.
- **NFR-14 (Availability):** The system shall be available 24/7, since breakdowns can happen at any time.
- **NFR-15 (Reliability):** Assistance requests and their statuses shall be processed accurately without data loss, even if the customer's connection is briefly interrupted.
- **NFR-16 (Scalability):** The system shall be designed to support a growing number of customers, providers, and service centers over time.
- **NFR-17 (Maintainability):** The system shall be built using a modular architecture (.NET) to make it easier to maintain, update, and extend with new features in the future.
- **NFR-18 (Compatibility):** The system shall work properly on mobile phones, tablets, and desktop browsers.

---

## 6. Other Requirements
- **Legal Requirements:** Service providers and service centers must provide valid business/professional documentation during registration to be verified by the admin.
- **Database Requirements:** The system shall maintain a relational database to store user accounts, vehicles, requests, providers, service centers, payments, and reviews, ensuring data consistency across all modules.
- **Localization:** The system should support both Arabic and English languages to serve users across Egypt and other Arab countries.

---

## Appendix A: Glossary
- **Customer:** A driver who uses the platform to request roadside assistance for their vehicle.
- **Provider:** A mechanic, towing service, or individual who offers roadside assistance services through the platform.
- **Service Center:** A business (such as a repair garage) that offers maintenance and repair services and can be booked through the platform.
- **Admin:** The staff member responsible for managing and monitoring the platform, including verifying providers and service centers.
- **ETA (Estimated Time of Arrival):** The estimated time it will take for a provider to reach the customer's location.
- **Request:** A service request created by a customer when they need roadside assistance.
- **Towing:** The service of transporting a broken-down vehicle from its current location to a service center or another location.
- **GPS (Global Positioning System):** A satellite-based system used to determine the current location of a device.
- **MVP (Minimum Viable Product):** The first version of the system containing only the essential features needed to launch.

---

## Appendix B: Analysis Models
This appendix includes the diagrams that support the requirements described in this document:
- Use Case Diagram (Customer, Provider, Admin, Service Center)
- Request Assistance Flowchart (from breakdown to rating)
- System Architecture Diagram (client - server - database - external APIs)

### 6.1 Use Case Diagram Description
The Use Case Diagram illustrates the interactions between the four main actors (Customer, Provider, Service Center, Admin) and the system's core use cases, including:
- Register / Login
- Request Assistance
- Select Problem
- Track Provider
- Make Payment
- Rate Provider
- Manage Availability
- Accept / Reject Request
- Manage Service Center
- Manage Users

---

## Appendix C: To Be Determined List
- **TBD-01:** The exact pricing model for each type of service (fixed price vs. dynamic pricing based on distance/demand) is not yet finalized.
- **TBD-02:** The specific payment gateway to be integrated has not been decided yet.
- **TBD-03:** The exact criteria for provider verification (documents required) has not been finalized.
- **TBD-04:** Whether the system will support multiple currencies (for expansion to other Arab countries) is still under discussion.