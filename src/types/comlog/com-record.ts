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

import { ComRecordParticipant } from "./comlog-types";
import { O2GComHistoryRecord } from "../../internal/types/comlog/o2gcomlog-types";

/**
 * ComRecord class represents a communication record, that is an history
 * call ticket stored by the O2G server for each conversation.
 */
export class ComRecord {

    private _id: number;
    private _callRef: string;
    private _acknowledged: boolean;
    private _participants: ComRecordParticipant[];
    private _begin: Date;
    private _end: Date;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns this communication record identifier.
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Returns the reference of the call that has created this communication record.
     * 
     * @return the callRef the call reference.
     */
    public get callRef(): string {
        return this._callRef;
    }

    /**
     * Returns whether this communication record has been acknowledged. This
     * parameter can only be 'true' for a missed incoming call.
     */
    public get acknowledged(): boolean {
        return this._acknowledged;
    }

    /**
     * Returns the start date of this call.
     */
    public get begin(): Date {
        return this._begin;
    }

    /**
     * Returns the end date of this call.
     */
    public get end(): Date {
        return this._end;
    }

    public get participants(): ComRecordParticipant[] {
        return this._participants;
    }


    /**
     * @ignore
     */
    public static build(record: O2GComHistoryRecord): ComRecord {

        let result = new ComRecord;
        result._id = record.recordId;
        result._callRef = record.comRef;
        result._acknowledged = record.acknowledged;
        result._participants = record.participants;
        result._begin = new Date(record.beginDate);
        result._end = new Date(record.endDate);

        return result;
    }
}