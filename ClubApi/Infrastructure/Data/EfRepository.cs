namespace Infrastructure.Data
{
    public class EfRepository<T> : RepositoryBase<T> where T : class
    {
        protected readonly ApplicationContext _context;
        public EfRepository(ApplicationContext dbContext) : base(dbContext)
        {
            _context = dbContext;
        }
    }
}
