/*
* Copyright 2021 ALE International
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this 
* software and associated documentation files (the "Software"), to deal in the Software 
* without restriction, including without limitation the rights to use, copy, modify, merge, 
* publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
* to whom the Software is furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all copies or 
* substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
* BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
* DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

import {RestService} from './rest-service'
import HttpContent from '../util/http-content';
import UtilUri from "../util/util-uri";
import AssertUtil from "../util/assert";
import { Option } from '../../types/comlog/option';
import {QueryResult} from '../../types/comlog/query-result';
import {ComRecord} from '../../types/comlog/com-record';
import {Page} from '../../types/comlog/page';
import {QueryFilter} from '../../types/comlog/query-filter';
import { Role } from '../../types/comlog/role';
import { O2GComHistoryRecord, O2GComHistoryRecords } from '../types/comlog/o2gcomlog-types';

export default class CommunicationLogRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getComRecords(filter: QueryFilter, page: Page, optimized: boolean, loginName: string): Promise<QueryResult> {

        var uriGet = this._uri;
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        if (filter) {
            if (filter.after) {
                uriGet = UtilUri.appendQuery(uriGet, "afterDate", filter.after.toString());
            }
            if (filter.before) {
                uriGet = UtilUri.appendQuery(uriGet, "beforeDate", filter.before.toString());
            }

            if (filter.options) {
                if (filter.options & Option.UNACKNOWLEDGED) {
                    uriGet = UtilUri.appendQuery(uriGet, "unacknowledged", "true");
                }

                if (filter.options & Option.UNANSWERED) {
                    uriGet = UtilUri.appendQuery(uriGet, "unanswered", "true");
                }
            }

            if (filter.role) {
                if (filter.role === Role.CALLEE) {
                    uriGet = UtilUri.appendQuery(uriGet, "role", "CALLEE");
                }
                else if (filter.role == Role.CALLER) {
                    uriGet = UtilUri.appendQuery(uriGet, "role", "CALLER");
                }
            }

            if (filter.callRef) {
                uriGet = UtilUri.appendQuery(uriGet, "comRef", filter.callRef);
            }

            if (filter.remotePartyId) {
                uriGet = UtilUri.appendQuery(uriGet, "remotePartyId", filter.remotePartyId);
            }
        }

        if (page) {
            if (AssertUtil.positive(page.offset, "page.offset") > 0) {
                uriGet = UtilUri.appendQuery(uriGet, "offset", page.offset.toString());
            }

            if (AssertUtil.positive(page.limit, "page.limit") > 0) {
                uriGet = UtilUri.appendQuery(uriGet, "limit", page.limit.toString());
            }
        }

        if (optimized) {
            uriGet = UtilUri.appendQuery(uriGet, "optimized", "true");
        }


        let o2gComRecords: O2GComHistoryRecords = this.getResult<O2GComHistoryRecords>(await RestService._httpClient.get(uriGet));
        if (o2gComRecords) {

            return QueryResult.build(o2gComRecords);
        }
        else {
            return null;
        }
    }

    public async getComRecord(recordId: string, loginName: string): Promise<ComRecord> {
        
        var uriGet = UtilUri.appendPath(this._uri, recordId);
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let o2gComRecord: O2GComHistoryRecord = this.getResult<O2GComHistoryRecord>(await RestService._httpClient.get(uriGet));
        if (o2gComRecord) {
            return ComRecord.build(o2gComRecord);
        }
        else {
            return null;
        }
    }

    public async deleteComRecord(recordId: string, loginName: string): Promise<boolean> {
        var uriDelete = UtilUri.appendPath(this._uri, recordId);
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async deleteComRecords(filter: QueryFilter, loginName: string): Promise<boolean> {
        var uriDelete = this._uri;
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        if (filter) {
            if (filter.after) {
                uriDelete = UtilUri.appendQuery(uriDelete, "afterDate", filter.after.toString());
            }
            if (filter.before) {
                uriDelete = UtilUri.appendQuery(uriDelete, "beforeDate", filter.before.toString());
            }

            if (filter.options) {
                if (filter.options & Option.UNACKNOWLEDGED) {
                    uriDelete = UtilUri.appendQuery(uriDelete, "unacknowledged", "true");
                }

                if (filter.options & Option.UNANSWERED) {
                    uriDelete = UtilUri.appendQuery(uriDelete, "unanswered", "true");
                }
            }

            if (filter.role) {
                if (filter.role == Role.CALLEE) {
                    uriDelete = UtilUri.appendQuery(uriDelete, "role", "CALLEE");
                }
                else if (filter.role == Role.CALLER) {
                    uriDelete = UtilUri.appendQuery(uriDelete, "role", "CALLER");
                }
            }

            if (filter.callRef) {
                uriDelete = UtilUri.appendQuery(uriDelete, "comRef", filter.callRef);
            }

            if (filter.remotePartyId) {
                uriDelete = UtilUri.appendQuery(uriDelete, "remotePartyId", filter.remotePartyId);
            }
        }

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async deleteComRecordsById(recordIds: string[], loginName: string): Promise<boolean> {

        var uriDelete = UtilUri.appendQuery(this._uri, "recordIdList", recordIds.join(','));
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    private async _ackOrUnAckComRecords(ack: string, recordIds: string[], loginName: string): Promise<boolean> {

        var uriPut = UtilUri.appendQuery(this._uri, "acknowledge", ack);
        if (loginName) {
            uriPut = UtilUri.appendQuery(uriPut, "loginName", loginName);
        }

        let req: any = new Object();
        req.recordIds = recordIds;

        var json = JSON.stringify(req);

        var httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();  
    }

    public async acknowledgeComRecords(recordIds: string[], loginName: string): Promise<boolean> {
        return this._ackOrUnAckComRecords("true", recordIds, loginName);
    }

    public async acknowledgeComRecord(recordId: string, loginName: string): Promise<boolean> {
        return this._ackOrUnAckComRecords("true", [recordId], loginName);
    }

    public async unacknowledgeComRecords(recordIds: string[], loginName: string): Promise<boolean> {
        return this._ackOrUnAckComRecords("false", recordIds, loginName);
    }

    public async unacknowledgeComRecord(recordId: string, loginName: string): Promise<boolean> {
        return this._ackOrUnAckComRecords("false", [recordId], loginName);
    }
}