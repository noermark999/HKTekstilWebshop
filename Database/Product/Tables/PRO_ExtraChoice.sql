CREATE TABLE [Product].[PRO_ExtraChoice]
(
	[EC_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [EC_Title] NVARCHAR(MAX) NOT NULL, 
    [EC_RecognizableName] NVARCHAR(MAX) NULL DEFAULT 'Mangler genkendeligt navn'
)
