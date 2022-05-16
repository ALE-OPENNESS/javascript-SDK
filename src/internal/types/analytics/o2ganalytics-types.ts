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

export type O2GIncident = {
    date: string;
    hour: string;
    severity: number;
    value: string;
    type: string;
    nbOccurs: number;
    node: string;
    main: boolean;
    rack: string;
    board: string;
    equipment: string;
    termination: string;
}

export type O2GChargingFile = {
    name: string;
    date: string;
    time: string;
}

export type O2GTelFacilities = {
    facilities: string[];
}

export type O2GCharging = {
    caller: string;
	name: string;
	called: string;
	initialDialledNumber: string;
	callNumber: number;
	chargingUnits: number;
	cost: number;
	startDate: string;
	duration: number;
	callType: string;
	effectiveCallDuration: number;
	actingExtensionNumberNode: number;
	internalFacilities: O2GTelFacilities;
	externalFacilities: O2GTelFacilities;
}

export type O2GChargingResult = {
    chargings : O2GCharging[];
    fromDate: string;
    toDate: string;
    nbChargingFiles: number;
    totalTicketNb: number;
    valuableTicketNb: number;
}

