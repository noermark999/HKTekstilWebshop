CREATE PROCEDURE [User].[SP_USE_RegisterUser]
    @Firstname NVARCHAR(MAX),
    @Lastname NVARCHAR(MAX),
    @Email NVARCHAR(254),
    @PhoneNumber NVARCHAR(16),
    @Username NVARCHAR(MAX),
    @PasswordHash VARBINARY(32),
    @Salt VARBINARY(16),
    @Organization UNIQUEIDENTIFIER,
    @RegisterCode NVARCHAR(MAX)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Check if the register code is valid for the given organization
        IF NOT EXISTS (
            SELECT 1 
            FROM [Organization].[ORG_RegisterCode]
            WHERE RC_Code = @RegisterCode AND RC_Organization = @Organization
        )
        BEGIN
            SET @ErrorMsg = 'Invalid register code for the specified organization.';
            THROW 50004, @ErrorMsg, 1;
        END

        -- Insert new user record, letting US_Admin default to 0
        INSERT INTO [User].[USE_User] 
            (US_Firstname, US_Lastname, US_Email, US_PhoneNumber, US_Username, 
             US_PasswordHash, US_Salt, US_Organization)
        OUTPUT inserted.US_PK
        VALUES 
            (@Firstname, @Lastname, @Email, @PhoneNumber, @Username, 
             @PasswordHash, @Salt, @Organization);

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
