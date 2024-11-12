namespace Domain.Entities
{
    public class Member : User
    {
        public List<Sport> SportsAttended { get; set; }

        public ICollection<TrainingSession> SessionsAttended { get; set; } = new List<TrainingSession>();
    }
}
