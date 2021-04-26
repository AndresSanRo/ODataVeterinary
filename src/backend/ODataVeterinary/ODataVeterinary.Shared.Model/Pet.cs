using System.Collections.Generic;

namespace ODataVeterinary.Shared.Model
{
    public class Pet : Base<int>
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string Species { get; set; }

        public IList<Owner> Owners { get; set; }
    }
}
