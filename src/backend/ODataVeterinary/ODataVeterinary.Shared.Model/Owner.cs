namespace ODataVeterinary.Shared.Model
{
    public class Owner : Base<int>
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public int PhoneNumber { get; set; }

        public string Location { get; set; }

        public virtual Pet Pet { get; set; }
    }
}
