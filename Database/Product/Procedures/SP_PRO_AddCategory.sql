CREATE PROCEDURE [Product].[SP_PRO_AddCategory]
    @Name NVARCHAR(MAX),
    @Description NVARCHAR(MAX) = NULL
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_Category] (CA_Name, CA_Description)
        OUTPUT inserted.CA_PK
        VALUES (@Name, @Description);

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
