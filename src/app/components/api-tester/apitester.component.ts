import {Component, Input, OnInit} from '@angular/core';
import {ApitesterService} from './apitester.service';
import {TranslateService} from '@ngx-translate/core';
import {LoggingService} from '../../core/services/logging/logging.service';
import {DataClient} from "../../common/backend/rf-client" ;
import {TauriService} from "../../core/services";
import {IpcEvents} from "../../../../app/shared/ipc-events";
import {RfServerService} from "../../common/services/rf-server.service";
import {SignalrService} from "../../common/backend/signalr.service";

@Component({
  selector: 'app-apitester',
  templateUrl: './apitester.component.html',
  styleUrls: ['./apitester.component.scss']
})
export class ApitesterComponent implements OnInit {

  @Input() apitester;
  url = 'http://localhost:16002/v1.0/Hello/hxx';
  result: any;
  name: any;

  constructor(
    public apitesterService: ApitesterService,
    private translate: TranslateService,
    private log: LoggingService,
    private data: DataClient,
    private es: TauriService,
    public backend: RfServerService,
    private signalR: SignalrService
  ) {
  }

  ngOnInit(): void {
    this.log.info('ApitesterComponent INIT');
  }


  async loadResult() {
    // this.result = await this.apitesterService.getUrl(this.url);
    // const createItemsDtos: CreateItemDto[] = [];
    // let count = 0;
    // while (count < 10000) {
    //   const newItem = new CreateItemDto({
    //     id: '1234',
    //     name: `Hello ${count}`,
    //     filePath: `Path ${count}`
    //   });
    //   createItemsDtos.push(newItem);
    //   count++;
    // }
    const listId = "1221289c-f81b-462e-9f5e-72d2df47afd6";


    // const createdItems = await this.rf.createItems([new CreateItemDto({
    //   name: "Test Item",
    //   filePath: "C:\\Pdf.pdf"
    // })]).toPromise();
    // this.result = await this.rf.createListItems(new CreateGenericWithParentAndItemsDto({
    //   itemIds: [createdItems[0].id],
    //   parentId: listId
    // })).toPromise();
    // const listItems = await this.rf.getListItemsByList(listId).toPromise();
    // listItems[0].order = 3;
    //
    // this.result = await this.rf.updateListItem(listItems[0]).toPromise();
    // this.result = await this.rf.getListItemsByList(listId).toPromise()
    const item = await this.data.getItem("f95a8314-184f-4519-9911-a1b5154f206c").toPromise();


    // item.name = "Updated Item";
    // this.result = await this.rf.updateItem(item).toPromise();
    // this.result = await this.rf.getItem(Vx)
    // this.result = await this.rf.updateListItem()
    // console.log({createItemsDtos});
    // this.result = await this.rf.getProjectById("5d7a4a58-633e-4e47-8257-812e7898eb2f").toPromise();
    // this.result = await this.rf.createList(new CreateGenericWithParentDto({
    //   name: "Test List",
    //   parentId: "5d7a4a58-633e-4e47-8257-812e7898eb2f"
    // })).toPromise();

    // this.result = await this.rf.create(new CreateGenericDto({name: 'test'})).toPromise();
    console.log(this.result);
  }


  async testSignalR() {
    await this.signalR.connection.invoke("SendMessage", ["Your father", "fuck me"])
  }
}
