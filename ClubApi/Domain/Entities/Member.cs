namespace Domain.Entities
{
    public class Member : User
    {
        public List<Sport> SportsAttended { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string DNI {  get; set; }
        public string Address { get; set; }
        
    }
}
