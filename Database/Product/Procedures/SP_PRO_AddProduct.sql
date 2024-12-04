CREATE PROCEDURE [Product].[SP_PRO_AddProduct]
    @Name NVARCHAR(MAX),
    @Description NVARCHAR(MAX) = NULL,
    @Price FLOAT,
    @CategoryID UNIQUEIDENTIFIER,
    @OrganizationID UNIQUEIDENTIFIER,
    @ColorList [Product].[PRO_ColorTableType] READONLY,
    @SizeList [Product].[PRO_SizeTableType] READONLY,
    @ExtraChoiceList [Product].[PRO_ExtraChoiceTableType] READONLY,
    @ImageURLs [Product].[PRO_ImageTableType] READONLY
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    DECLARE @NewProductID UNIQUEIDENTIFIER;

    -- Temporary table to capture the inserted ID
    DECLARE @InsertedIDs TABLE (ID UNIQUEIDENTIFIER);

    BEGIN TRY
        BEGIN TRANSACTION;

        -- Insert into Product table and capture the new PR_PK in the temporary table
        INSERT INTO [Product].[PRO_Product] (PR_Name, PR_Description, PR_Price, PR_Category, PR_Organization)
        OUTPUT inserted.PR_PK INTO @InsertedIDs(ID)
        VALUES (@Name, @Description, @Price, @CategoryID, @OrganizationID);

        -- Set the @NewProductID variable from the temporary table
        SELECT @NewProductID = ID FROM @InsertedIDs;

        -- Insert into ColorProduct junction table
        IF EXISTS (SELECT 1 FROM @ColorList)
        BEGIN
            INSERT INTO [Product].[PRO_ColorProduct] (CP_Color, CP_Product)
            SELECT ColorID, @NewProductID FROM @ColorList;
        END

        -- Insert into SizeProduct junction table
        IF EXISTS (SELECT 1 FROM @SizeList)
        BEGIN
            INSERT INTO [Product].[PRO_SizeProduct] (SP_Size, SP_Product)
            SELECT SizeID, @NewProductID FROM @SizeList;
        END

        -- Insert into ExtraChoiceProduct junction table if there are extra choices
        IF EXISTS (SELECT 1 FROM @ExtraChoiceList)
        BEGIN
            INSERT INTO [Product].[PRO_ExtraChoiceProduct] (EP_ExtraChoice, EP_Product)
            SELECT ExtraChoiceID, @NewProductID FROM @ExtraChoiceList;
        END

        -- Insert into Images table
        IF EXISTS (SELECT 1 FROM @ImageURLs)
        BEGIN
            INSERT INTO [Product].[PRO_Images] (IM_ImageURL, IM_Product)
            SELECT ImageURL, @NewProductID FROM @ImageURLs;
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
