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

import { DndState } from "../../../types/routing/routing-types";
import { ForwardRoute } from "./forward-route";
import { O2GDestination } from "./o2g-destination";
import OverflowRoute from "./overflow-route";


export type O2GRoutingCapabilities = {
    presentationRoute: boolean;
    forwardRoute: boolean;
    overflowRoute: boolean;
    dnd: boolean;
}

export type PresentationRoute = {
    destinations: O2GDestination[];
}

export type O2GRoutingState = {
    presentationRoutes: PresentationRoute[];
    forwardRoutes: ForwardRoute[];
    overflowRoutes: OverflowRoute[];
    dndState: DndState;
}
