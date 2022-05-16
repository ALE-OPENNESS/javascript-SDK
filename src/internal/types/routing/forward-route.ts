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

import { ForwardCondition } from "../../../types/routing/forward";
import {O2GDestination} from "./o2g-destination";

export class ForwardRoute {
    forwardType: string;
    destinations: O2GDestination[];

    /**
     * @internal
     */
    private constructor() {
    }

    /**
     * @ignore
     */
    public static createForwardOnVoiceMail(condition : ForwardCondition): ForwardRoute {

        let result: ForwardRoute = new ForwardRoute();
        result.destinations = [
            O2GDestination.createVoiceMailDestination()
        ];

        if (condition !== ForwardCondition.IMMEDIATE) {
            result.forwardType = condition.toString();
        }
        return result;
    }

    /**
     * @ignore
     */
     public static createForwardOnNumber(number: string, condition: ForwardCondition): any {

        let result: ForwardRoute = new ForwardRoute();
        result.destinations = [
            O2GDestination.createNumberDestination(number)
        ];

        if (condition !== ForwardCondition.IMMEDIATE) {
            result.forwardType = condition.toString();
        }
        return result;
    }

    /*
    static getForwardType(condition: ForwardCondition): string {
        switch (condition) {
            case ForwardCondition.BUSY: return "BUSY";
            case ForwardCondition.NO_ANSWER: return "NO_ANSWER";
            case ForwardCondition.BUSY_OR_NO_ANSWER: return "BUSY_NO_ANSWER";
            default: return null;
        }
    }
    */
}
