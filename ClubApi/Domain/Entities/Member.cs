namespace Domain.Entities
{
    public class Member : User
    {
        public List<Sport> SportsAttended { get; set; }
    }
}
