CREATE PROCEDURE [Product].[SP_PRO_AddOrder]
    @OrderDate DATETIME,
    @StatusID UNIQUEIDENTIFIER,
    @UserID UNIQUEIDENTIFIER
AS
BEGIN
    DECLARE @ErrorMsg NVARCHAR(MAX) = 'Error';
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO [Product].[PRO_Order] (OR_OrderDate, OR_Status, OR_User)
        OUTPUT inserted.OR_PK
        VALUES (@OrderDate, @StatusID, @UserID);

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
