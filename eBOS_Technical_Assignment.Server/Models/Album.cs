using System.ComponentModel.DataAnnotations.Schema;

namespace eBOS_Technical_Assignment.Server.DbObjects
{
    public class Album
    {
        public int UserId { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Title { get; set; }
        public Album()
        {
            UserId = 0;
            Id = 0;
            Title = string.Empty;
        }
        public bool IsValid() {
            return
            UserId > 0 &&
            Id > 0 &&
            !string.IsNullOrEmpty(Title);
        }
    }

}