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

import { ForwardRoute } from "../../internal/types/routing/forward-route";
import { Destination } from "./destination";

/**
 * ForwardCondition represents the possible condition a user can associate to a forward.
 */
export enum ForwardCondition {

    /**
     * Incoming calls are immediately forwarded on the target.
     */
    IMMEDIATE = "IMMEDIATE",

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
 * Forward represents a forward the user has activated.
 */
 export class Forward {

    private _destination: Destination;
    private _number: string;
    private _condition: ForwardCondition; 

    /**
     * @internal
     */
    private constructor() {
    }

    /**
     * Returns this forward destination.
     */
    public get destination(): Destination {
        return this._destination;
    }

    /**
     * Returns the number destination of this forward.
     */
    public get number(): string {
        return this._number;
    }

    /**
     * Returns this forward associated condition.
     */
    public get condition(): ForwardCondition {
        return this._condition
    }

    /**
     * @ignore
     */
    public static build(forwardRoute: ForwardRoute = null): Forward {

        let result = new Forward();

        if (forwardRoute) {
            if (forwardRoute.destinations.length === 1) {
                result._destination = Destination[forwardRoute.destinations[0].type];
                if (result._destination === Destination.NUMBER) {
                    result._number = forwardRoute.destinations[0].number;
                }
                else {
                    result._number = null;
                }
            }

            result._condition = ForwardCondition[forwardRoute.forwardType];
        }
        else {
            result._condition = null;
            result._destination = Destination.NONE;
            result._number = null;
        }

        return result;
    }

    /*
    getCondition(forwardType: string): ForwardCondition {
        if (forwardType === "BUSY") return ForwardCondition.BUSY;
        else if (forwardType === "NO_ANSWER") return ForwardCondition.NO_ANSWER;
        else if (forwardType === "BUSY_NO_ANSWER") return ForwardCondition.BUSY_OR_NO_ANSWER;
        else return ForwardCondition.IMMEDIATE;
    }


    getDestination(destinationType : string): Destination {
        if (destinationType === "NUMBER") return Destination.NUMBER;
        else if (destinationType === "VOICEMAIL") return Destination.VOICEMAIL;
        else return Destination.NONE;
    }
    */
}
