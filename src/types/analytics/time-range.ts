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

/**
 * TimeRange represents an interval between two dates. It is used to filter analytics requests.
 * @see {@link Analytics.getChargingsFromFilter} and {@link Analytics.getChargingFiles}
 */
export class TimeRange {

    private _from: Date;
    private _to: Date;

    /**
     * Construct a new TimeRange, with the specified "from" date and "to" date.
     * @param from the begining of the range
     * @param to the end of the range
     */
    constructor(from: Date, to: Date) {
        this._from = from;
        this._to = to;
    }

    /**
     * Returns the "from" date.
     */
     public get from() {
        return this._from;
    }

    /**
     * Returns the "to" date.
     */
     public get to() {
        return this._to;
    }

}