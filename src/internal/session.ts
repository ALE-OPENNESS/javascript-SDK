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
import Logger from "./util/logger.js";
import {Routing} from '../o2g-routing'
import { EventSummary } from "../o2g-eventSummary";
import {Directory} from "../o2g-directory";
import {Users} from "../o2g-users";
import {Telephony} from "../o2g-telephony";
import Exceptions from "./o2g-exceptions";
import {Analytics} from "../o2g-analytics";
import {Maintenance} from "../o2g-maint";
import { AccessMode } from "./access-mode";
import ChunkEventing from "./events/chunk-eventing";
import {CommunicationLog} from "../o2g-comlog";
import {CallCenterAgent} from "../o2g-cc-agent";
import {Rsi} from "../o2g-rsi";
import {PbxManagement} from "../o2g-pbx-mngt";
import {PhoneSetProgramming} from "../o2g-phone-set-prog";
import {Messaging} from "../o2g-messaging";
import ServiceFactory from "./service-factory";
import {Subscription} from "../subscription";
import { SessionInfo, SubscriptionResult } from "./types/common/o2gcommon-types.js";

export default class Session {
    private _serviceFactory: ServiceFactory;
    private _sessionInfo: SessionInfo;
    private _loginName: string;
    private _keepAliveID: ReturnType<typeof setTimeout>;
    private _subscriptionId: string;
    private _chunkEventing: ChunkEventing;

	private _logger = Logger.create("Session");

    constructor(serviceFactory: ServiceFactory, sessionInfo: SessionInfo, login: string) {
        this._serviceFactory = serviceFactory;
        this._sessionInfo = sessionInfo;
        this._loginName = login;

        this.startKeepAlive();
    }

    public getRoutingService(): Routing {
        return new Routing(this._serviceFactory.getRoutingService());
    }

    public getEventSummaryService(): EventSummary {
        return new EventSummary(this._serviceFactory.getEventSummaryService());
    }

    public getUsersService(): Users {
        return new Users(this._serviceFactory.getUsersService());
    }

    public getTelephonyService(): Telephony {
        return new Telephony(this._serviceFactory.getTelephonyService());
    }

    public getDirectoryService(): Directory {
        return new Directory(this._serviceFactory.getDirectoryService());
    }

    public getCommunicationLogService(): CommunicationLog {
        return new CommunicationLog(this._serviceFactory.getCommunicationLogService());
    }

    public getAnalyticsService(): Analytics {
        return new Analytics(this._serviceFactory.getAnalyticsService());
    }

    public getCallCenterAgentService(): CallCenterAgent {
        return new CallCenterAgent(this._serviceFactory.getCallCenterAgentService());
    }

    public getMaintenanceService(): Maintenance {
        return new Maintenance(this._serviceFactory.getMaintenanceService());
    }

    public getRsiService(): Rsi {
        return new Rsi(this._serviceFactory.getRsiService());
    }

    public getPbxManagementService(): PbxManagement {
        return new PbxManagement(this._serviceFactory.getPbxManagementService());
    }

    public getPhoneSetProgrammingService(): PhoneSetProgramming {
        return new PhoneSetProgramming(this._serviceFactory.getPhoneSetProgrammingService());
    }

    public getMessagingService(): Messaging {
		return new Messaging(this._serviceFactory.getMessagingService());
	}


    private startKeepAlive() {
        this._keepAliveID = setTimeout(() => {

            this._logger.debug("Send Keep Alive");
            var sessionService = this._serviceFactory.getSessionsService();
            sessionService.keepAlive();

        }, this._sessionInfo.timeToLive);
    }

    public async close() {
        if (this._keepAliveID) {
            clearTimeout(this._keepAliveID);
        }

        let sessionService = this._serviceFactory.getSessionsService();
        await sessionService.close();
        
        this._logger.info("Session is closed.");
    }

    public async listenEvents(subscription: Subscription) {
        if (subscription != null) {
            await this._startEventing(subscription);
        }
    }


	private async _startEventing(subscription: Subscription) {

		let subscriptionsService = this._serviceFactory.getSubscriptionService();
		let subscriptionResult: SubscriptionResult = await subscriptionsService.create(subscription);

		if ((subscriptionResult != null) && (subscriptionResult.status == "ACCEPTED")) {
			this._subscriptionId = subscriptionResult.subscriptionId;

			this._logger.debug("Subscription has been accepted.");

			if (this._serviceFactory._accessMode == AccessMode.Private) {
				
				this._chunkEventing = new ChunkEventing(subscriptionResult.privatePollingUrl);
			}
			else {
				this._chunkEventing = new ChunkEventing(subscriptionResult.publicPollingUrl);
			}

		    this._chunkEventing.start();

			this._logger.info("Eventing is started.");
		}
		else {
			this._logger.error("Subscription has been refused. Fix the subscription request.");
			if (subscriptionResult == null) {
				Exceptions.throw(Exceptions.Errors.SubscriptionRefused);
			}
			else {
				Exceptions.throw(Exceptions.Errors.SubscriptionRefused, subscriptionResult.status);
			}
		}
    }
}