CREATE PROCEDURE [Product].[SP_PRO_AddStatus]
    @StatusName NVARCHAR(MAX)
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_Status] (ST_StatusName)
        OUTPUT inserted.ST_PK
        VALUES (@StatusName);

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
