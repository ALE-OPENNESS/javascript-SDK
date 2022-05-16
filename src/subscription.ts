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

import { EventPackage } from "./internal/events/event-packages";

class Selector {
    private names: string[];
    private ids: string[];

    constructor(ids: string[], names: string[]) {

        if (ids != null) {
            this.ids = ids;
        }
        this.names = names;
    }
}


class EventFilter {
    private selectors: Selector[];

    constructor() {
        this.selectors = [];
    }

    add(ids: string[], name: string[]) {
        this.selectors.push(new Selector(ids, name));
    }

    addPackage(ids: string[], eventPackage: EventPackage) {
        this.add(ids, [eventPackage]);
    }
}

/**
 * A builder of {@link Subscription}.
 *
 * <p>
 * An instance of Builder can be gotten with {@link Subscription.Builder}.
 * <p>
 * The builder can be used to configure an event subscription for the O2G
 * server. Each methods modifies the state of the builder and returns the same
 * instance. The {@link build} method returns a new Subscription each time it is invoked.
 * @example
 * ```typescript
 *    let subscription = Subscription.Builder
 *                         .addRoutingEvents()
 *                         .addTelephonyEvents()
 *                         .addEventSummaryEvents()
 *                         .setTimeout(10)
 *                         .build();
 * 
 * ```
 */
export interface Builder {

    /**
     * Adds routing events to the subscription.
     * <p>The following event associated to the {@link Routing} service is added to the subscription:
     * <ul>
     * <li>{@link Routing.ON_ROUTING_STATE_CHANGED}</li>
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the routing events requires having a <b>TELEPHONY_ADVANCED</b> license.
     * @param ids the ids to filter events on.
     */
    addRoutingEvents:(ids: string[]) => Builder;

    /**
     * Adds telephony events to the subscription.
     * <p>The following event associated to the {@link Telephony} service is added to the subscription:
     * <ul>
	 * <li>{@link Telephony.ON_TELEPHONY_STATE}</li>
	 * <li>{@link Telephony.ON_CALL_CREATED}</li>
	 * <li>{@link Telephony.ON_CALL_MODIFIED}</li>
	 * <li>{@link Telephony.ON_CALL_REMOVED}</li>
	 * <li>{@link Telephony.ON_USER_STATE_MODIFIED}</li>
	 * <li>{@link Telephony.ON_DEVICE_STATE_MODIFIED}</li>     
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the telephony events requires having a <b>TELEPHONY_ADVANCED</b> license.
     * @param ids the ids to filter events on.
     */
    addTelephonyEvents:(ids: string[]) => Builder;

    /**
     * Adds user management events to the subscription.
     * <p>The following event associated to the {@link Users} service is added to the subscription:
     * <ul>
     * <li>{@link Users.ON_USER_CREATED}</li>
     * <li>{@link Users.ON_USER_DELETED}</li>
     * </ul>
     * <p>The session must has been opened by an administrator.
     * <p>Subscribing to the user management events does not require any license.
     */
     addUsersManagementEvents:() => Builder;

    /**
     * Adds event summary events to the subscription.
     * <p>The following event associated to the {@link EventSummary} service is added to the subscription:
     * <ul>
	 * <li>{@link EventSummary.ON_EVENT_SUMMARY_UPDATED}</li>
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the event summary events requires having a <b>TELEPHONY_ADVANCED</b> license.
     * @param ids the ids to filter events on.
     */
    addEventSummaryEvents:(ids: string[]) => Builder;


    /**
     * Adds rsi events to the subscription.
     * <p>The following event associated to the {@link Rsi} service is added to the subscription:
     * <ul>
     * <li>{@link Rsi.ON_DIGIT_COLLECTED}</li>
     * <li>{@link Rsi.ON_TONE_GENERATED_START}</li>
     * <li>{@link Rsi.ON_TONE_GENERATED_STOP}</li>
     * <li>{@link Rsi.ON_ROUTE_END}</li>
     * <li>{@link Rsi.ON_ROUTE_REQUEST}</li>     
     * </ul>
     * <p>The session must has been opened by an administrator.
     * <p>Subscribing to the rsi events requires having a <b>CONTACTCENTER_RSI</b> license.
     */
    addRsiEvents:() => Builder;


    /**
     * Adds pbx management events to the subscription.
     * <p>The following event associated to the {@link PbxManagement} service is added to the subscription:
     * <ul>
	 * <li>{@link PbxManagement.ON_PBX_OBJECT_INSTANCE_CREATED}</li>
	 * <li>{@link PbxManagement.ON_PBX_OBJECT_INSTANCE_DELETED}</li>
	 * <li>{@link PbxManagement.ON_PBX_OBJECT_INSTANCE_MODIFIED}</li>
     * </ul>
     * <p>The session must has been opened by an administrator.
     * <p>Subscribing to the pbx management events requires having a <b>MANAGEMENT</b> license.
     */
    addPbxManagementEvents:() => Builder;

