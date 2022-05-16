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

import ServiceFactory from './service-factory'
import Logger from './util/logger.js'
import Exceptions from './o2g-exceptions'
import ServiceEndPoint from './service-end-point';
import { ServerInfo } from './types/common/o2gcommon-types';
import Session from './session';


/**
 * Class Application represents an O2G application.
 */
 export default class Application {
	private _applicationName: string;
	private _host: Host;
	private _apiVersion: string;
	private _serviceFactory: ServiceFactory;
	private _serverInfo: ServerInfo;
	private _session: Session;
	private _loginName: string;

    private static _logger = Logger.create("Application");

	constructor(applicationName: string, host: Host, apiVersion: string) {
		this._applicationName = applicationName;
		this._host = host;
        this._apiVersion = apiVersion;
	}

	async connect() {
		if ((this._host.privateAddress == null) && (this._host.publicAddress == null)) {
			Exceptions.throw(Exceptions.Errors.InvalidArgument, "privateAddress or publicAddress must not be null");
		}

		this._serviceFactory = new ServiceFactory(this._apiVersion);
		this._serverInfo = await this._serviceFactory.bootstrap(this._host);

		return new ServiceEndPoint(this._serviceFactory, this._serverInfo);
	}

	getRoutingService() {
		return this._session.getRoutingService();
	}

	getEventSummaryService() {
		return this._session.getEventSummaryService();
	}

	getTelephonyService() {
		return this._session.getTelephonyService();
	}

	getUsersService() {
		return this._session.getUsersService();
	}

	getDirectoryService() {
		return this._session.getDirectoryService();
	}

	getCommunicationLogService() {
		return this._session.getCommunicationLogService();
	}

	getAnalyticsService() {
		return this._session.getAnalyticsService();
	}

	getCallCenterAgentService() {
		return this._session.getCallCenterAgentService();
	}

	getMaintenanceService() {
		return this._session.getMaintenanceService();
	}

	getRsiService() {
		return this._session.getRsiService();
	}

	getPbxManagementService() {
		return this._session.getPbxManagementService();
	}

	getPhoneSetProgrammingService() {
		return this._session.getPhoneSetProgrammingService();
	}

	getMessagingService() {
		return this._session.getMessagingService();
	}

	async login(login: string, password: string) {

		let serviceEndPoint: ServiceEndPoint = await this.connect();

		this._session = await serviceEndPoint.openSession(login, password, this._applicationName);
		this._loginName = login;
	}

	async subscribe(subscription) {
		await this._session.listenEvents(subscription);
	}

	async close() {
		if (this._session) {
			await this._session.close();
		}
	}
}
