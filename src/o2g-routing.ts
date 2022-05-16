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

import RoutingRest from "./internal/rest/routing-rest";
import {Forward, ForwardCondition } from "./types/routing/forward";
import {Overflow,  OverflowCondition } from "./types/routing/overflow";
import { RoutingCapabilities } from "./types/routing/routing-capability";
import {RoutingState} from "./types/routing/routing-state";
import { DndState } from "./types/routing/routing-types";

/**
 * The Routing service allows a user to manage forward, overflow, DoNotDisturb
 * and activation of his remote extension device (if any). Using this service
 * requires having a <b>TELEPHONY_ADVANCED</b> license.
 * <h2>Forward:</h2>A forward can be activated on the voice mail or on any
 * number as far as this number is authorized by the OmniPCX Enterprise
 * numbering policy. Use one of the methods:
 * {@link forwardOnNumber} or {@link forwardOnVoiceMail} to activate a forward. <br>
 * A {@link ForwardCondition} can be associated to the forward:
 * <table>
 * <caption>Forward conditions</caption>
 * <tr>
 * <td>IMMEDIATE
 * <td>
 * <td>Incoming calls are immediately forwarded on the target.</td>
 * <tr>
 * <tr>
 * <td>BUSY
 * <td>
 * <td>Incoming calls are forwarded on the target if the user is busy.</td>
 * <tr>
 * <tr>
 * <td>NO_ANSWER
 * <td>
 * <td>Incoming calls are forwarded on the target if the user does not answer
 * the call</td>
 * <tr>
 * <tr>
 * <td>BUSY_NO_ANSWER
 * <td>
 * <td>One of the two last conditions</td>
 * <tr>
 * </table>
 * <h2>Overflow:</h2>An overflow can be activated on the voice mail (if any).
 * Use method:
 * {@link overflowOnVoiceMail} to activate an overflow. <br>
 * A {@link OverflowCondition Condition} can be associated to the overflow:
 * <table>
 * <caption>Overflow conditions</caption>
 * <tr>
 * <td>BUSY
 * <td>
 * <td>Incoming calls are redirected on the target if the user is busy.</td>
 * <tr>
 * <tr>
 * <td>NO_ANSWER
 * <td>
 * <td>Incoming calls are redirected on the target if the user does not answer
 * the call</td>
 * <tr>
 * <tr>
 * <td>BUSY_NO_ANSWER
 * <td>
 * <td>One of the two last conditions</td>
 * <tr>
 * </table>
 * <h2>Do Not Disturb:</h2> When the Do Not Disturb (DND) is activated, the user
 * does not receive any call. The DND is activated using method
 * {@link activateDnd}.
 * <h2>Remote extension activation:</h2> When a remote extension is not
 * activated, it does not ring on incoming call. Use the method
 * {@link setRemoteExtensionActivation} to activate the remote extension. <br>
 * <h2>Eventing:</h2> For each routing modification, a
 * {@link ON_ROUTING_STATE_CHANGED} event is raised.
 */
export class Routing {

	private _routingRest: RoutingRest;

	/**
	 * Raised for each routing modification.
	 * @event
	 */
    readonly ON_ROUTING_STATE_CHANGED = "OnRoutingStateChanged";

	/**
	 * @internal
	 */
    constructor(routingRest: RoutingRest) {
		this._routingRest = routingRest;
	}

    /**
     * Activate the Do Not Disturb for the specified user.
     * <p>
     * This method does nothing and return 'true' if the Do Not Disturb is
     * already activated.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async activateDnd(loginName: string = null): Promise<boolean> {
		return await this._routingRest.activateDnd(loginName);
	}

    /**
     * Cancel the Do Not Disturb for the specified user.
     * <p>
     * This method does nothing and return 'true' if the Do Not Disturb was
     * not activated.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async cancelDnd(loginName: string = null): Promise<boolean> {
		return await this._routingRest.cancelDnd(loginName);
	}

    /**
     * Get the Do Not Disturb state of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async getDndState(loginName: string = null): Promise<DndState> {
		return await this._routingRest.getDndState(loginName);
	}

    /**
     * Allows to know what the specified user is allowed to do.
     * <p>
     * If the session has been opened for a user, the 'logiName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async getCapabilities(loginName: string = null): Promise<RoutingCapabilities> {
		return await this._routingRest.getCapabilities(loginName);
	}

    /**
     * Activate the remote extension device for the specified  user.
     * <p>
     * When the remote extension is activated, it rings on incoming call on the user
     * company phone. 
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async activateRemoteExtension(loginName: string = null): Promise<boolean> {
		return await this._routingRest.setRemoteExtensionActivation(true, loginName);
	}

    /**
     * Deactivate the remote extension device for the specified  user.
     * <p>
     * When it is deactivated, it never rings, but it can be used to
     * place an outgoing call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async deactivateRemoteExtension(loginName: string = null): Promise<boolean> {
		return await this._routingRest.setRemoteExtensionActivation(false, loginName);
	}

    /**
     * Get the forward state of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async getForward(loginName: string = null): Promise<Forward> {
		return await this._routingRest.getForward(loginName);
	}

    /**
     * Cancel the forward for the specified user.
     * <p>
     * This method does nothing and return 'true' if there is no forward
     * activated.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async cancelForward(loginName: string = null): Promise<boolean> {
		return await this._routingRest.cancelForward(loginName);
	}

    /**
     * Set a forward on voice mail with the specified condition, for the specified
     * user.
     * <p>
     * This method will fail and return 'false' if the user does not have a voice mail. 
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param condition the forward condition
     * @param loginName the user login name
     */
	public async forwardOnVoiceMail(condition: ForwardCondition, loginName: string = null): Promise<boolean> {
		return await this._routingRest.forwardOnVoiceMail(condition, loginName);
	}

    /**
     * Set a forward on the specified number, with the specified condition, for the
     * specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param number    the phone number on which the forward is activated
     * @param condition the forward condition
     * @param loginName the user login name
     */
	 public async forwardOnNumber(number: string, condition: ForwardCondition, loginName: string = null): Promise<boolean> {
		return await this._routingRest.forwardOnNumber(number, condition, loginName);
	}

    /**
     * Cancel the overflow for the specified user.
     * <p>
     * This method does nothing and return 'true' if there is no overflow activated.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async cancelOverflow(loginName: string = null): Promise<boolean> {
		return await this._routingRest.cancelOverflow(loginName);
	}

    /**
     * Get the overflow state for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async getOverflow(loginName: string = null): Promise<Overflow> {
		return await this._routingRest.getOverflow(loginName);
	}

    /**
     * Activate an overflow on voice mail with the specified condition, for the
     * specified user.
     * <p>
     * This method will fail and return 'false' if the user does not have a voice mail. 
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param condition the overflow condition
     * @param loginName the user login name
     */
	 public async overflowOnVoiceMail(condition: OverflowCondition, loginName: string = null): Promise<boolean> {
		return await this._routingRest.overflowOnVoiceMail(condition, loginName);
	}

    /**
     * Get the routing state of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
	 public async getRoutingState(loginName: string = null): Promise<RoutingState> {
		return await this._routingRest.getRoutingState(loginName);
	}

    /**
     * Asks a snapshot event on the specified user.
     * <p>
     * The event OnRoutingStateChanged will contain the DynamicState
     * (forward/overflow/dnd state). If a second request is asked since the previous
     * one is still in progress, it has no effect.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored.
     * 
     * @param loginName the login name
     */
	 public async requestSnapshot(loginName: string = null): Promise<boolean> {
		return await this._routingRest.requestSnapshot(loginName);
	}

}