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

import { Role } from "./role";
import { Option } from "./option";


/**
 * QueryFilter class represents a communication log query filter. It is used to filter records in a
 * {@link CommunicationLog.getComRecords} query.
 */
export class QueryFilter {

    /**
     * The start date from which the query searches for matching the
     * records. When used, the query returns the records not older than this date.
     * When omitted the query searches for matching records starting from the
     * oldest.
     */
    public after?: Date;

    /**
     * The end date from which the query stop searching the records. When
     * used the query returns the records older than this date. When omitted the
     * query searches for matching records until the newest.
     */
    public before?: Date;

    /**
     * The search options.
     */
    public options?: Option;

    /**
     * The call reference used in this query filter. When used, the query
     * will retrieve only the com record related to this call reference.
     */
    public callRef: string;
    
    /**
     * The remote party. When used, filters on the records in which the user
     * is engaged with this remote party.
     */
    public remotePartyId: string;
    
    /**
     * The user's role in the communication. Allows to filter on the user's
     * role in the communication.
     */
    public role?: Role;

    /**
     * @internal
     */
    constructor() {

    }
}