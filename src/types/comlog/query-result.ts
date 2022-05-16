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

import {ComRecord} from "./com-record";
import { Page } from "./page";
import { O2GComHistoryRecords } from "../../internal/types/comlog/o2gcomlog-types";

/**
 * QueryResult class represents the result of a communication log query.
 * The {@link CommunicationLog} service provides a paging mechanism that allows the application to query the result by pages.
 */
 export class QueryResult {
    private _count: number;
    private _page: Page;
    private _records: ComRecord[];


    /**
     * @internal
     */
    constructor() {

    }

    /**
     * Returns the number of record in this result.
     */
     public get count(): number {
        return this._count;
    }

    /**
     * Returns the page associated to this result.
     */
     public get page(): Page {
        return this._page;
    }

    /**
     * Gets the list of com record returned by the query.
     */
    public get records(): ComRecord[] {
        return this._records;
    }


    /**
     * @ignore
     */
    public static build(o2gComRecords: O2GComHistoryRecords): QueryResult {

        let result = new QueryResult();

        let offset = o2gComRecords.offset ? o2gComRecords.offset : 0;
        let limit = o2gComRecords.limit ? o2gComRecords.limit : 0;

        result._page = new Page(offset, limit);
        result._count = o2gComRecords.totalCount;
        result._records = o2gComRecords.comHistoryRecords.map((cr) => ComRecord.build(cr));
        return result;
    }
}