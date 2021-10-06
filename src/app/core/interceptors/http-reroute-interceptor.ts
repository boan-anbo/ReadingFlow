import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RfServerService} from "../../common/services/rf-server.service";

@Injectable()
export class HttpRerouteInterceptor implements HttpInterceptor {

  constructor(
    private backend: RfServerService
  ) {

  }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this rerout all outgoing requests to use the dynamically determined port for rf-core backend retrieved from Electron main process and stored in backend service.
    console.log("Rerouting", req.url, 'to', this.backend.apiPort)
    const reroutedUrl = req.url.replace(':19862', ':' + this.backend.apiPort);
    const reroutedReq = req.clone({
      url: reroutedUrl
    });
    return next.handle(reroutedReq);
  }
}
