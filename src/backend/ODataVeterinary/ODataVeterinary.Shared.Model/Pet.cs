using System.Collections.Generic;

namespace ODataVeterinary.Shared.Model
{
    public class Pet : Base<int>
    {
        public string Name { get; set; }

        public int Age { get; set; }

        public string Species { get; set; }

        public virtual IList<Owner> Owners { get; set; }
    }
}