    /**
     * Adds communication log events to the subscription.
     * <p>The following event associated to the {@link CommunicationLog} service is added to the subscription:
     * <ul>
	 * <li>{@link CommunicationLog.ON_COM_RECORD_CREATED}</li>
	 * <li>{@link CommunicationLog.ON_COM_RECORD_MODIFIED}</li>
	 * <li>{@link CommunicationLog.ON_COM_RECORDS_DELETED}</li>
	 * <li>{@link CommunicationLog.ON_COM_RECORDS_ACK}</li>
	 * <li>{@link CommunicationLog.ON_COM_RECORDS_UNACK}</li>
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the communication log events requires having a <b>TELEPHONY_ADVANCED</b> license.
     * @param ids the ids to filter events on.
     */
    addCommunicationLogEvents:(ids: string[]) => Builder;

    /**
     * Adds call center agent events to the subscription.
     * <p>The following event associated to the {@link CallCenterAgent} service is added to the subscription:
     * <ul>
	 * <li>{@link CallCenterAgent.ON_AGENT_STATE_CHANGED}</li>
	 * <li>{@link CallCenterAgent.ON_SUPERVISOR_HELP_REQUESTED}</li>
	 * <li>{@link CallCenterAgent.ON_SUPERVISOR_HELP_CANCELLED}</li>
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the call center agent events requires having a <b>CONTACTCENTER_AGENT</b> license.
     * @param ids the ids to filter events on.
     */
    addCallCenterAgentEvents:(ids: string[]) => Builder;

    
    /**
     * Adds maintenance events to the subscription.
     * <p>The following event associated to the {@link Maintenance} service is added to the subscription:
     * <ul>
	 * <li>{@link Maintenance.ON_CTI_LINK_DOWN}</li>
	 * <li>{@link Maintenance.ON_CTI_LINK_UP}</li>
	 * <li>{@link Maintenance.ON_PBX_LOADED}</li>
     * </ul>
     * <p>The session must has been opened by an administrator.
     * <p>Subscribing to the maintenance events does not require any license.
     */
     addMaintenanceEvents:() => Builder;

    /**
     * Adds user events to the subscription.
     * <p>The following event associated to the {@link Users} service is added to the subscription:
     * <ul>
	 * <li>{@link Users.ON_USER_INFO_CHANGED}</li>
     * </ul>
     * <p>If the session has been opened for a user, the 'ids' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>Subscribing to the user events does not require any license.
     * @param ids the ids to filter events on.
     */
     addUserEvents:(ids: string[]) => Builder;

    /**
     * Set lifetime of the event channel.
     * @param value The lifetime of the event channel in minutes
     */
    setTimeout:(value: number) => Builder;

    /**
     * Set the required event version. By default, the version "1.0" is used.
     * @param value The event version
     */
    setVersion:(value: string) => Builder;

    /**
     * Build the subscription.
     */
    build:() => Subscription;
}


/**
 * Subscription represents a subscription request used to subscribe events from the O2G Server. 
 * An application receives event on a http chunk connection established with the O2G server.
 * <p>
 * The application builds a subscription using the {@link Builder} object. This object provides a builder pattern that eases
 * the creation of a subscription.
 * @example
 * To create a subscription, uses the methods provided by the Builder object.
 * ```typescript
 *    let subscription = Subscription.Builder
 *                         .addRoutingEvents()
 *                         .addTelephonyEvents()
 *                         .addEventSummaryEvents()
 *                         .setTimeout(10)
 *                         .build();
 * 
 * ```
 * @see {@link subscribe}
 *
 */
 export abstract class Subscription {
    
    private timeout: number;
    private filter: EventFilter;
    private version: string;

    /**
     * @internal
     */
    protected constructor(version: string, timeout: number, filter: EventFilter) {
        this.timeout = timeout;
        this.version = version;
        this.filter = filter;
    }

    /**
     * The subscription builder to use to build a new Subscription.
     * @example
     * To create a subscription, uses the methods provided by the Builder object.
     */
    public static Builder: Builder = new class implements Builder {
        _version: string;
        _timeout: number;
        _filter: EventFilter;
        
        constructor() {
            this._version = "1.0";
            this._timeout = 0;
            this._filter = new EventFilter();
        }
    
        addRoutingEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.Routing);
            return this;
        }
    
        addTelephonyEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.Telephony);
            return this;
        }

        addEventSummaryEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.EventSummary);
            return this;
        }
    
        addUsersManagementEvents() {
            this._filter.addPackage([], EventPackage.Users);
            return this;
        }
    
        addMaintenanceEvents() {
            this._filter.addPackage([], EventPackage.System);
            return this;
        }

        addRsiEvents() {
            this._filter.addPackage([], EventPackage.Rsi);
            return this;
        }

        addPbxManagementEvents() {
            this._filter.addPackage([], EventPackage.PbxManagement);
            return this;
        }
    
        addCommunicationLogEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.CommunicationLog);
            return this;
        }
    
        addCallCenterAgentEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.Agent);
            return this;
        }
    
        addUserEvents(ids: string[]) {
            this._filter.addPackage(ids, EventPackage.User);
            return this;
        }
    
        setTimeout(value: number) {
            this._timeout = value;
            return this;
        }
    
        setVersion(value: string) {
            this._version = value;
            return this;
        }
    
        build() {
            return new SubscriptionImpl(this._version, this._timeout, this._filter);
        }    
    };
}

class SubscriptionImpl extends Subscription {
    
    /**
     * @internal
     */
    public constructor(version: string, timeout: number, filter: EventFilter) {
        super(version, timeout, filter);
    }    
} 