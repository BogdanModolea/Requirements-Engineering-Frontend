/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { Internship } from '../models/internship';
import { UserInfo } from '../models/user-info';
export interface Application {
  applicationDate?: string;
  id?: number;
  internship?: Internship;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  user?: UserInfo;
}
