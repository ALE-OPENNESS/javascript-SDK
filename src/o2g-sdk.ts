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

import Logger from './internal/util/logger.js'
import Exceptions from './internal/o2g-exceptions'
import Application from './internal/o2g-application';
import {Subscription} from './subscription';
import {TimeRange} from './types/analytics/time-range';
import {IntrusionMode} from './types/cc-agent/intrusion-mode';
import {OperatorType} from './types/cc-agent/operator-type';
import {Page} from './types/comlog/page';
import {QueryFilter} from './types/comlog/query-filter';
import {Role} from './types/comlog/role';
import {Option} from './types/comlog/option';
import {FilterItem} from './types/directory/filter-item';
import {OperationFilter} from './types/directory/operation-filter';
import {Criteria} from './types/directory/criteria';
import {PbxAttribute} from './types/pbxmngt/pbx-attribute';
import {PbxAttributeMap} from './types/pbxmngt/pbx-attr-map';
import {AttributeFilter} from './types/pbxmngt/attribute-filter';
import {AttributeType} from './types/pbxmngt/attribute-type';
import {Filter} from './types/pbxmngt/filter';
import {PinControl} from './types/phoneset/pin-control';
import {Pin} from './types/phoneset/pin';
import {ProgrammableKey} from './types/phoneset/programmable-key';
import {SoftKey} from './types/phoneset/softkey';
import {Destination} from './types/routing/destination';
import {ForwardCondition} from './types/routing/forward';
import {OverflowCondition} from './types/routing/overflow';
import {Tones} from './types/rsi/tones';
import {AdditionalDigitCollectionCriteria} from './types/rsi/add-digit-coll-criteria';
import {CollectionCause} from './types/rsi/collection-cause';
import {RoutingCallerType} from './types/rsi/routing-caller-type';
import {RoutingReason} from './types/rsi/routing-reason';
import {AcrSkill} from './types/telephony/acr-skill';
import {RecordingAction} from './types/telephony/RecordingAction';
import {EventSummary} from './o2g-eventSummary.js';
import {CallType} from './types/analytics/call-type'
import {TelFacility} from './types/analytics/tel-facility'
import {OperatorMainState} from './types/cc-agent/operator-main-state'
import {Reason} from './types/comlog/reason'
import { Routing } from './o2g-routing.js';
import { Telephony } from './o2g-telephony.js';
import { Directory } from './o2g-directory.js';
import { CommunicationLog } from './o2g-comlog.js';
import { Analytics } from './o2g-analytics.js';
import { CallCenterAgent } from './o2g-cc-agent.js';
import { Maintenance } from './o2g-maint.js';
import { Rsi } from './o2g-rsi.js';
import { PbxManagement } from './o2g-pbx-mngt.js';
import { PhoneSetProgramming } from './o2g-phone-set-prog.js';
import { Messaging } from './o2g-messaging.js';
import { Users } from './o2g-users.js';


let _logger = Logger.create("O2G");
var _application: Application = null;

/**
 * Event raised when the SDK has been loaded.
 * <p> See {@link load}.
 * @event
 */
const O2G_ONLOADED = "O2G_ONLOADED";

/**
 * Event raised on a failed login.
 * <p> See {@link login}.
 * @event
 */
const O2G_ONLOGIN_FAILED = "O2G_ONLOGIN_FAILED";

/**
 * Event raised on a successful login.
 * <p> See {@link login}.
 * @event
 */
const O2G_ONLOGIN_SUCCEEDED = "O2G_ONLOGIN_SUCCEDED";

/**
 * Event send when the eventing channel has been established.
 * <p> See {@link subscribe}.
 * @event
 */
const O2G_ONCHANNEL_INFORMATION = "OnChannelInformation";

/**
 * The routing service
 */
var routing: Routing = null;

/**
 * The event summary service
 */
var eventSummary: EventSummary = null;

/**
 * The user service
 */
var users: Users = null;

/**
 * The telephony service
 */
var telephony: Telephony = null;

/**
 * The directory service
 */
var directory: Directory = null;

/**
 * The communication log service
 */
var comlog: CommunicationLog = null;

/**
 * The analytic service
 */
var analytics: Analytics = null;

/**
 * The call center agent service
 */
var callCenterAgent: CallCenterAgent = null; 

/**
 * The maintenance service
 */
var maintenance: Maintenance = null;

/**
 * The rsi service
 */
var rsi: Rsi = null;

/**
 * The pbx management service
 */
var pbxManagement: PbxManagement = null;

/**
 * The phone set programming service
 */
var phoneSetProgramming: PhoneSetProgramming = null; 

/**
 * The messaging service
 */
var messaging: Messaging = null;


/**
 * Initializes the application. Defines the application name, and the O2G end point to connect on.
 * <p> The initialization must be done after the sdk has been loaded. A good practice is to perform the initialization in the treatment of the {@link O2G_ONLOADED} event.
 * @example
 * ```typescript
 * var onLoaded = function onLoaded() {
 *   console.log('On SDK Loaded !');
 * 
 *   // Initialize the application
 *   o2g.initialize('myApplication', {
 *       privateAddress: 'address-of-my-o2g-server'
 *   });
 * }
 * 
 * ```
 * @throws an InvalidState error if the application as already been initialized.
 * @param appName    the application name
 * @param host       the O2G host end point
 * @param apiVersion the version of API, by default the current is taken
 */
