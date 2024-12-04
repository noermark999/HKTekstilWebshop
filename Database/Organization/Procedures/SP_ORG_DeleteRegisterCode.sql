CREATE PROCEDURE [Organization].[SP_ORG_DeleteRegisterCode]
    @CodeID UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

            DELETE FROM ORG_RegisterCode
            WHERE RC_PK = @CodeID

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
