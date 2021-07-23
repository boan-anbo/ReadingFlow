namespace ReadingFlow
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }

            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.panel1 = new System.Windows.Forms.Panel();
            this.button6 = new System.Windows.Forms.Button();
            this.button5 = new System.Windows.Forms.Button();
            this.button4 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.ReadingListBox = new System.Windows.Forms.ListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.progressLabel = new System.Windows.Forms.Label();
            this.panel2 = new System.Windows.Forms.Panel();
            this.Finished = new System.Windows.Forms.CheckBox();
            this.titleInputBox = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.lastUsedTimeLabel = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.button6);
            this.panel1.Controls.Add(this.button5);
            this.panel1.Controls.Add(this.button4);
            this.panel1.Controls.Add(this.button3);
            this.panel1.Controls.Add(this.button2);
            this.panel1.Controls.Add(this.button1);
            this.panel1.Location = new System.Drawing.Point(12, 88);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(831, 44);
            this.panel1.TabIndex = 0;
            // 
            // button6
            // 
            this.button6.Location = new System.Drawing.Point(254, 2);
            this.button6.Name = "button6";
            this.button6.Size = new System.Drawing.Size(87, 40);
            this.button6.TabIndex = 6;
            this.button6.Text = "Load List";
            this.button6.UseVisualStyleBackColor = true;
            this.button6.Click += new System.EventHandler(this.ClickLoadList);
            // 
            // button5
            // 
            this.button5.Location = new System.Drawing.Point(142, 3);
            this.button5.Name = "button5";
            this.button5.Size = new System.Drawing.Size(97, 43);
            this.button5.TabIndex = 5;
            this.button5.Text = "Save List";
            this.button5.UseVisualStyleBackColor = true;
            this.button5.Click += new System.EventHandler(this.ClickSaveList);
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(402, 3);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(96, 44);
            this.button4.TabIndex = 4;
            this.button4.Text = "Sort List";
            this.button4.UseVisualStyleBackColor = true;
            this.button4.Click += new System.EventHandler(this.ClickSortByYear);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(534, 2);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(145, 43);
            this.button3.TabIndex = 2;
            this.button3.Text = "Read Selected";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.ClickReadCurrent);
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(685, 2);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(145, 43);
            this.button2.TabIndex = 1;
            this.button2.Text = "Read Next";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.ClickReadNext);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(0, 3);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(111, 40);
            this.button1.TabIndex = 0;
            this.button1.Text = "Add Files To Read";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.SelectFilesToRead);
            // 
            // ReadingListBox
            // 
            this.ReadingListBox.FormattingEnabled = true;
            this.ReadingListBox.Location = new System.Drawing.Point(12, 138);
            this.ReadingListBox.Name = "ReadingListBox";
            this.ReadingListBox.Size = new System.Drawing.Size(831, 550);
            this.ReadingListBox.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.Location = new System.Drawing.Point(13, 700);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(58, 18);
            this.label1.TabIndex = 2;
            this.label1.Text = "Progress:";
            // 
            // progressLabel
            // 
            this.progressLabel.Location = new System.Drawing.Point(77, 700);
            this.progressLabel.Name = "progressLabel";
            this.progressLabel.Size = new System.Drawing.Size(185, 19);
            this.progressLabel.TabIndex = 3;
            this.progressLabel.Text = "label2";
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.label4);
            this.panel2.Controls.Add(this.textBox1);
            this.panel2.Controls.Add(this.Finished);
            this.panel2.Controls.Add(this.titleInputBox);
            this.panel2.Controls.Add(this.label2);
            this.panel2.Location = new System.Drawing.Point(13, 30);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(829, 31);
            this.panel2.TabIndex = 4;
            // 
            // Finished
            // 
            this.Finished.Location = new System.Drawing.Point(464, 4);
            this.Finished.Name = "Finished";
            this.Finished.Size = new System.Drawing.Size(78, 17);
            this.Finished.TabIndex = 2;
            this.Finished.Text = "Finished";
            this.Finished.UseVisualStyleBackColor = true;
            // 
            // titleInputBox
            // 
            this.titleInputBox.Location = new System.Drawing.Point(79, 2);
            this.titleInputBox.Name = "titleInputBox";
            this.titleInputBox.Size = new System.Drawing.Size(335, 20);
            this.titleInputBox.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.Location = new System.Drawing.Point(0, 1);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(94, 29);
            this.label2.TabIndex = 0;
            this.label2.Text = "List Name";
            // 
            // label3
            // 
            this.label3.Location = new System.Drawing.Point(485, 700);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(69, 17);
            this.label3.TabIndex = 5;
            this.label3.Text = "Last Read:";
            // 
            // lastUsedTimeLabel
            // 
            this.lastUsedTimeLabel.Location = new System.Drawing.Point(610, 696);
            this.lastUsedTimeLabel.Name = "lastUsedTimeLabel";
            this.lastUsedTimeLabel.Size = new System.Drawing.Size(182, 22);
            this.lastUsedTimeLabel.TabIndex = 6;
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(633, 4);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(41, 20);
            this.textBox1.TabIndex = 3;
            // 
            // label4
            // 
            this.label4.Location = new System.Drawing.Point(585, 3);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(42, 26);
            this.label4.TabIndex = 4;
            this.label4.Text = "Step:";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(851, 728);
            this.Controls.Add(this.lastUsedTimeLabel);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.panel2);
            this.Controls.Add(this.progressLabel);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.ReadingListBox);
            this.Controls.Add(this.panel1);
            this.Name = "Form1";
            this.Text = "Reading Flow";
            this.panel1.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            this.ResumeLayout(false);
        }

        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Label label4;

        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label lastUsedTimeLabel;

        private System.Windows.Forms.Button button6;

        private System.Windows.Forms.CheckBox Finished;

        private System.Windows.Forms.TextBox titleInputBox;


        private System.Windows.Forms.Panel panel2;
        private System.Windows.Forms.Label label2;

        private System.Windows.Forms.Button button5;

        private System.Windows.Forms.Button button4;

        private System.Windows.Forms.Label progressLabel;

        private System.Windows.Forms.Label label1;

        private System.Windows.Forms.Button button3;

        private System.Windows.Forms.Button button2;

        private System.Windows.Forms.ListBox ReadingListBox;


        private System.Windows.Forms.Panel panel1;
        private System.Windows.Forms.Button button1;

        #endregion
    }
}