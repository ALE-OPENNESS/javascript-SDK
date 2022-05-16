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
 * The Page class allows to define a paging mechanism to query the
 * communication log.
 * @see {@link CommunicationLog.getComRecords}
 */
 export class Page {

    private _offset: number;
    private _limit: number;

    /**
     * Constructs a new Page starting with the specified offset and with the
     * specified length.
     * 
     * @param offset the page offset
     * @param length  the page length
     */
     constructor(offset: number, limit: number) {
        this._offset = offset;
        this._limit = limit;
    }

    /**
     * Moves to the next page.
     */
     public next() {
        this._offset += this._limit;
    }

    /**
     * Moves to the previous page.
     */
     public previous() {
        this._offset -= this._limit;
        if (this._offset < 0) {
            this._offset = 0;
        }
    }

    /**
     * Returns the offset of the page that is the offset of the first com record.
     */
     public get offset(): number {
        return this._offset;
    }

    /**
     * Returns the maximum number of record in this page.
     */
     public get limit(): number {
        return this._limit;
    }
}