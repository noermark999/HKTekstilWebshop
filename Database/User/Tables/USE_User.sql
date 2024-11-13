﻿CREATE TABLE [User].[USE_User]
(
	[US_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [US_Firstname] NVARCHAR(MAX) NOT NULL, 
    [US_Lastname] NVARCHAR(MAX) NOT NULL, 
    [US_Email] NVARCHAR(254) NOT NULL, 
    [US_PhoneNumber] NVARCHAR(16) NOT NULL, 
    [US_Username] NVARCHAR(100) NOT NULL UNIQUE, 
    [US_PasswordHash] VARBINARY(32) NOT NULL,
    [US_Salt] VARBINARY(16) NOT NULL,
    [US_Admin] BIT DEFAULT 0  NOT NULL, 
    [US_Organization] UNIQUEIDENTIFIER NOT NULL
    CONSTRAINT US_FK_Organization FOREIGN KEY (US_Organization)
    REFERENCES Organization.ORG_Organization(OR_PK)
)
