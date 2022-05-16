/*
* Copyright 2022 ALE International
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

import Logger from './util/logger.js'
import Exceptions from './o2g-exceptions'
import AssertUtil from './util/assert'
import Session from './session'
import ServiceFactory from './service-factory'
import { O2GAuthenticateResult, ServerInfo, SessionInfo } from './types/common/o2gcommon-types.js'


export default class ServiceEndPoint {

	private _serviceFactory: ServiceFactory;
	private _serverInfo: ServerInfo;

	private _logger = Logger.create("ServiceEndPoint");

	constructor(serviceFactory: ServiceFactory, serverInfo: ServerInfo) {
		this._serviceFactory = serviceFactory;
		this._serverInfo = serverInfo;
	}

	public async openSession(login: string, password: string, applicationName: string): Promise<Session> {
		AssertUtil.notNullOrEmpty(login, "login");
		AssertUtil.notNullOrEmpty(password, "password");
		AssertUtil.notNullOrEmpty(applicationName, "applicationName");

		this._logger.debug("OpenSession -> Authenticate user {login}", login);

		let authenticationService = this._serviceFactory.getAuthenticationService();
		let authenticationResult: O2GAuthenticateResult = await authenticationService.authenticate(login, password);

		this._logger.info("Authentication done.");

		this._serviceFactory.setSessionUris(authenticationResult.internalUrl, authenticationResult.publicUrl);

		this._logger.debug("OpenSession -> OpenSession {application}", applicationName);
		
		let sessionsService = this._serviceFactory.getSessionsService();
		let sessionInfo: SessionInfo = await sessionsService.open(applicationName);
		if (sessionInfo) {
			this._logger.debug("Session opened: TimeToLive = {timeToLive}", sessionInfo.timeToLive);
			this._serviceFactory.setServices(sessionInfo);	
			return new Session(this._serviceFactory, sessionInfo, login);	
		}
		else {
			await sessionsService.close();
			Exceptions.throw(Exceptions.Errors.OpenSessionFailed);
		}
	}
}
