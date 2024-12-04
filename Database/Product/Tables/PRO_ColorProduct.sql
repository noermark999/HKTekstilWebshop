﻿CREATE TABLE [Product].[PRO_ColorProduct]
(
	[CP_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [CP_Color] UNIQUEIDENTIFIER NOT NULL
	CONSTRAINT CP_FK_Color FOREIGN KEY (CP_Color)
    REFERENCES Product.PRO_Color(CO_PK), 
    [CP_Product] UNIQUEIDENTIFIER NOT NULL
    CONSTRAINT CP_FK_Product FOREIGN KEY (CP_Product)
    REFERENCES Product.PRO_Product(PR_PK)
)
