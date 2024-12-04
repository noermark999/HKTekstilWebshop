CREATE TABLE [Product].[PRO_ExtraChoiceOptionOrderItem]
(
	[EO_PK] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [EO_ExtraChoiceOption] UNIQUEIDENTIFIER NOT NULL, 
    CONSTRAINT EO_FK_ExtraChoiceOption FOREIGN KEY (EO_ExtraChoiceOption)
    REFERENCES Product.PRO_ExtraChoiceOption(EO_PK), 
    [EO_OrderItem] UNIQUEIDENTIFIER NOT NULL
    CONSTRAINT EO_FK_OrderItem FOREIGN KEY (EO_OrderItem)
    REFERENCES Product.PRO_OrderItem(OI_PK)
)
