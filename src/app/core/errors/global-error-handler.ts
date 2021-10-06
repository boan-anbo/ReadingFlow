import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {ErrorDialogService} from '../../common/services/error-dialog.service';
import {RoutingService} from "../../common/services/routing.service";
import {ROUTES} from "../../ROUTES";
import {ROUTE_OUTLET} from "../../consts/route-outlets";
import {NoProjectSelectedError} from "../../exceptions/no-project-selected-error";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private errorDialogService: ErrorDialogService, private zone: NgZone, private route: RoutingService) {
  }

  async handleError(error: Error) {

    console.log("Caught message", error instanceof NoProjectSelectedError)
    if (error instanceof NoProjectSelectedError) {
      console.warn("Caught No Project Selected Error")
      await this.route.toRoute(ROUTES.PROJECT_BROWSER)
      await this.route.toRoute(ROUTES.BLANK, ROUTE_OUTLET.SECONDARY)
    }
    // default:
    //   this.zone.run(() =>
    //     this.errorDialogService.openDialog(error));
    // }


    console.error('Error from global error handler', error);
  }
}
