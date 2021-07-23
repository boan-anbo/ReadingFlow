using System;
using System.IO;
using System.Text.RegularExpressions;

namespace ReadingFlow.Entity
{
    public class ReadingEntry
    {
        public ReadingEntry(string filePath)
        {
            Uuid = Guid.NewGuid();
            Name = Path.GetFileName(filePath);
            LastModified = File.GetLastWriteTime(filePath);
            FilePath = filePath;
            Read = false;
            Year = ParseYear(Name);
        }

        public Guid Uuid { get; set; }
        public string Name { get; set; }
        public DateTime LastModified { get; set; }
        public bool Read { get; set; }
        
        public int Year { get; set; }

        public string FilePath { get; set; }

        private int ParseYear(string fileName)
        {

            int year = Int32.Parse(Regex.Match(fileName, @"\s(\d{4})\s").Groups[1].Value ?? "0000");
            return year;
        }
        public override string ToString()
        {
            return $"{LastModified.ToShortDateString()} - {Year} - {(Read ? "Read" : "Unread" )} - {Name}";
        }
    }
}