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

import { O2GRoutingState, PresentationRoute } from "../../internal/types/routing/o2grouting-types";
import {Forward} from "./forward";
import {Overflow} from "./overflow";
import { DndState } from "./routing-types";

/**
 * RoutingState represente a user routing state. A routing state is
 * composed of four elements:
 * <table>
 * <caption>Routing state elements</caption>
 * <tr>
 * <td>Remote extension activation</td>
 * <td>When the user is configured with a remote extension, he has the
 * possibility to activate or deactivate this remote extension. when the remote
 * extension is de-activated, call are not presented on the mobile device.</td>
 * </tr>
 * <tr>
 * <td>Forward</td>
 * <td>The user can configure a forward, on his voice mail if any or on any
 * other number (depending on the cOmniPCX Enterprise configuration).</td>
 * </tr>
 * <tr>
 * <td>Overflow</td>
 * <td>The user can configure an overflow on his voice mail.
 * If a forward is configured, it is considered prior the overflow.</td>
 * </tr>
 * <tr>
 * <td>Do Not Disturb</td>
 * <td>When Do Not Disturb (DND) is activated, call are not presented to the
 * user.</td>
 * </tr>
 * 
 * </table>
 */
export class RoutingState {

    private _dndState: DndState;
    private _forward: Forward;
    private _overflow: Overflow;
    private _remoteExtensionActivated: boolean;

    /**
     * @internal
     */
    private constructor() {
    }

    /**
     * Return the do not disturb state.
     */
    public get dndState(): DndState {
        return this._dndState;
    }

    /**
     * Returns the forward.
     */
    public get forward(): Forward {
        return this._forward;
    }

    /**
     * Returns the overflow.
     */
    public get overflow(): Overflow {
        return this._overflow;
    }

    /**
     * Returns whether the routing on remote extension is activated.
     */
    public get remoteExtensionActivated(): boolean {
        return this._remoteExtensionActivated
    }



    /**
     * @ignore
     */
    public static build(routingState: O2GRoutingState) {

        let result: RoutingState = new RoutingState();

        result._dndState = routingState.dndState;

        if (routingState.forwardRoutes && (routingState.forwardRoutes.length > 0)) {
            result._forward = Forward.build(routingState.forwardRoutes[0]);
        }
        else {
            result._forward = Forward.build();
        }

        if (routingState.overflowRoutes && (routingState.overflowRoutes.length > 0)) {
            result._overflow = Overflow.build(routingState.overflowRoutes[0]);
        }
        else {
            result._overflow = Overflow.build();
        }

        result._remoteExtensionActivated = this.getRemoteExtensionActivation(routingState.presentationRoutes);

        return result;
    }

    /**
     * @ignore
     */
     private static getRemoteExtensionActivation(presentationRoutes: PresentationRoute[]): boolean {
        if (presentationRoutes && (presentationRoutes.length > 0)) {

            for (const presentationRoute of presentationRoutes) {
                
                var mobileDestination = presentationRoute.destinations.find(destination => destination.type === "MOBILE");
                if (mobileDestination && mobileDestination.selected) {
                    return true;
                }
            }
        }

        return false;
    }
}
