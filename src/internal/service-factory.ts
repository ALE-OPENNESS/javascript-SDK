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

import O2GRest from "./rest/o2g-rest";
import AuthenticationRest from "./rest/authentication-rest";
import SessionsRest from "./rest/sessions-rest";
import RoutingRest from "./rest/routing-rest";
import EventSummaryRest from "./rest/eventSummary-rest";
import CallCenterAgentRest from "./rest/ccAgent-rest";
import UsersRest from "./rest/users-rest";
import TelephonyRest from "./rest/telephony-rest";
import DirectoryRest from "./rest/directory-rest";
import SubscriptionsRest from "./rest/subscriptions-rest";
import CommunicationLogRest from "./rest/comlog-rest";
import AnalyticsRest from "./rest/analytics-rest";
import MaintenanceRest from "./rest/maint-rest";
import RsiRest from "./rest/rsi-rest";
import PbxManagementRest from "./rest/pbx-mngt-rest";
import Exceptions from "./o2g-exceptions";
import Logger from "./util/logger";
import UtilUri from "./util/util-uri";
import { AccessMode } from "./access-mode";
import PhoneSetProgrammingRest from "./rest/phone-set-prog-rest";
import MessagingRest from "./rest/messaging-rest";
import { RestService } from "./rest/rest-service";
import { RoxeRestApiDescriptor, ServerInfo, SessionInfo, Version } from "./types/common/o2gcommon-types";

class O2GService {
    private _value: string;

    static _map: Map<string, O2GService> = new Map<string, O2GService>();

    static registerService(service: O2GService): O2GService {
        this._map.set(service._value, service);
        return service;
    }

    constructor(name: string) {
        this._value = name;
    }

    static get(name: string): O2GService {

        var lower = name.toLowerCase();

        if (this._map.has(lower)) {
            return this._map.get(lower);
        }
        else {
            return new O2GService(lower);
        }
    }

    static O2G = O2GService.registerService(new O2GService("O2G"));
    static Authentication = O2GService.registerService(new O2GService("authenticate"));
    static Sessions = O2GService.registerService(new O2GService("sessions"));
    static Subscriptions = O2GService.registerService(new O2GService("subscriptions")); 
    static EventSummary = O2GService.registerService(new O2GService("eventsummary")); 
    static Telephony = O2GService.registerService(new O2GService("telephony")); 
    static Users = O2GService.registerService(new O2GService("users")); 
    static Routing = O2GService.registerService(new O2GService("routing")); 
    static Messaging = O2GService.registerService(new O2GService("voicemail"));
    static Maintenance = O2GService.registerService(new O2GService("maintenance"));
    static Directory = O2GService.registerService(new O2GService("directory")); 
    static PbxManagement = O2GService.registerService(new O2GService("pbxmanagement")); 
    static CommunicationLog = O2GService.registerService(new O2GService("comlog")); 
    static PhoneSetProgramming = O2GService.registerService(new O2GService("phonesetprogramming"));
    static CallCenterAgent = O2GService.registerService(new O2GService("acdagent"));
    static CallCenterRsi = O2GService.registerService(new O2GService("acdrsi"));
    static Analytics = O2GService.registerService(new O2GService("analytics"));
}



export default class {

    private _apiVersion: string;
    
    private _logger = Logger.create("ServiceFactory");
    private _services: Map<O2GService, any> = new Map<O2GService, any>();
    private _servicesUri: Map<O2GService, string> = new Map<O2GService, string>();
	_accessMode: AccessMode = AccessMode.Private;
    ApiVersion: string = null;


    constructor(version: string) {
        this._apiVersion = version;
	}

    private throwUnableToConnect(host: Host) {
        if ((host.privateAddress != null) && (host.publicAddress != null)) {
            Exceptions.throw(Exceptions.Errors.BootstrapError, "[" + host.privateAddress + ", " + host.publicAddress + "]");
        }
        else if (host.privateAddress != null) {
            Exceptions.throw(Exceptions.Errors.BootstrapError, "[" + host.privateAddress + "]");
        }
        else {
            Exceptions.throw(Exceptions.Errors.BootstrapError, "[" + host.publicAddress + "]");
        }
    }

    setO2GServiceUri(address: string) {
		
		if (this._servicesUri.has(O2GService.O2G)) {
			this._servicesUri.delete(O2GService.O2G);
			this._services.delete(O2GService.O2G);
		}
		this._servicesUri.set(O2GService.O2G, "https://" + address + "/api/rest");
	}


    getOrCreate(serviceName: O2GService, restService: typeof RestService) {
        if (this._servicesUri.has(serviceName)) {
			let service = this._services.get(serviceName);
			if (service == null) {
				service = new restService(this._servicesUri.get(serviceName));
				this._services.set(serviceName, service);
			}
			
			return service;
		}
    }

    getSubscriptionService() {
        return this.getOrCreate(O2GService.Subscriptions, SubscriptionsRest);
    }

    getO2GService() {
        return this.getOrCreate(O2GService.O2G, O2GRest);
    }

    getAuthenticationService() {
        return this.getOrCreate(O2GService.Authentication, AuthenticationRest);
    }

    getSessionsService() {
        return this.getOrCreate(O2GService.Sessions, SessionsRest);
    }

