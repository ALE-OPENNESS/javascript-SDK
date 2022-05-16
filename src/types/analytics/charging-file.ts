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

import { O2GChargingFile } from "../../internal/types/analytics/o2ganalytics-types";

/**
 * ChargingFile class represent a charging file on OmniPCX Enterprise.
 * @see {@link Analytics.getChargingFiles}
 */
 export class ChargingFile {

    private _name: string;
    private _date: Date;
    
    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns the file name.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Returns this file timestamp.
     */
    public get timestamp(): Date {
        return this._date;
    }

    /**
     * @ignore
     */
    public static build(o2gChargingFile: O2GChargingFile) {

        let result = new ChargingFile();

        result._name = o2gChargingFile.name;
        result._date = this._makeDate(o2gChargingFile.date, o2gChargingFile.time)

        return result;
    }


    private static _makeIsoDate(date: string): string {

        let dateItem = date.trim().split('/');
        return (2000 + parseInt(dateItem[2])).toString() + '-' + dateItem[1] + '-' + dateItem[0];
    }

    private static _makeDate(date: string, hour: string) {
        return new Date(this._makeIsoDate(date) + 'T' + hour.trim());
    }
}