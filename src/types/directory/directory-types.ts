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

import { PartyInfo } from "../common/common-types"

/**
 * Code represents the status of a directory search. Each time a call to
 * {@link Directory.getResults} is done, the returned result code must be
 * tested.
 */
export enum Code {

    /**
     * Responses are provided this time. Continue to invoking
     * {@linkplain Directory.getResults} periodically to get the next results.
     */
    OK = 'OK',

    /**
     * No response received. Continue to invoking
     * {@link Directory.getResults} to get more results.
     */
    NOK = 'NOK',

    /**
     * Search is finished. 
     */
    FINISH = 'FINISH',

    /**
     * Search is ended for timeout reason.
     */
    TIMEOUT = 'TIMEOUT'
}

/**
 * SearchResult represents the result of a directory search.
 */
 export type SearchResult = {

    /**
     * The result code of this search result.
     */
    resultCode: Code;

    /**
     * The results.
     */
    resultElements: {

        /**
         * The contacts found.
         */
        contacts: PartyInfo[];
    }[];
}