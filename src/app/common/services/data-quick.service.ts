import { Injectable } from '@angular/core';
import {
  CreateGenericWithParentDto,
  DataClient, ListEntity,
  ProgramEntity,
  ProgramItemEntity,
  UpdateProgramItemDto
} from "../backend/rf-client";
import {WorkingStateService} from "./working-state.service";

@Injectable({
  providedIn: 'root'
})
export class DataQuickService {

  constructor(
    private data: DataClient,
    private state: WorkingStateService
  ) { }


  async getPrgramsByCurrentProjectId(): Promise<ProgramEntity[]> {
    return await this.data.getProgramsByProject(this.state.getCurrentProjectId()).toPromise();
  }

  async createProgramInCurrentProject(name: string) {
    const currentProjectId = this.state.getCurrentProjectId();
    return await this.data.createProgram(new CreateGenericWithParentDto({
      name,
      parentId: currentProjectId
    })).toPromise();
  }

  // becareful using it because it updates all kinds of properties. Better to use specific endpoint to update specific properties like start or end time.
  async updateProgramItemEntity(found: ProgramItemEntity) {

    await this.data.updateProgramItem(new UpdateProgramItemDto({...found})).toPromise();
  }

  async createListInCurrentProject(name: string): Promise<ListEntity> {
    const currentProjectId = this.state.getCurrentProjectId();
    return await this.data.createList(new CreateGenericWithParentDto({
      name,
      parentId: currentProjectId
    })).toPromise();
  }
}
