using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ReadingFlow.Entity;
using ReadingFlow.Model;
using ReadingFlow.ModelView;
 using NHotkey.WindowsForms;
namespace ReadingFlow
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            HotkeyManager.Current.AddOrReplace("Read Next", Keys.Control | Keys.Shift | Keys.Alt | Keys.N, ClickReadNext);
            FlowView.formInstance = this;
            ReadingListBox.DataSource = Flow.ReadingList;
        }

        private void SelectFilesToRead(object sender, EventArgs e)
        {
            FlowView.UpdateReadingListBox();
            UpdateProgress();
            
            // ReadingListBox.Update();
        }

        private void ClickReadNext(object sender, EventArgs e)
        {
            int currentIndex = ReadingListBox.SelectedIndex;
            if (currentIndex < ReadingListBox.Items.Count - 1)
            {
                FlowView.ReadNext(currentIndex);
                var nextIndex = currentIndex + 1;
                ReadingListBox.SetSelected(nextIndex, true);
                FlowView.OpenFile(GetItemFilePathByIndex(nextIndex));
                UpdateProgress();
            }
        }

        private string GetItemFilePathByIndex(int index)
        {
            return (ReadingListBox.Items[index] as ReadingEntry).FilePath;
        }

        private  void UpdateProgress()
        {
            var current = ReadingListBox.SelectedIndex;
            var total = ReadingListBox.Items.Count;
            progressLabel.Text = $"{current + 1} of {total}";
        }
        private void ClickReadCurrent(object sender, EventArgs e)
        {
            
            FlowView.OpenFile(GetItemFilePathByIndex(ReadingListBox.SelectedIndex));
        }

        private void ClickSortByYear(object sender, EventArgs e)
        {
            Flow.SortByYear();
            ReadingListBox.Update();
        }
    }
}
