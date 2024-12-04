CREATE TYPE [Product].[PRO_ExtraChoiceOptionTableType] AS TABLE
(
	ExtraChoiceOptionID UNIQUEIDENTIFIER NULL,
	Name NVARCHAR(MAX) NULL,
	Description NVARCHAR(MAX) NULL,
	ExtraPrice FLOAT NULL
)
