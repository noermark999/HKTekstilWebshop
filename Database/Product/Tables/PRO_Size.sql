﻿CREATE TABLE [Product].[PRO_Size]
(
	[SI_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [SI_Size] NVARCHAR(MAX) NOT NULL
)
