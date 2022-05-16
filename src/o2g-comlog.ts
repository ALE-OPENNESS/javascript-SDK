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

import CommunicationLogRest from "./internal/rest/comlog-rest";
import {ComRecord} from "./types/comlog/com-record";
import {Page} from "./types/comlog/page";
import {QueryFilter} from "./types/comlog/query-filter";
import {QueryResult} from "./types/comlog/query-result";

/**
 * The CommunicationLog service allows a user to retrieve his last communication history records and to manage them. Using this service requires
 * having a <b>TELEPHONY_ADVANCED</b> license.
 */
export class CommunicationLog {

    private _comLogRest: CommunicationLogRest;

    /**
     * Occurs when a new comlog entry has been created.
     * @event
     */
    readonly ON_COM_RECORD_CREATED = "OnComRecordCreated";

    /**
     * Occurs when one or more records have been modified.
     * @event
     */
    readonly ON_COM_RECORD_MODIFIED = "OnComRecordModified";

    /**
     * Occurs when one or more call log records have been deleted.
     * @see {@link deleteComRecords}, {@link deleteComRecord}, {@link deleteComRecordsById}.
     * @event
     */
    readonly ON_COM_RECORDS_DELETED = "OnComRecordsDeleted";

    /**
     * Occurs when one or more unanswered comlog records have been acknowledged.
     * @see {@link acknowledgeComRecords}, {@link acknowledgeComRecord}
     * @event
     */
    readonly ON_COM_RECORDS_ACK = "OnComRecordsAck";

    /**
     * Occurs when one or more unanswered comlog records have been unacknowledged.
     * @see {@link unacknowledgeComRecords}, {@link unacknowledgeComRecord}
     * @event
     */
    readonly ON_COM_RECORDS_UNACK = "OnComRecordsUnAck";

    /**
     * @internal
     */
    constructor(comLogRest: CommunicationLogRest) {
        this._comLogRest = comLogRest;
	}

    /**
     * Gets the com records corresponding to the specified filter, using the
     * specified page, with a possible optimization.
     * <p>
     * If 'optimized' is used and set to 'true' the query returns the
     * full identity of a participant only the first time it occurs, when the same
     * participant appears in several records. When omitted this query returns the
     * records with no optimization.
     * <p>
     * 'page' parameter allows to query the communication log by page. The
     * {@link QueryResult} result contains the same parameters and the total number
     * of records retrieved by the query.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param filter    the filter describing the query criterias
     * @param page      the page description
     * @param optimized 'true' to activate optimization.
     * @param loginName the user login name
     */
     public async getComRecords(filter: QueryFilter = null, page: Page = null, optimized: boolean = false, loginName: string = null): Promise<QueryResult> {
        return await this._comLogRest.getComRecords(filter, page, optimized, loginName);
    }

    /**
     * Gets the specified com record.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordId  the com record identifier
     * @param loginName the user login name
     */
    public async getComRecord(recordId: string, loginName: string = null): Promise<ComRecord>  {
        return await this._comLogRest.getComRecord(recordId, loginName);
    }

    /**
     * Deletes the specified com record.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordId  the com record identifier
     * @param loginName the user login name
     */
    public async deleteComRecord(recordId: string, loginName: string = null): Promise<boolean> {
        return await this._comLogRest.deleteComRecord(recordId, loginName);
    }

    /**
     * Deletes the specified list of com records.
     * <p>
     * An {@link ON_COM_RECORDS_DELETED} event is raised containing the list of the com records that have been deleted.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordIds the list of com records
     * @param loginName the user login name
     */
    public async deleteComRecordsById(recordIds: string[], loginName: string = null): Promise<boolean> {
        return await this._comLogRest.deleteComRecordsById(recordIds, loginName);
    }


    /**
     * Deletes the com records corresponding to the given filter.
     * <p>
     * When used, the 'filter' parameter defines the search criteria for the delete operation.
     * <p>
     * An {@link ON_COM_RECORDS_DELETED} event is raised
     * containing the list of the com records that have been deleted.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param filter    the filter describing the query criterias
     * @param loginName the user login name
     */
    public async deleteComRecords(filter: QueryFilter = null, loginName: string = null): Promise<boolean> {
        return await this._comLogRest.deleteComRecords(filter, loginName);
    }

    /**
     * Acknowledge the specified list of com records.
     * <p>
     * An {@link ON_COM_RECORDS_ACK} event is raised containing the list of the com records that have been acknowledged.
     * <p>
     * If the session has been opened for a user, the 'loginName" parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordIds the list of com records
     * @param loginName the user login name
     */
    public async acknowledgeComRecords(recordIds: string[], loginName: string = null): Promise<boolean> {
        return await this._comLogRest.acknowledgeComRecords(recordIds, loginName);
    }

    /**
     * Acknowledge the specified com record.
     * <p>
     * An {@link ON_COM_RECORDS_ACK} event is raised containing the list of the com records that have been acknowledged.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordId  the com record identifier
     * @param loginName the user login name
     */
    public async acknowledgeComRecord(recordId: string, loginName: string = null): Promise<boolean> {
        return await this._comLogRest.acknowledgeComRecord(recordId, loginName);
    }


     /**
     * Unacknowledge the specified list of com records.
     * <p>
     * An {@link ON_COM_RECORDS_UNACK} event is raised containing the list of the com records that have been acknowledged.
     * <p>
     * If the session has been opened for a user, the 'loginName" parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordIds the list of com records
     * @param loginName the user login name
     */
    public async unacknowledgeComRecords(recordIds: string[], loginName: string = null): Promise<boolean> {
        return await this._comLogRest.unacknowledgeComRecords(recordIds, loginName);
    }

    /**
     * Unacknowledge the specified com record.
     * <p>
     * An {@link ON_COM_RECORDS_UNACK} event is raised containing the list of the com records that have been acknowledged.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param recordId  the com record identifier
     * @param loginName the user login name
     */
    public async unacknowledgeComRecord(recordId: string, loginName: string = null): Promise<boolean> {
        return await this._comLogRest.unacknowledgeComRecord(recordId, loginName);
    }
}