﻿CREATE TABLE [Organization].[ORG_Organization]
(
	[OR_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [OR_Name] NVARCHAR(MAX) NULL, 
    [OR_Address] NVARCHAR(MAX) NULL, 
    [OR_ContactEmail] NVARCHAR(MAX) NULL, 
    [OR_ContactPhoneNumber] NVARCHAR(MAX) NULL
)
