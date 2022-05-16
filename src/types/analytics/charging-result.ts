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

import { O2GCharging, O2GChargingResult } from "../../internal/types/analytics/o2ganalytics-types";
import {Charging} from "./charging";
import {TimeRange} from "./time-range";

/**
 * ChargingResult class represents the result of a charging query to the OmniPCX Enterprise.
 * The query can be done from a list of {@link ChargingFile}, or using a {@link TimeRange} to specified the time interval.
 * @see {@link Analytics.getChargingsFromFiles} and {@link Analytics.getChargingsFromFilter}
 */
 export class ChargingResult {

    private _chargings: Charging[];
    private _chargingFileCount: number;
    private _totalTicketCount: number;
    private _valuableTicketCount: number;
    private _range: TimeRange;

    /**
     * @internal
     */
    constructor() {
    }


    /**
     * Returns the list of charging elements.
     */
    public get chargings(): Charging[] {
        return this._chargings;
    }

    /**
     * Returns the range that has been specified to query this result.
     */
    public get range(): TimeRange {
        return this._range;
    }

    /**
     * Returns the number of analysed charging files in the OmniPCX Enterprise.
     */
    public get count(): number {
        return this._chargingFileCount;
    }

    /**
     * Returns the total number of analysed tickets.
     */
    public get totalTicketCount(): number {
        return this._totalTicketCount;
    }

    /**
     * Returns the total number of valuable tickets; tickets with a non zero cost.
     */
     public get valuableTicketCount(): number {
        return this._valuableTicketCount;
    }


    /**
     * @ignore
     */
    public static build(o2gChargingResult: O2GChargingResult, range: TimeRange = null): ChargingResult {

        let result = new ChargingResult();
        
        result._chargings = o2gChargingResult.chargings.map((c: O2GCharging) => Charging.build(c));

        result._chargingFileCount = o2gChargingResult.nbChargingFiles;
        result._totalTicketCount = o2gChargingResult.totalTicketNb;
        result._valuableTicketCount = o2gChargingResult.valuableTicketNb;
        
        if (range) {
            result._range = range;
        }

        return result;
    }
}