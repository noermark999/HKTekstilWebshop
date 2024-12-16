CREATE PROCEDURE [Product].[SP_PRO_AddExtraChoice]
    @Title NVARCHAR(MAX),
    @RecognizableName NVARCHAR(MAX),
    @OptionList [Product].[PRO_ExtraChoiceOptionTableType] READONLY
AS
BEGIN

    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    DECLARE @NewExtraChoiceID UNIQUEIDENTIFIER;

    DECLARE @InsertedIDs TABLE (ID UNIQUEIDENTIFIER);

    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_ExtraChoice] (EC_Title, EC_RecognizableName)
        OUTPUT inserted.EC_PK INTO @InsertedIDs(ID)
        VALUES (@Title, @RecognizableName);

        SELECT @NewExtraChoiceID = ID FROM @InsertedIDs;

        IF EXISTS (SELECT 1 FROM @OptionList)
        BEGIN
            INSERT INTO [Product].[PRO_ExtraChoiceOption] (EO_Name, EO_Description, EO_ExtraPrice, EO_ExtraChoice)
            SELECT Name, Description, ExtraPrice, @NewExtraChoiceID FROM @OptionList
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
