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

import { OverflowCondition } from "../../../types/routing/overflow";
import { O2GDestination } from "./o2g-destination";

export default class OverflowRoute {

    overflowType: string;
    destinations: O2GDestination[];

    /**
     * @internal
     */
    private constructor() {
    }

    /**
     * @ignore
     */
    public static createOverflowOnVoiceMail(condition: OverflowCondition): OverflowRoute {

        let result: OverflowRoute = new OverflowRoute();

        result.overflowType = condition.toString();
        result.destinations = [
            O2GDestination.createVoiceMailDestination()
        ]

        return result;
    }

    /*
    public static getOverflowType(condition: OverflowCondition): string {
        if (condition === OverflowCondition.BUSY) return "BUSY";
        else if (condition === OverflowCondition.NO_ANSWER) return "NO_ANSWER";
        else return "BUSY_NO_ANSWER";
    }
    */
}
