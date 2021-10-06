import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PgcService} from './pgc.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {PdfToMarkdownDto, ServiceClient} from '../../common/backend/rf-client';
import {FileService} from "../../common/services/file.service";
import {WorkingStateService} from "../../common/services/working-state.service";
import slugify from "slugify";

@Component({
  selector: 'app-pgc',
  templateUrl: './pgc.component.html',
  styleUrls: ['./pgc.component.scss']
})
export class PgcComponent implements OnInit, OnChanges {
  get projectName(): string {
    return this._projectName;
  }

  set projectName(value: string) {
    value = slugify(value);
    this._projectName = value;
  }

  @Input() showDetail = false;
  @Input() pdfPaths: string[] = [];
  @Input() pgc;
  @Input() private _projectName = '';
  private defaulOutputMarkdownFolder = 'C:\\test\\'
  outputPath: string;

  constructor(
    private pgcService: PgcService,
    private translate: TranslateService,
    private log: LoggingService,
    private rf: ServiceClient,
    public view: FileService,
    private state: WorkingStateService
  ) {
  }

  ngOnInit(): void {
    this.log.info('PgcComponent INIT');
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  async outputMarkdown() {

    const outputResult = await this.rf.outputPdfCommentsToMarkdown(new PdfToMarkdownDto({
      pdfPaths: this.pdfPaths,
      markdownPath: this.defaulOutputMarkdownFolder + this._projectName + '.md',
      notesTitle: this._projectName

    })).toPromise();
    this.outputPath = outputResult;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.pdfPaths?.length > 0) {
      this.projectName = this.state.currentProgram?.name ?? "Unknown"
    }
  }
}
