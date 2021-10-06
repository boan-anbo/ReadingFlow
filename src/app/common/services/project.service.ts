import {Injectable} from '@angular/core';
import {Project} from '../../models/project';
import {Item} from '../../models/item';
import {DuplicateNameError} from '../../exceptions/duplicate-name-error';
import {ITEM_TYPES} from '../../consts/item-types';
import {List} from '../../models/list';
import {ItemExistedInCollectionError} from '../../exceptions/existed-name-error';
import {LoggingService} from '../../core/services/logging/logging.service';
import {ItemFile} from '../../models/item-file';
import {ListItem} from '../../models/list-item';
import rflib from '../../../../lib-js/rflib';
import {updateOrder} from '../../../../lib-js/order';
import {ProjectEntity} from '../backend/rf-client';
import {TitleService} from './title.service';
import {HubQuickMessageService} from './hub-quick-message.service';
import {UPDATE_WORKING_STATE_INSTRUCTIONS} from "../../consts/hub-instruction";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  get currentProject(): ProjectEntity {
    return this._currentProject;
  }

  set currentProject(value: ProjectEntity) {
    this._currentProject = value;
    this.hubQ.tellWorkingStateToUpdate(UPDATE_WORKING_STATE_INSTRUCTIONS.UPDATE_CURRENT_PROJECT, value);
    this.title.setTitle(value.name);
  }
  get projects(): Project[] {
    return this._projects;
  }

  private _projects: Project[] = [];
  private _currentProject: ProjectEntity = null;
  private openedItems: Item[] = [];

  constructor(
    private log: LoggingService,
    private title: TitleService,
    private hubQ: HubQuickMessageService

  ) {

  }

  // note for these utilities functions I deliberately used non-functional style that is these functions directly change the states in the object because data service provides the single source of truth for all the data in Reading Flow. Every changes to be made on the data are made here and on the same collections of projects.
  // for projects
  clearProjects(): void {
    this._projects = [];
  }

  addProject(name): Project {
    if (!this.checkDuplicateName(this._projects, name, ITEM_TYPES.PROJECT)) {
      const newProject = new Project(name);
      this._projects.push(newProject);
      return newProject;
    } else {
      throw new DuplicateNameError(`There is already a project named ${name}`, ITEM_TYPES.PROJECT)
    }
  }

  // for lists
  addListToProject(newList: List, parentProject: Project): List {
    if (parentProject.lists.every(list => list.id !== newList.id)) {
      parentProject.lists.push(newList);
      parentProject.lists = rflib.Order.updateOrder(parentProject.lists);
      return newList;
    } else {
      throw new ItemExistedInCollectionError(ITEM_TYPES.LIST, ITEM_TYPES.PROJECT);
    }
  }

  addList(name: string, parentProject?: Project): List {
    this.checkDuplicateName(this._projects, name, ITEM_TYPES.LIST);
    const parent = parentProject ?? this.addProject('');
    const newList = new List(name);
    this.addListToProject(newList, parent);
    return newList;
  }

  removeListFromProject(listToRemove: Item, project: Project) {
    project.lists = project.lists.filter(item => item.id !== listToRemove.id);
  }

  getAllLists() {
    const allLists = [];
    this.projects.forEach(project => project.lists.forEach(list => allLists.push(list)));
    return allLists;
  }

  getListById(listId: string): List {
    this.log.info(`Searching list with the id of ${listId}`);
    const allLists = this.getAllLists();
    this.log.info(allLists);
    return allLists.find(list => list.id === listId);

  }

  // for item

  addItemToList(newItem: Item, parentList: List): Item {
    if (parentList.listItems.every(list => list.id !== newItem.id)) {
      newItem.listId = parentList.id;
      parentList.listItems.push(new ListItem(newItem));

      parentList.listItems = updateOrder(parentList.listItems);
      return newItem;
    } else {
      throw new ItemExistedInCollectionError(ITEM_TYPES.LIST, ITEM_TYPES.PROJECT);
    }
  }

  removeItemFromList(itemToRemove: Item) {
    const list = this.getListById(itemToRemove.listId);

    this.log.info(`Removing ${itemToRemove?.id} from ${list?.id}`);
    list.listItems = list.listItems.filter(item => item.id !== itemToRemove.id);
  }

  // for item file

  addItemFileToItem(newItemFile: ItemFile, item: Item) {
    newItemFile.itemId = item.id;
    item.itemFiles.push(newItemFile);
  }

  // utilities
  getProjectById(projectId: string) {
    return this.projects.find(project => project.id === projectId);
  }

  checkDuplicateName(targetCollections: (Project | Item)[], nameToCheck: string, itemType: ITEM_TYPES) {
    if (nameToCheck === '' && typeof nameToCheck === 'string') {
      return false;
    }
    if (targetCollections.some(item => item.name === nameToCheck)) {
      throw new DuplicateNameError(nameToCheck, itemType);
    }

    return false;
  }
}
