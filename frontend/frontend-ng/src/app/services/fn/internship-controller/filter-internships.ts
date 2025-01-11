/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { Internship } from '../../models/internship';

export interface FilterInternships$Params {
  paid?: boolean;
  open?: boolean;
  company?: string;
  startDate?: string;
  endDate?: string;
}

export function filterInternships(http: HttpClient, rootUrl: string, params?: FilterInternships$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<Internship>>> {
  const rb = new RequestBuilder(rootUrl, filterInternships.PATH, 'get');
  if (params) {
    rb.query('paid', params.paid, {});
    rb.query('open', params.open, {});
    rb.query('company', params.company, {});
    rb.query('startDate', params.startDate, {});
    rb.query('endDate', params.endDate, {});
  }

  return http.request(
    rb.build({ responseType: 'blob', accept: '*/*', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<Internship>>;
    })
  );
}

filterInternships.PATH = '/api/internship/filter';
