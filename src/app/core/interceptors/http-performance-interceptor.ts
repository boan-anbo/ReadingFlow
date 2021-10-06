import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoggingService} from "../services/logging/logging.service";
import {finalize, tap} from "rxjs/operators";

@Injectable()
export class HttpPerformanceInterceptor implements HttpInterceptor {

  constructor(
    private log: LoggingService
  ) {

  }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const started = Date.now();
    let ok: string;

    console.log('Outgoing Request', req);

    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {

          console.log("Success Response", event);
          if (event instanceof HttpResponse) {
            ok =  'succeeded';
          } else {
            ok = '';
          }
        },
        (error: HttpErrorResponse) => ok = 'failed'
      ),
      finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
          console.log(msg);
        }
      )
    )
  }
}
