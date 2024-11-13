CREATE PROCEDURE [Organization].[SP_ORG_GetOrganizations]
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

            SELECT OR_PK, OR_Name, OR_Address, OR_ContactEmail, OR_ContactPhoneNumber
            FROM Organization.ORG_Organization

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
