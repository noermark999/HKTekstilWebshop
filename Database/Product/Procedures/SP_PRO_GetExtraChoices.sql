CREATE PROCEDURE [Product].[SP_PRO_GetExtraChoices]
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

            SELECT EC_PK, EC_Title, EC_RecognizableName
            FROM PRO_ExtraChoice

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
END