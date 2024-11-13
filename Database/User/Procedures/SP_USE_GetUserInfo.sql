CREATE PROCEDURE [User].[SP_USE_GetUserInfo]
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

            SELECT 
                US_PK, 
                US_Firstname, 
                US_Lastname, 
                US_Email, 
                US_PhoneNumber, 
                US_Admin, 
                US_Organization
            FROM 
                [User].USE_User
            WHERE 
                US_PK = @UserId;

        COMMIT;
    END TRY

    BEGIN CATCH
        SET @ErrorMsg = ERROR_MESSAGE();
        IF @@TRANCOUNT > 0
        BEGIN
            ROLLBACK TRANSACTION;
        END;
        THROW 50001, @ErrorMsg, 1;
    END CATCH;
END;