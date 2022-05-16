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

import { Rsi } from "../../o2g-rsi";

/**
 * RsiPoint represents a RSI point. When a call is receive by a RSI
 * routing point, a {@link Rsi.ON_ROUTE_REQUEST} is send to the application.
 */
export type RsiPoint = {

    /**
     * This rsi point extension number.
     */
    number: string;

    /**
     * The name of this rsi point.
     */
    name: string;

    /**
     * The OmniPcx Enterprise node on which this RSI point is configured.
     */
    node: number;

    /**
     * Whether this rsi point is registered.
     */
    registered: boolean;
}


/**
 * RouteSession represents a route request session between a RSI point
 * and an application.
 * <p>
 * A route session is initiated by a RSI point by sending a
 * {@link Rsi.ON_ROUTE_REQUEST}.
 * The application selects a route and answer the request by calling
 * {@link Rsi.routeSelect}
 */
 export type RouteSession = {

    /**
     * This Route session unique idnetifier.
     */
    routeCrid: string;

    /**
     * The call extension number.
     */
    caller: string;

    /**
     * The called number.
     */
    called: string;

    /**
     * The routed call reference.
     */
    routedCallRef: string;
}