import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {ROUTES} from "../../ROUTES";
import {ROUTE_OUTLET} from "../../consts/route-outlets";
import {LoggingService} from "../../core/services/logging/logging.service";
import {HubService} from './hub.service';
import {filter} from "rxjs/operators";
import {HubQuickMessageService} from "./hub-quick-message.service";
import {ROUTING_INSTRUCTION} from "../../consts/hub-instruction";
import {HubMessage} from "../../consts/hub-message";
import {COMPONENTS} from "../../consts/components";

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private router: Router,
    private log: LoggingService,
    private hub: HubService,
    private hubQuick: HubQuickMessageService
  ) {
    this.hub.hubMessages
      .pipe(
        filter((message) => message !== null),
        filter((message) => message.receiver === COMPONENTS.ROUTING_SERVICE || message.receiver === COMPONENTS._EVERYONE)
      );
  }


  routingImporterHubMessagesHandler = async (message: HubMessage<any, ROUTING_INSTRUCTION>) => {
    if (!message.payload) {
      throw new Error("Need to provide routing target in message payload.")
    }
    switch (message.instruction) {
      case ROUTING_INSTRUCTION.NAVIGATE_TO_PRIMARY:
        await this.toRoute(message.payload, ROUTE_OUTLET.PRIMARY);
        break;
      case ROUTING_INSTRUCTION.NAVIGATE_TO_SECONDARY:
        await this.toRoute(message.payload, ROUTE_OUTLET.PRIMARY);
        break;
      default:
        return;
      // case HUB_INSTRUCTION.ADD_ITEM_TO_PROGRAM:
      //   this.addItemToProgram(message.payLoad);
      //   break;
    }
  };


  async toRoute(route: ROUTES, outlet: ROUTE_OUTLET = ROUTE_OUTLET.PRIMARY) {
    this.log.info(`Nav ${outlet} to ${route}`);
    switch (outlet) {
      case ROUTE_OUTLET.PRIMARY:
        await this.router.navigate([route]);
        break;
      case ROUTE_OUTLET.SECONDARY:
        await this.router.navigate([{outlets: {second: [route]}}]);
        break;

    }

  }

  toDetail() {
    this.toRoute(ROUTES.DETAIL);
  }

  toBlank() {
    this.toRoute(ROUTES.BLANK);
  }

  async toSecondRoute(route: ROUTES, componentToReload?: COMPONENTS, idToLoad: string=null) {
    if (componentToReload) {
      this.hubQuick.tellDataViwersToReload(componentToReload, idToLoad);
    }
    await this.toRoute(route, ROUTE_OUTLET.SECONDARY);
  }

  async toFirstRoute(route: ROUTES, componentToReload?: COMPONENTS, idToLoad: string=null) {
    if (componentToReload) {

      this.hubQuick.tellDataViwersToReload(componentToReload, idToLoad);
    }
    await this.toRoute(route, ROUTE_OUTLET.PRIMARY);
  }
}