function initialize(appName: string, host: Host, apiVersion: string = "1.0") {
    if (this._application != null) {
        Exceptions.throw(Exceptions.Errors.InvalidState, "Application has been already initialized.");
    }
    _application = new Application(appName, host, apiVersion);
}

/**
 * Subscribe to events from the O2G server. The requested events are specified using a Subscription object.
 * <p>
 * The subscription must be done when the login has been successfull. A good practice is to subscribe events in teh treatment of the {@link O2G_ONLOGIN_SUCCEEDED} event.
 * @example
 * ```typescript
 * 
 * var onLoginSucceeded = function onLoginSucceeded() {
 *     console.log("login succeeded");
 * 
 *     // Create a subscription
 *     let subscription = o2g.types.Subscription.Builder.addPbxManagementEvents().build();
 *
 *     // Listen to events
 *     document.addEventListener(
 *          o2g.O2G_ONCHANNEL_INFORMATION, onChannelInformation);
 *     document.addEventListener(
 *          o2g.pbxManagement.ON_PBX_OBJECT_INSTANCE_CREATED, onPbxInstanceCreated);
 *     document.addEventListener(
 *          o2g.pbxManagement.ON_PBX_OBJECT_INSTANCE_DELETED, onPbxInstanceDeleted);
 * 
 *     o2g.subscribe(subscription);
 * }
 * 
 * ```
 * @param subscription the subscription
 */
async function subscribe(subscription: Subscription): Promise<void> {
    await _application.subscribe(subscription);
}

/**
 * Connect the application to the O2G service, using the specified login and password to authenticate the user.
 * <p> The login must be done after the application has been initialized. 
 * @example
 * ```typescript
 * var onLoaded = function onLoaded() {
 *   console.log('On SDK Loaded !');
 * 
 *   // Initialize the application
 *   o2g.initialize('myApplication', {
 *       privateAddress: 'address-of-my-o2g-server'
 *   });
 * 
 *   // Logon
 *   o2g.login(login, password);
 * }
 * 
 * ```
 * 
 * <p> Raise a {@link O2G_ONLOGIN_SUCCEEDED} event when the session has been established.
 * <p> Raise a {@link O2G_ONLOGIN_FAILED} event in case of error.
 * 
 * @param loginName The user or administrator login name.
 * @param password The user or administrator password.
 */
async function login(loginName: string, password: string): Promise<void>  {
    try {
        await _application.login(loginName, password);

        // Create service
        routing = _application.getRoutingService();
        eventSummary = _application.getEventSummaryService();
        users = _application.getUsersService();
        telephony = _application.getTelephonyService();
        directory = _application.getDirectoryService();
        comlog = _application.getCommunicationLogService();
        analytics = _application.getAnalyticsService();
        callCenterAgent = _application.getCallCenterAgentService();
        maintenance = _application.getMaintenanceService();
        rsi = _application.getRsiService();
        pbxManagement = _application.getPbxManagementService();
        phoneSetProgramming = _application.getPhoneSetProgrammingService();
        messaging = _application.getMessagingService();

        document.dispatchEvent(new Event(O2G_ONLOGIN_SUCCEEDED));
    }
    catch (e) {
        _logger.error("Unable to login");
        document.dispatchEvent(new Event(O2G_ONLOGIN_FAILED));
    }
}

/**
 * Terminates the application. Dispose all used ressources.
 */
async function shutdown(): Promise<void>  {
    await _application.close();
}

/**
 * Load the SDK and raised an {@link O2G_ONLOADED} event.
 * <p>
 * @example
 * ```typescript
 * var onLoaded = function onLoaded() {
 *   console.log('On SDK Loaded !');
 * }
 * 
 * document.addEventListener(o2g.O2G_ONLOADED, onLoaded);
 * o2g.load();
 * ```
 */
async function load() {
    _logger.debug("Loading SDK");
    document.dispatchEvent(new Event(O2G_ONLOADED));
}

/**
 * @ignore
 */
var types = {
    Subscription,
    analytics: {
        TimeRange,
        CallType,
        TelFacility
    },
    ccAgent: {
        IntrusionMode,
        OperatorType,
        OperatorMainState
    },
    comlog: {
        Page,
        QueryFilter,
        Role,
        Option,
        Reason
    },
    directory: {
        Criteria,
        FilterItem,
        OperationFilter
    },
    pbxmngt: {
        PbxAttribute,
        PbxAttributeMap,
        AttributeType,
        AttributeFilter,
        Filter
    },
    phoneset: {
        PinControl,
        Pin,
        ProgrammableKey,
        SoftKey
    },
    routing: {
        Destination,
        ForwardCondition,
        OverflowCondition
    },
    rsi: {
        Tones,
        AdditionalDigitCollectionCriteria,
        CollectionCause,
        RoutingCallerType,
        RoutingReason
    },
    telephony: {
        AcrSkill,
        RecordingAction
    }
};


export var o2g = { 
    load, 
    shutdown, 
    login, 
    subscribe, 
    initialize, 

    O2G_ONCHANNEL_INFORMATION, 
    O2G_ONLOGIN_FAILED, 
    O2G_ONLOGIN_SUCCEEDED, 
    O2G_ONLOADED,

    routing,
    eventSummary,
    users,
    telephony,
    directory,
    comlog,
    analytics,
    callCenterAgent, 
    maintenance,
    rsi,
    pbxManagement,
    phoneSetProgramming, 
    messaging,

    types
}