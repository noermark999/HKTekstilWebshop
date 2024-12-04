﻿CREATE TABLE [Product].[PRO_Product]
(
	[PR_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [PR_Name] NVARCHAR(MAX) NOT NULL, 
    [PR_Description] NVARCHAR(MAX) NULL, 
    [PR_Price] FLOAT NOT NULL, 
    [PR_Category] UNIQUEIDENTIFIER NOT NULL 
    CONSTRAINT US_FK_Category FOREIGN KEY (PR_Category)
    REFERENCES Product.PRO_Category(CA_PK), 
    [PR_Organization] UNIQUEIDENTIFIER NOT NULL
    CONSTRAINT US_FK_Organization FOREIGN KEY (PR_Organization)
    REFERENCES Organization.ORG_Organization(OR_PK)
)
