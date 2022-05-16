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

import OverflowRoute from "../../internal/types/routing/overflow-route";
import { Destination } from "./destination";

/**
 * OverflowCondition represents the possible condition a user can associate to an overflow.
 */
 export enum OverflowCondition {
    /**
     * Incoming calls are forwarded on the target if the user is busy.
     */
    BUSY = "BUSY",

    /**
     * Incoming calls are forwarded on the target if the user does not answer the call.
     */
    NO_ANSWER = "NO_ANSWER",

    /**
     * Incoming calls are forwarded on the target if the user is busy or if the user does not answer the call.
     */
    BUSY_OR_NO_ANSWER = "BUSY_OR_NO_ANSWER" 
}


/**
 * Overflow represents an overflow the user has activated.
 */
 export class Overflow {

    private _destination: Destination;
    private _condition: OverflowCondition; 

    /**
     * @internal
     */
    private constructor() {
    }

    /**
     * Returns this oveflow destination.
     */
     public get destination(): Destination {
        return this._destination;
    }

    /**
     * Returns this oveflow associated condition.
     */
    public get condition(): OverflowCondition {
        return this._condition
    }


    /**
     * @ignore
     */
    public static build(overflowRoute: OverflowRoute = null): Overflow {

        let result: Overflow = new Overflow();

        if (overflowRoute) {
            if (overflowRoute.destinations.length === 1) {
                result._destination = Destination[overflowRoute.destinations[0].type];
            }

            result._condition = OverflowCondition[overflowRoute.overflowType];
        }
        else {
            result._condition = null;
            result._destination = Destination.NONE;
        }

        return result;
    }

    /*
    public getCondition(overflowType: string): OverflowCondition {
        if (overflowType === "BUSY") return OverflowCondition.BUSY;
        else if (overflowType === "NO_ANSWER") return OverflowCondition.NO_ANSWER;
        else return OverflowCondition.BUSY_OR_NO_ANSWER;
    }


    public getDestination(destinationType: string): Destination {
        if (destinationType === "VOICEMAIL") return Destination.VOICEMAIL;
        else return Destination.NONE;
    }
    */
}
