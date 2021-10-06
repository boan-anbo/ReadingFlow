import {Component, OnInit} from '@angular/core';
import {ProjectBrowserService} from './project-browser.service';
import {TranslateService} from "@ngx-translate/core";
import {LoggingService} from "../../core/services/logging/logging.service";
import {GenericCreateDtoWithName, DataClient, ProjectEntity} from "../../common/backend/rf-client";
import {ProjectService} from "../../common/services/project.service";
import {ListBrowserService} from "../list-browser/list-browser.service";
import {RoutingQuickService} from "../../common/services/routing-quick.service";

@Component({
  selector: 'app-project-browser',
  templateUrl: './project-browser.component.html',
  styleUrls: ['./project-browser.component.scss']
})
export class ProjectBrowserComponent implements OnInit {

  constructor(
    private projectBrowserService: ProjectBrowserService,
    private translate: TranslateService,
    private log: LoggingService,
    private project: ProjectService,
    private routeQ: RoutingQuickService,
    private list: ListBrowserService,
    private data: DataClient,
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.log.info('ProjectBrowserComponent INIT');
    await this.projectBrowserService.loadProjects();
  }


  getProjects(): ProjectEntity[] {
    return this.projectBrowserService.projects;
  }

  async setCurrentProject(project: ProjectEntity) {
    this.project.currentProject = project;
    await this.routeQ.toListBrowserFirstReload();
    await this.routeQ.toProgramBrowserSecondReload();
  }

  hasProjects() {
    return this.projectBrowserService.projects?.length > 0;
  }

  async onNewProjectCreated(name: string) {
    await this.data.createProject(new GenericCreateDtoWithName({
      name
    })).toPromise();
    await this.projectBrowserService.loadProjects();
  }
}
