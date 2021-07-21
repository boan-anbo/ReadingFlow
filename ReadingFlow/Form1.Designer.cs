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
            this.button3 = new System.Windows.Forms.Button();
            this.button2 = new System.Windows.Forms.Button();
            this.button1 = new System.Windows.Forms.Button();
            this.ReadingListBox = new System.Windows.Forms.ListBox();
            this.label1 = new System.Windows.Forms.Label();
            this.progressLabel = new System.Windows.Forms.Label();
            this.button4 = new System.Windows.Forms.Button();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.button4);
            this.panel1.Controls.Add(this.button3);
            this.panel1.Controls.Add(this.button2);
            this.panel1.Controls.Add(this.button1);
            this.panel1.Location = new System.Drawing.Point(12, 12);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(831, 44);
            this.panel1.TabIndex = 0;
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(512, 3);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(145, 43);
            this.button3.TabIndex = 2;
            this.button3.Text = "Read Next";
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
            this.button1.Size = new System.Drawing.Size(124, 40);
            this.button1.TabIndex = 0;
            this.button1.Text = "Load Files";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.SelectFilesToRead);
            // 
            // ReadingListBox
            // 
            this.ReadingListBox.FormattingEnabled = true;
            this.ReadingListBox.Location = new System.Drawing.Point(12, 73);
            this.ReadingListBox.Name = "ReadingListBox";
            this.ReadingListBox.Size = new System.Drawing.Size(831, 615);
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
            this.progressLabel.Location = new System.Drawing.Point(80, 698);
            this.progressLabel.Name = "progressLabel";
            this.progressLabel.Size = new System.Drawing.Size(185, 19);
            this.progressLabel.TabIndex = 3;
            this.progressLabel.Text = "label2";
            // 
            // button4
            // 
            this.button4.Location = new System.Drawing.Point(216, 0);
            this.button4.Name = "button4";
            this.button4.Size = new System.Drawing.Size(175, 44);
            this.button4.TabIndex = 4;
            this.button4.Text = "button4";
            this.button4.UseVisualStyleBackColor = true;
            this.button4.Click += new System.EventHandler(this.ClickSortByYear);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(851, 728);
            this.Controls.Add(this.progressLabel);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.ReadingListBox);
            this.Controls.Add(this.panel1);
            this.Name = "Form1";
            this.Text = "Reading Flow";
            this.panel1.ResumeLayout(false);
            this.ResumeLayout(false);
        }

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