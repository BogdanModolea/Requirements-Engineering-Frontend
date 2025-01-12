/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Application } from '../../models/application';

export interface AcceptApplication$Params {
  applicationId: number;
  Authorization: string;
}

export function acceptApplication(http: HttpClient, rootUrl: string, params: AcceptApplication$Params, context?: HttpContext): Observable<StrictHttpResponse<Application>> {
  const rb = new RequestBuilder(rootUrl, acceptApplication.PATH, 'post');
  if (params) {
    rb.path('applicationId', params.applicationId, {});
    rb.header('Authorization', params.Authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Application>;
    })
  );
}

acceptApplication.PATH = '/api/applications/accept/{applicationId}';
