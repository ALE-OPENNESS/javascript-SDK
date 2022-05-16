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

import EventSumaryRest from "./internal/rest/eventSummary-rest";
import { EventSummaryCounters } from "./types/eventsummary/event-summary-counter"

/**
 * The Event summary service allows a user to get its new message
 * indicators (missed call, voice mails, callback request, fax).
 * <p>Using this service requires having a <b>TELEPHONY_ADVANCED</b> license,
 */
 export class EventSummary {

	private _eventSummaryRest: EventSumaryRest;

	/**
	 * Event raised each time the user's counters have changed.
	 * @event
	 */
	readonly ON_EVENT_SUMMARY_UPDATED = "OnEventSummaryUpdated";

	/**
	 * 
	 * @internal 
	 */
    constructor(eventSummaryRest: EventSumaryRest) {
		this._eventSummaryRest = eventSummaryRest;
	}

	/**
	 * Retrieves main counters for the specified user.
	 * <p>
	 * If the session has been opened for a user, the loginName parameter is
	 * ignored, but it is mandatory if the session has been opened by an
	 * administrator.
	 * 
	 * @param loginName the user login name
	 * @return the {@link EventSummaryCounters}
	 */
	public async get(loginName: string = null): Promise<EventSummaryCounters> {
		return await this._eventSummaryRest.get(loginName);
	}
}