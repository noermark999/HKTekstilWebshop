CREATE PROCEDURE [Product].[SP_PRO_AddOrderItem]
    @Quantity INT,
    @ProductID UNIQUEIDENTIFIER,
    @OrderID UNIQUEIDENTIFIER,
    @ColorID UNIQUEIDENTIFIER,
    @SizeID UNIQUEIDENTIFIER,
    @ExtraChoiceOptionList [Product].[PRO_ExtraChoiceOptionTableType] READONLY
AS
BEGIN

    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    DECLARE @NewOrderItemID UNIQUEIDENTIFIER;
    DECLARE @InsertedIDs TABLE (ID UNIQUEIDENTIFIER);

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_OrderItem] (OI_Quantity, OI_Product, OI_Order, OI_Color, OI_Size)
        OUTPUT inserted.OI_PK INTO @InsertedIDs(ID)
        VALUES (@Quantity, @ProductID, @OrderID, @ColorID, @SizeID);

        SELECT @NewOrderItemID = ID FROM @InsertedIDs;

        IF EXISTS (SELECT 1 FROM @ExtraChoiceOptionList)
        BEGIN
            INSERT INTO [Product].PRO_ExtraChoiceOptionOrderItem (EO_ExtraChoiceOption, EO_OrderItem)
            SELECT ExtraChoiceOptionID, @NewOrderItemID FROM @ExtraChoiceOptionList
        END

        COMMIT;
    END TRY

    BEGIN CATCH
        SET @ErrorMsg = (SELECT ERROR_MESSAGE());
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END;
        THROW 50003, @ErrorMsg, 1;
    END CATCH;
END;
