using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using ReadingFlow.Entity;

namespace ReadingFlow.Model
{
    public class Flow
    {
        public static bool orderByYearAsc = true;
        public static BindingList<ReadingEntry> ReadingList = new BindingList<ReadingEntry>();


        public static void LoadReadingList(List<string> filePaths)
        {
            ReadingList.Clear();
            foreach (var filePath in filePaths)
            {
                var entry = new ReadingEntry(filePath);
                ReadingList.Add(entry);
                
            }
        }

        public static void SortReadingList(bool asc)
        {

            var list = ReadingList.ToList();

            var sorteList = new List<ReadingEntry>();
            if (asc)
            {
                sorteList = list.OrderBy(l => l.Year).ToList();
            }
            else
            {
                
                sorteList = list.OrderByDescending(l => l.Year).ToList();
            }

            LoadReadingList(sorteList.Select(e => e.FilePath).ToList());

        }

        public static void MarkCurrentAsRead(int currentIndex)
        {

            ReadingList[currentIndex].Read = true;
            
        }

        public static void SortByYear()
        {
            SortReadingList( orderByYearAsc);
            orderByYearAsc = !orderByYearAsc;
        }
    }
}