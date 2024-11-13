﻿CREATE TABLE [Organization].[ORG_RegisterCode]
(
	[RC_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [RC_Code] NVARCHAR(MAX) NULL,
	[RC_Organization] UNIQUEIDENTIFIER NULL
    CONSTRAINT US_FK_Organization FOREIGN KEY (RC_Organization)
    REFERENCES Organization.ORG_Organization(OR_PK)
)
