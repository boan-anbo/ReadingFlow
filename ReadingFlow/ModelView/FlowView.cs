using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Windows.Forms;
using ReadingFlow.Const;
using ReadingFlow.Model;

namespace ReadingFlow.ModelView
{
    public class FlowView
    {
        public static Form1 formInstance = null;
        
        public static void UpdateReadingListBox()
        {
            
            var selectedFiles = LoadFilesRead();

            foreach (var selectedFile in selectedFiles)
            {
                Console.WriteLine($"You seleceted {selectedFile}");
            }
            
            Flow.LoadReadingList(selectedFiles.ToList());
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

        public static void ReadNext(int currentIndex)
        {
            Flow.MarkCurrentAsRead(currentIndex);

        }
        

        public static void OpenFile(string filePath)
        {
            Process foxit = new Process();
            foxit.StartInfo.FileName = @"C:\Program Files (x86)\FOXIT SOFTWARE\FOXIT PHANTOMPDF\FoxitPDFEditor.exe";
            foxit.StartInfo.Arguments = $"\"{filePath}\"";
            foxit.Start();

        }
    }
 }