    getEventSummaryService() {
        return this.getOrCreate(O2GService.EventSummary, EventSummaryRest);
    }

    getRoutingService() {
        return this.getOrCreate(O2GService.Routing, RoutingRest);
    }

    getUsersService() {
        return this.getOrCreate(O2GService.Users, UsersRest);
    }

    getTelephonyService() {
        return this.getOrCreate(O2GService.Telephony, TelephonyRest);
    }

    getDirectoryService() {
        return this.getOrCreate(O2GService.Directory, DirectoryRest);
    }

    getCommunicationLogService() {
        return this.getOrCreate(O2GService.CommunicationLog, CommunicationLogRest);
    }

    getAnalyticsService() {
        return this.getOrCreate(O2GService.Analytics, AnalyticsRest);
    }

    getCallCenterAgentService() {
        return this.getOrCreate(O2GService.CallCenterAgent, CallCenterAgentRest);
    }

    getMaintenanceService() {
        return this.getOrCreate(O2GService.Maintenance, MaintenanceRest);
    }

    getRsiService() {
        return this.getOrCreate(O2GService.CallCenterRsi, RsiRest);
    }

    getPbxManagementService() {
        return this.getOrCreate(O2GService.PbxManagement, PbxManagementRest);
    }

    getPhoneSetProgrammingService() {
        return this.getOrCreate(O2GService.PhoneSetProgramming, PhoneSetProgrammingRest);
    }

    getMessagingService() {
        return this.getOrCreate(O2GService.Messaging, MessagingRest);
    }

    // Bootstrap on the specified address
    // Try to get the O2G info
    bootstrapAddress(address: string) {

        // Init the O2G service address
        this.setO2GServiceUri(address);

        // Try to get the information
        return new Promise((resolve, reject) => {

            this.getO2GService().get()
            .then((apiDescriptor) => resolve(apiDescriptor))
            .catch(() => {
                this._logger.error("Unable to bootstrap on {addr}", address);
                reject();
            });
        });
    }

    getVersion(descriptor: RoxeRestApiDescriptor): Version {

        if (this._apiVersion) {
            let version = descriptor.versions.find(version => version.id === this._apiVersion);
            if (version) {
                return version;
            }

            Exceptions.throw(Exceptions.Errors.NotSupportedAPI, "[" + this._apiVersion + "] is not supported.");
        }
        else {
            let version: Version = descriptor.versions.find(version => version.status == "CURRENT");
            if (version) {
                this._apiVersion = version.id;
                return version;
            }
            else {
                Exceptions.throw(Exceptions.Errors.InvalidObject, "Unable to retrieve current API version");
            }
        }
    }

    async bootstrap(host: Host): Promise<ServerInfo> {

        let apiDescriptor: RoxeRestApiDescriptor = null;

        if (host.privateAddress) {
        
            try {
                this.setO2GServiceUri(host.privateAddress);

                apiDescriptor = await this.getO2GService().get();
                this._accessMode = AccessMode.Private;
            }
            catch (e) {
                this._logger.debug("Unable to bootstrap on {0}", host.privateAddress);
                
                if (host.publicAddress == null) {
                    this.throwUnableToConnect(host);
                }
            }
        }

        if (apiDescriptor == null) {
            try {
                this.setO2GServiceUri(host.publicAddress);

                apiDescriptor = await this.getO2GService().get();
                this._accessMode = AccessMode.Public;
            }
            catch (e) {
                this._logger.debug("Unable to bootstrap on {0}", host.publicAddress);
                this.throwUnableToConnect(host);
            }
        }

        var version: Version = this.getVersion(apiDescriptor);

        if (this._accessMode == AccessMode.Private) {
            this._servicesUri.set(O2GService.Authentication, UtilUri.ensureHttps(version.internalUrl));
        }
        else {
            this._servicesUri.set(O2GService.Authentication, UtilUri.ensureHttps(version.publicUrl));
        }

        return apiDescriptor.serverInfo;
    }


    setSessionUris(privateUri: string, publicUri: string) {

        if (this._accessMode === AccessMode.Private) {
            this._servicesUri.set(O2GService.Sessions, UtilUri.ensureHttps(privateUri));
        }
        else {
            this._servicesUri.set(O2GService.Sessions, UtilUri.ensureHttps(publicUri));
        }
    }

    setServices(sessionInfo: SessionInfo) {
        
        let baseUrl: string;

        // get the right URL
        if (this._accessMode == AccessMode.Private) {
            baseUrl = sessionInfo.privateBaseUrl;
        }
        else {
            baseUrl = sessionInfo.publicBaseUrl;
        }

        sessionInfo.services.forEach(service => {

            var serviceName = O2GService.get(service.serviceName);
            if (service.relativeUrl.startsWith("/telephony")) {
                // Only one telephony service
                serviceName = O2GService.Telephony;
            }

            if (!this._servicesUri.has(serviceName)) {
                if (service.relativeUrl.startsWith("/telephony")) {
                    this._logger.debug("Register service: Telephony");

                    this._servicesUri.set(serviceName, baseUrl + "/telephony");
                }
                else {
                    this._logger.debug("Register service: {service}", service.serviceName);
                    this._servicesUri.set(serviceName, baseUrl + service.relativeUrl);
                }
            }
        });
    }
}
