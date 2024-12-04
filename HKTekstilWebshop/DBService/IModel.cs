namespace HKTekstilWebshop.DBService
{
    public interface IModel<TInput, TOutput>
    {
        public Task<TOutput> Execute(TInput input); 
    }
}
