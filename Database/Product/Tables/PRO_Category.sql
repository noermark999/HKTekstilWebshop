﻿CREATE TABLE [Product].[PRO_Category]
(
	[CA_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [CA_Name] NVARCHAR(MAX) NOT NULL, 
    [CA_Description] NVARCHAR(MAX) NULL
)
