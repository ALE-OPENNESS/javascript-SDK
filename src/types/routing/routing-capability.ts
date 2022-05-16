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

import { O2GRoutingCapabilities } from "../../internal/types/routing/o2grouting-types";

/**
 * RoutingCapabilities represents the routing capability of a user.
 */
export class RoutingCapabilities {
    private _presentationRoute: boolean;
    private _forwardRoute: boolean;
    private _overflowRoute: boolean;
    private _dnd: boolean;

    /**
     * @internal
     */
    constructor() {
    }

    public get canManageRemoteExtension(): boolean {
        return this._presentationRoute;
    }

    /**
     * Returns whether this user can manage forward.
     */
    public get canManageForward(): boolean {
        return this._forwardRoute;
    }

    /**
     * Returns whether this user can manage overflow.
     */
    public get canManageOverflow(): boolean {
        return this._overflowRoute;
    }

    /**
     * Returns whether this user can manage do not disturb.
     */
    public get canManageDnd(): boolean {
        return this._dnd;
    }
    

    /**
     * @ignore
     */
    public static build(capabilities: O2GRoutingCapabilities): RoutingCapabilities {

        let result = new RoutingCapabilities();
        result._presentationRoute = capabilities.presentationRoute;
        result._forwardRoute = capabilities.forwardRoute;
        result._overflowRoute = capabilities.overflowRoute;
        result._dnd = capabilities.dnd;

        return result;
    }

}