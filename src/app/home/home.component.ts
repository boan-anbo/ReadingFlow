import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TauriService} from "../core/services";
import {RoutingService} from "../common/services/routing.service";
import {FileService} from "../common/services/file.service";
import {IpcRendererManagerService} from "../core/services/electron/ipc-renderer-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public routing: RoutingService,
    private router: Router,
    private es: TauriService,
    private fileService: FileService,
    private ipc: IpcRendererManagerService
    ) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
    // this.test()
  }

  async test() {

    // console.log(this.es.remote.dialog.showOpenDialog())
    // const result = await this.ipc.invoke(IpcEvents.FS_PICK_FILES_DIALOG);
    const result = await this.fileService.pickMultiplePdfFiles();
    //   .then(result => {
    //   if (result.canceled === false) {
    //     console.log("Selected file paths:")
    //     console.log(result.filePaths)
    //   }
    // }).catch(err => {
    //   console.log(err)
    // })
    console.log(result)
  }


}
