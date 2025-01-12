/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Application } from '../../models/application';

export interface GetApplicationsByUser$Params {
  userId: number;
}

export function getApplicationsByUser(http: HttpClient, rootUrl: string, params: GetApplicationsByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Application>>> {
  const rb = new RequestBuilder(rootUrl, getApplicationsByUser.PATH, 'get');
  if (params) {
    rb.path('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Application>>;
    })
  );
}

getApplicationsByUser.PATH = '/api/applications/user/{userId}';
