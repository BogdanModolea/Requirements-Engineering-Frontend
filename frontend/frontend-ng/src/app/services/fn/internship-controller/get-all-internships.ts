/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Internship } from '../../models/internship';

export interface GetAllInternships$Params {
  Authorization: string;
}

export function getAllInternships(http: HttpClient, rootUrl: string, params: GetAllInternships$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Internship>>> {
  const rb = new RequestBuilder(rootUrl, getAllInternships.PATH, 'get');
  if (params) {
    rb.header('Authorization', params.Authorization, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Internship>>;
    })
  );
}

getAllInternships.PATH = '/api/internship/listInternships';
