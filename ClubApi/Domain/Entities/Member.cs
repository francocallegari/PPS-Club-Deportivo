namespace Domain.Entities
{
    public class Member : User
    {
        public List<Sport> SportsAttended { get; set; }


        public ICollection<MemberTrainingSession> SessionsAttended { get; set; } = new List<MemberTrainingSession>();
    }
}
