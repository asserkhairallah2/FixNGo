-- ==============================================================================
-- FixNGo: Safe Idempotent Database Reconciliation Script
-- Purpose: Ensures all required audit and soft-delete columns (IsDeleted, DeletedAt, UpdatedAt)
--          and missing tables exist in any pre-existing SQL Server database instance.
-- Safety: Non-destructive. Never drops existing tables or existing column data.
-- ==============================================================================

SET NOCOUNT ON;

PRINT 'Starting FixNGo database reconciliation...';

-- 1. Reconcile AspNetUsers
IF OBJECT_ID(N'dbo.AspNetUsers', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.AspNetUsers', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.AspNetUsers ADD IsDeleted bit NOT NULL CONSTRAINT DF_AspNetUsers_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to AspNetUsers.';
    END

    IF COL_LENGTH(N'dbo.AspNetUsers', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.AspNetUsers ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to AspNetUsers.';
    END

    IF COL_LENGTH(N'dbo.AspNetUsers', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.AspNetUsers ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to AspNetUsers.';
    END
END
GO

-- 2. Reconcile ServiceCenters
IF OBJECT_ID(N'dbo.ServiceCenters', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.ServiceCenters', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.ServiceCenters ADD IsDeleted bit NOT NULL CONSTRAINT DF_ServiceCenters_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to ServiceCenters.';
    END

    IF COL_LENGTH(N'dbo.ServiceCenters', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.ServiceCenters ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to ServiceCenters.';
    END

    IF COL_LENGTH(N'dbo.ServiceCenters', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.ServiceCenters ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to ServiceCenters.';
    END
END
GO

-- 3. Reconcile Services
IF OBJECT_ID(N'dbo.Services', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.Services', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.Services ADD IsDeleted bit NOT NULL CONSTRAINT DF_Services_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to Services.';
    END

    IF COL_LENGTH(N'dbo.Services', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.Services ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to Services.';
    END

    IF COL_LENGTH(N'dbo.Services', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.Services ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to Services.';
    END
END
GO

-- 4. Reconcile WorkingHours
IF OBJECT_ID(N'dbo.WorkingHours', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.WorkingHours', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.WorkingHours ADD IsDeleted bit NOT NULL CONSTRAINT DF_WorkingHours_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to WorkingHours.';
    END

    IF COL_LENGTH(N'dbo.WorkingHours', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.WorkingHours ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to WorkingHours.';
    END

    IF COL_LENGTH(N'dbo.WorkingHours', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.WorkingHours ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to WorkingHours.';
    END
END
GO

-- 5. Reconcile Bookings
IF OBJECT_ID(N'dbo.Bookings', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.Bookings', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.Bookings ADD IsDeleted bit NOT NULL CONSTRAINT DF_Bookings_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to Bookings.';
    END

    IF COL_LENGTH(N'dbo.Bookings', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.Bookings ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to Bookings.';
    END

    IF COL_LENGTH(N'dbo.Bookings', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.Bookings ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to Bookings.';
    END
END
GO

-- 6. Reconcile AssistanceRequests
IF OBJECT_ID(N'dbo.AssistanceRequests', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.AssistanceRequests', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.AssistanceRequests ADD IsDeleted bit NOT NULL CONSTRAINT DF_AssistanceRequests_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to AssistanceRequests.';
    END

    IF COL_LENGTH(N'dbo.AssistanceRequests', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.AssistanceRequests ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to AssistanceRequests.';
    END

    IF COL_LENGTH(N'dbo.AssistanceRequests', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.AssistanceRequests ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to AssistanceRequests.';
    END

    IF COL_LENGTH(N'dbo.AssistanceRequests', N'IsPaid') IS NULL
    BEGIN
        ALTER TABLE dbo.AssistanceRequests ADD IsPaid bit NOT NULL CONSTRAINT DF_AssistanceRequests_IsPaid DEFAULT 0;
        PRINT 'Added IsPaid to AssistanceRequests.';
    END

    IF COL_LENGTH(N'dbo.AssistanceRequests', N'PaidAt') IS NULL
    BEGIN
        ALTER TABLE dbo.AssistanceRequests ADD PaidAt datetime2 NULL;
        PRINT 'Added PaidAt to AssistanceRequests.';
    END
END
GO

-- 7. Reconcile ProviderProfiles
IF OBJECT_ID(N'dbo.ProviderProfiles', N'U') IS NOT NULL
BEGIN
    IF COL_LENGTH(N'dbo.ProviderProfiles', N'IsDeleted') IS NULL
    BEGIN
        ALTER TABLE dbo.ProviderProfiles ADD IsDeleted bit NOT NULL CONSTRAINT DF_ProviderProfiles_IsDeleted DEFAULT 0;
        PRINT 'Added IsDeleted to ProviderProfiles.';
    END

    IF COL_LENGTH(N'dbo.ProviderProfiles', N'DeletedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.ProviderProfiles ADD DeletedAt datetime2 NULL;
        PRINT 'Added DeletedAt to ProviderProfiles.';
    END

    IF COL_LENGTH(N'dbo.ProviderProfiles', N'UpdatedAt') IS NULL
    BEGIN
        ALTER TABLE dbo.ProviderProfiles ADD UpdatedAt datetime2 NULL;
        PRINT 'Added UpdatedAt to ProviderProfiles.';
    END
END
GO

PRINT 'FixNGo database reconciliation completed successfully.';
