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

import { O2GIncident } from "../../internal/types/analytics/o2ganalytics-types";

export class Incident {
    private _id: number;
    private _severity: number;
    private _description: string;
    private _nbOccurs: number;
    private _node: number;
    private _main: boolean;
    private _rack: string;
    private _board: string;
    private _equipment: string;
    private _termination: string;
    private _date: Date;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns the incident identifier.
     */
     public get id(): number {
        return this._id;
    }

    /**
     * Returns the date the incident has been raised.
     */
    public get date(): Date {
        return this._date;
    }

    /**
     * Returns the incident severity.
     */
    public get severity(): number {
        return this._severity;
    }

    /**
     * Returns the textual description of this incident.
     */
    public get description(): string {
        return this._description;
    }

    /**
     * Returns the number of occurences of this incident.
     */
    public get nbOccurs(): number {
        return this._nbOccurs;
    }

    /**
     * Returns the OmniPCX Enterprise node on which this incident has been raised.
     */
    public get node(): number {
        return this._node;
    }

    /**
     * Returns whether this incident has been raised on the main OmniPCX Enterprise
     * call server.
     */
    public main(): boolean {
        return this._main;
    }

    /**
     * Returns the rack related to this incident.
     */
    public get rack(): string {
        return this._rack;
    }

    /**
     * Returns the board related to this incident.
     */
    public get board(): string {
        return this._board;
    }

    /**
     * Returns the equipement related to this incident.
     */
    public get equipment(): string {
        return this._equipment;
    }

    /**
     * Returns the termination related to this incident.
     */
    public get termination(): string {
        return this._termination;
    }

    /**
     * @ignore
     */
    public static build (o2gIncident: O2GIncident): Incident {

        let result = new Incident();

        result._id = parseInt(o2gIncident.value);
        result._severity = o2gIncident.severity;
        result._description = o2gIncident.type;
        result._nbOccurs = o2gIncident.nbOccurs;
        result._node = parseInt(o2gIncident.node);
        result._main = o2gIncident.main;
        result._rack = o2gIncident.rack;
        result._board = o2gIncident.board;
        result._equipment = o2gIncident.equipment;
        result._termination = o2gIncident.termination;

        result._date = this._makeDate(o2gIncident.date, o2gIncident.hour);

        return result;
    }


    private static _makeIsoDate(date: string): string {

        let dateItem = date.trim().split('/');
        return (2000 + parseInt(dateItem[2])).toString() + '-' + dateItem[1] + '-' + dateItem[0];
    }

    private static _makeDate(date: string, hour: string): Date {
        return new Date(this._makeIsoDate(date) + 'T' + hour.trim());
    }
}