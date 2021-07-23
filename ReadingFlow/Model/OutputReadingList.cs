using System;
using System.Collections.Generic;
using ReadingFlow.Entity;

namespace ReadingFlow.Model
{
    public class OutputReadingList
    {
        public OutputReadingList(string listName, List<ReadingEntry> readingList, Guid lastUsedItemUuid, bool finished)
        {
            ReadingList = readingList;
            LastUsedItemUuid = lastUsedItemUuid;
            ListName = listName;
            Finished = finished;
        }

        public List<ReadingEntry> ReadingList { get; set; }

        public Guid LastUsedItemUuid { get; set; }
        
        public DateTime LastUsedTime { get; set; } = DateTime.Now;
        
        public string ListName { get; set; }

        public bool Finished { get; set; }

        public int GetLastUsedItemIndex()
        {
            return ReadingList.FindIndex(e => e.Uuid.Equals(LastUsedItemUuid));
        }

    }
}