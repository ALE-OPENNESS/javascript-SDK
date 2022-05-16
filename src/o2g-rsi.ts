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

import RsiRest from "./internal/rest/rsi-rest";
import {AdditionalDigitCollectionCriteria} from "./types/rsi/add-digit-coll-criteria";
import { RouteSession, RsiPoint } from "./types/rsi/rsi-types";
import { Tones } from "./types/rsi/tones";

/**
 * RsiService provides access to th RSI (Routing Service Intelligence)
 * points features:
 * <ul>
 * <li>Makes route selection.</li>
 * <li>Makes digits collection.</li>
 * <li>Plays voice guides or tones.</li>
 * <li>Plays announcements (prompts and/or digits).</li>
 * </ul>
 * <p>
 * To be able to receive the RouteRequest from the OmniPCX Enterprise, the first
 * action is subscribe to rsi events and the second action is to enable the RSI
 * point.
 * <p>
 * Using this service requires having a <b>CONTACTCENTER_RSI</b> license.
 */
 export class Rsi {

    private _rsiRest: RsiRest;

    /**
     * Occurs when a data collection has ended.
     * @event
     */
    readonly ON_DIGIT_COLLECTED = "OnDigitCollected";

    /**
     * Raised from a RSI point when a tone generation is started.
     * @event
     */
    readonly ON_TONE_GENERATED_START = "OnToneGeneratedStart";

    /**
     * Raised from a RSI point when a tone generation is stopped.
     * @event
     */
    readonly ON_TONE_GENERATED_STOP = "OnToneGeneratedStop";

    /**
     * Raised from a Routing point to close a route session (routing crid is no longer valid).
     * @event
     */
    readonly ON_ROUTE_END = "OnRouteEnd";

    /**
     * Raised from a Routing point to request a route.
     * @event
     */
    readonly ON_ROUTE_REQUEST = "OnRouteRequest";

    /**
     * @internal
     */
    constructor(rsiRest: RsiRest) {
        this._rsiRest = rsiRest;
	}

    /**
     * Gets the configured Rsi points.
     */
    public async getRsiPoints(): Promise<RsiPoint[]> {
        return this._rsiRest.getRsiPoints();
    }

    /**
     * Enables the specified rsi point.
     * 
     * @param rsiNumber the rsi point extension number
     */
    public async enableRsiPoint(rsiNumber: string): Promise<boolean> {
        return this._rsiRest.enableRsiPoint(rsiNumber);
    }

    /**
     * Disables the specified rsi point.
     * 
     * @param rsiNumber the rsi point extension number.
     */
    public async disableRsiPoint(rsiNumber: string): Promise<boolean> {
        return this._rsiRest.disableRsiPoint(rsiNumber);
    }

    /**
     * Starts a digits collection for the specified rsi, on the specified call.
     * 
     * @param rsiNumber          the rsi point extension number
     * @param callRef            the call reference
     * @param numChars           the optionnal number of digits to collect. The
     *                           digit collection is stopped when this number is
     *                           reached
     * @param flushChar          the optional character used to stop the digit
     *                           collection when pressed.
     * @param timeout            optional timeout in second. Stop the digit
     *                           collection after this time elapses.
     * @param additionalCriteria extension criteria used to collect digits
     * @see {@link ON_DIGIT_COLLECTED} event
     * @see {@link stopCollectDigits}
     */
     public async startCollectDigits(rsiNumber: string, callRef: string, numChars: number, flushChar: string = null, timeout: number = null, additionalCriteria: AdditionalDigitCollectionCriteria = null): Promise<boolean> {
        return this._rsiRest.startCollectDigits(rsiNumber, callRef, numChars, flushChar, timeout, additionalCriteria);
    }

    /**
     * Stops the specified digits collection.
     * 
     * @param rsiNumber the rsi point extension number
     * @param callCrid  the digit collection identifier
     * @see {@link startCollectDigits}.
     */
     public async stopCollectDigits(rsiNumber: string, collCrid: string): Promise<boolean> {
        return this._rsiRest.stopCollectDigits(rsiNumber, collCrid);
    }

    /**
     * Plays the specified tone on the specified call.
     * 
     * @param rsiNumber the rsi point extension number
     * @param callRef   the call reference
     * @param tone      the tone to play
     * @param duration  the duration the tone is played (in second)
     * @see {@link ON_TONE_GENERATED_START} event.
     * @see {@link cancelTone}.
     */
     public async playTone(rsiNumber: string, callRef: string, tone: Tones, duration: number): Promise<boolean> {
        return this._rsiRest.playTone(rsiNumber, callRef, tone, duration);
    }

    /**
     * Cancels playing a tone on the specified call.
     * 
     * @param rsiNumber the rsi point extension number
     * @param callRef   the call reference
     * @see {@link ON_TONE_GENERATED_STOP} event.
     * @see {@link playTone}
     */
     public async cancelTone(rsiNumber: string, callRef: string): Promise<boolean> {
        return this._rsiRest.cancelTone(rsiNumber, callRef);
    }

    /**
     * Plays the specified voice guide on the specified call.
     * 
     * @param rsiNumber   the rsi point extension number
     * @param callRef     the call reference
     * @param guideNumber the voice guide number as defined in the OmniPcx
     *                    Enterprise
     * @param duration    an optional duration for the voice guide in second.
     * @see {@link ON_TONE_GENERATED_START}
     */
     public async playVoiceGuide(rsiNumber: string, callRef: string, guideNumber: number, duration: number = null): Promise<boolean> {
        return this._rsiRest.playVoiceGuide(rsiNumber, callRef, guideNumber, duration);
    }

    /**
     * Ends a route session.
     * 
     * @param rsiNumber the rsi point extension number
     * @param routeCrid the routing session unique identifier
     * @see {@link ON_ROUTE_REQUEST} event.
     */
     public async routeEnd(rsiNumber: string, routeCrid: string): Promise<boolean> {
        return this._rsiRest.routeEnd(rsiNumber, routeCrid);
    }

    /**
     * Selects a route for the specified route session. 
     * @param rsiNumber        the rsi point extension number
     * @param routeCrid        the routing session unique identifier
     * @param selectedRoute    the selected route number
     * @param callingLine      an optional calling line value that will be presented
     *                         to the selected route
     * @param associatedData   the optional associated data to attach to the call
     * @param routeToVoiceMail 'true' if the selected route is the voice mail; 'false' otherwise
     * @see {@link ON_ROUTE_REQUEST} event.
     */
     public async routeSelect(rsiNumber: string, routeCrid: string, selectedRoute: string, callingLine: string = null, associatedData: string = null, routeToVoiceMail: boolean = null): Promise<boolean> {
        return this._rsiRest.routeSelect(rsiNumber, routeCrid, selectedRoute, callingLine, associatedData, routeToVoiceMail);
    }

    /**
     * Gets the list of existing route sessions for the specified rsi point.
     * 
     * @param rsiNumber the rsi point extension number
     */
    public async getRouteSessions(rsiNumber: string): Promise<RouteSession[]> {
        return this._rsiRest.getRouteSessions(rsiNumber);
    }

    /**
     * Return the specified route session.
     * 
     * @param rsiNumber the rsi point extension number
     * @param routeCrid the routing session unique identifier
     */
     public async getRouteSession(rsiNumber: string, routeCrid: string): Promise<RouteSession> {
        return this._rsiRest.getRouteSession(rsiNumber, routeCrid);
    }
        
}