CREATE PROCEDURE [Organization].[SP_ORG_AddRegisterCode]
    @Code NVARCHAR(MAX),
    @Organization UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Organization].[ORG_RegisterCode] (RC_Code, RC_Organization)
        OUTPUT inserted.RC_PK
        VALUES (@Code, @Organization);

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
