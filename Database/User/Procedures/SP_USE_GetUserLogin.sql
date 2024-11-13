CREATE PROCEDURE [User].[SP_USE_GetUserLogin]
    @Username NVARCHAR(100)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

            SELECT US_PK, US_PasswordHash, US_Salt
            FROM [User].USE_User
            WHERE US_Username = @Username

        COMMIT;
    END TRY

    BEGIN CATCH
        SET @ErrorMsg = (SELECT ERROR_MESSAGE());
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END;
        THROW 50001, @ErrorMsg, 1;
    END CATCH;
END;
