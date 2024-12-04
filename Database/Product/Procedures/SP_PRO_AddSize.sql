CREATE PROCEDURE [Product].[SP_PRO_AddSize]
    @Size NVARCHAR(MAX)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_Size] (SI_Size)
        OUTPUT inserted.SI_PK
        VALUES (@Size);

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
