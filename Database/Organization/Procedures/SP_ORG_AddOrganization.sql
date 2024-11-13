CREATE PROCEDURE [Organization].[SP_ORG_AddOrganization]
    @Name NVARCHAR(MAX),
    @Address NVARCHAR(MAX),
    @ContactEmail NVARCHAR(MAX),
    @ContactPhoneNumber NVARCHAR(MAX)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Organization].[ORG_Organization] (OR_Name, OR_Address, OR_ContactEmail, OR_ContactPhoneNumber)
        OUTPUT inserted.OR_PK
        VALUES (@Name, @Address, @ContactEmail, @ContactPhoneNumber);

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
