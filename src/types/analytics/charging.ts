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

import { O2GCharging } from "../../internal/types/analytics/o2ganalytics-types";
import { CallType } from "./call-type";
import { TelFacility } from "./tel-facility";

/**
 * Charging represents a charging information.
 */
export class Charging {

    private _caller: string;
    private _name: string;
    private _called: string;
    private _initialDialedNumber: string;
    private _callNumber: number;
    private _chargingUnits: number;
    private _cost: number;
    private _startDate: Date;
    private _duration: number;
    private _callType: CallType;
    private _effectiveCallDuration: number;
    private _actingExtensionNumberNode: number;
    private _internalFacilities: TelFacility[];
    private _externalFacilities: TelFacility[];
    
    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns the caller phone number.
     */
    public get caller(): string {
		return this._caller;
	}

    /**
     * Returns the caller name.
     */	
     public get name(): string {
		return this._name;
	}

    /**
     * Returns the called phone number.
     */	
	public get called(): string {
		return this._called;
	}

    /**
     * Returns the initial dialed number.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get initialDialedNumber(): string {
		return this._initialDialedNumber;
	}

    /**
     * Returns the number of charged calls.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get callNumber(): number {
		return this._callNumber;
	}

    /**
     * Returns the number of charged units.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get chargingUnits(): number {
		return this._chargingUnits;
	}

    /**
     * Returns the call charging cost.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get cost(): number {
		return this._cost;
	}

    /**
     * Returns the call start date.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get startDate(): Date {
		return this._startDate;
	}

    /**
     * Returns the call duration.
     */	
	public get duration(): number {
		return this._duration;
	}

    /**
     * Returns the call type.
     * <p>
     * This information is provided only if the query has been done with the 'all' option.
     * @see {@link Analytics.getChargings}.
     */	
	public get callType(): CallType {
		return this._callType;
	}

    /**
     * Returns the effective call duration.
     */	
	public get effectiveCallDuration(): number {
		return this._effectiveCallDuration;
	}

    /**
     * Returns the acting extension node number.
     */	
	public get actingExtensionNumberNode(): number {
		return this._actingExtensionNumberNode;
	}

    /**
     * Return the internal facilities.
     */	
	public get internalFacilities(): TelFacility[] {
		return this._internalFacilities;
	}

    /**
     * Return the external facilities.
     */	
	public get externalFacilities(): TelFacility[] {
		return this._externalFacilities;
	}


    /**
     * @ignore
     */
    public static build(o2gCharging: O2GCharging): Charging {

        let result = new Charging();

        result._caller = o2gCharging.caller;
        result._name = o2gCharging.name;
        result._called = o2gCharging.called;
        result._initialDialedNumber = o2gCharging.initialDialledNumber;
        result._callNumber = o2gCharging.callNumber;
        result._chargingUnits = o2gCharging.chargingUnits;
        result._cost = o2gCharging.cost;

        result._startDate = this._makeDate(o2gCharging.startDate);
        
        result._duration = o2gCharging.duration;
        result._callType = CallType[o2gCharging.callType];
        result._effectiveCallDuration = o2gCharging.effectiveCallDuration;
        result._actingExtensionNumberNode = o2gCharging.actingExtensionNumberNode;

        if (o2gCharging.internalFacilities) {
            result._internalFacilities = o2gCharging.internalFacilities.facilities.map((f: string) => TelFacility[f]);
        }

        if (o2gCharging.externalFacilities) {
            result._externalFacilities = o2gCharging.externalFacilities.facilities.map((f: string) => TelFacility[f]);
        }

        return result;
    }

    private static _makeDate(date: string): Date {

        let items = date.split(' ');
        return new Date(items[0].substring(0, 4) + '-' + items[0].substring(4, 6) + '-' + items[0].substring(6, 8) + 'T' + items[1]);
    }
}