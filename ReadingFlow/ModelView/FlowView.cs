using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Windows.Forms;
using ReadingFlow.Const;
using ReadingFlow.Model;

namespace ReadingFlow.ModelView
{
    public class FlowView
    {
        public static Form1 formInstance = null;

        public static bool FromSavedFile = false;
        public static bool Saved = false;
        
        public static void UpdateReadingListBox()
        {
            
            var selectedFiles = LoadFilesRead();

            foreach (var selectedFile in selectedFiles)
            {
                Console.WriteLine($"You seleceted {selectedFile}");
            }
            
            Flow.LoadReadingListFromNewEntries(selectedFiles.ToList());
        }
        public static string[] LoadFilesRead()
        {
            OpenFileDialog thisDialog = new OpenFileDialog();

            thisDialog.InitialDirectory = Folders.ZoteroFolder;
            thisDialog.Filter = "Pdf files (*.pdf)|*.pdf";
            // thisDialog.FilterIndex = 2;
            thisDialog.RestoreDirectory = true;
            thisDialog.Multiselect = true;
            thisDialog.Title = "Please Select To Read";

            if (thisDialog.ShowDialog() == DialogResult.OK)
            {
                return thisDialog.FileNames;
            }
            
            return Array.Empty<string>();

        }

        public static string OpenReadingList()
        {
            
            OpenFileDialog thisDialog = new OpenFileDialog();

            thisDialog.InitialDirectory = Folders.DefaultReadingListOutputFolder;
            thisDialog.Filter = "Lists (*.json)|*.json";
            // thisDialog.FilterIndex = 2;
            thisDialog.RestoreDirectory = true;
            thisDialog.Multiselect = false;
            thisDialog.Title = "Please Select Reading List To Open";

            if (thisDialog.ShowDialog() == DialogResult.OK)
            {
                return thisDialog.FileName;
            }
            
            return String.Empty;
        }

        public static void ReadNext(int currentIndex)
        {
            Flow.MarkCurrentAsRead(currentIndex);

        }


        public static void OutputReadingList(OutputReadingList outputReadingList)
        {
            string json = JsonSerializer.Serialize(outputReadingList);

            if (!Directory.Exists(Folders.DefaultReadingListOutputFolder))
            {
                Directory.CreateDirectory(Folders.DefaultReadingListOutputFolder);
            }
            File.WriteAllText(Folders.DefaultReadingListOutputFolder + $"{outputReadingList.ListName}.json", json, Encoding.UTF8);
            Saved = true;
        }
        
        public static void OpenFile(string filePath)
        {
            Process foxit = new Process();
            foxit.StartInfo.FileName = @"C:\Program Files (x86)\FOXIT SOFTWARE\FOXIT PHANTOMPDF\FoxitPhantomPDF.exe";
            foxit.StartInfo.Arguments = $"\"{filePath}\"";
            foxit.Start();

        }

        /**
         * return last readitem's int
         */
        public static void LoadReadingList(OutputReadingList outputReadingList)
        {
            Flow.LoadSavedReadingList(outputReadingList.ReadingList);
            FromSavedFile = true;
        }
    }
 }