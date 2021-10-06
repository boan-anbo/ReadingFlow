import {Component, Input, OnInit} from '@angular/core';
import {StatusService} from './status.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {WorkingStateService} from "../../common/services/working-state.service";
import {RfServerService} from "../../common/services/rf-server.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  @Input() status;
  constructor(
    private statusService: StatusService,
    private translate: TranslateService,
    private log: LoggingService,
    public state: WorkingStateService,
    public backend: RfServerService
  ) { }

  ngOnInit(): void {
    this.log.info('StatusComponent INIT');
   }

  async startServer() {
    await this.backend.startServer()
  }

  async stopServer() {

    await this.backend.stopServer()
  }

  async restartServer() {
    await this.backend.restartServer()
  }

  openServerInBrowser(port:number) {
    open("http://localhost:" + port)
  }
}
