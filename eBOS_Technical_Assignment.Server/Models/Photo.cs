using System.ComponentModel.DataAnnotations.Schema;

namespace eBOS_Technical_Assignment.Server.DbObjects
{
    public class Photo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        public int AlbumId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string ThumbnailUrl { get; set; }
        public bool IsValid()
        {
            return
                AlbumId > 0 &&
                Id > 0 &&
                !string.IsNullOrEmpty(Title) &&
                !string.IsNullOrEmpty(Url) &&
                !string.IsNullOrEmpty(ThumbnailUrl);
        }
        public Photo()
        {
            Id = 0;
            AlbumId = 0;
            Title = string.Empty;
            Url = string.Empty;
            ThumbnailUrl = string.Empty;

        }

    }

}
