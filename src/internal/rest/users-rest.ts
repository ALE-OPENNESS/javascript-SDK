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

import {RestService} from './rest-service'
import UtilUri from "../util/util-uri";
import HttpContent from '../util/http-content';
import { Preferences, SupportedLanguages, User } from '../../types/users/users-types';

type LoginsResponse = {
    loginNames: string[];
}

export default class UsersRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getByLoginName(loginName: string = null): Promise<User> {

        let uriGet = this._uri;
        if (loginName) {
            uriGet = UtilUri.appendPath(uriGet, loginName);
        }

        return this.getResult<User>(await RestService._httpClient.get(uriGet));
    }

    public async getLogins(nodeIds: number[], onlyACD: boolean): Promise<string[]> {

        let uriGet = this._uri.replace("/users", "/logins");
        if (nodeIds) {
            uriGet = UtilUri.appendQuery(uriGet, "nodeIds", nodeIds.join(';'));
        }

        if (onlyACD) {
            uriGet = UtilUri.appendQuery(uriGet, "onlyACD");
        }

        let logins: LoginsResponse = this.getResult<LoginsResponse>(await RestService._httpClient.get(uriGet));
        if (logins) {
            return logins.loginNames;
        }
        else {
            return null;
        }
    }

    public async getByCompanyPhone(companyPhone: string): Promise<User> {

        return this.getResult<User>(await RestService._httpClient.get(UtilUri.appendQuery(this._uri, "companyPhone", companyPhone)));
    }

    public async getPreferences(loginName: string): Promise<Preferences> {
        return this.getResult<Preferences>(await RestService._httpClient.get(UtilUri.appendPath(this._uri, loginName, "preferences")));
	}

    async getSupportedLanguages(loginName: string): Promise<SupportedLanguages> {
        return this.getResult<SupportedLanguages>(await RestService._httpClient.get(UtilUri.appendPath(this._uri, loginName, "preferences/supportedLanguages")));
	}

    async changePassword(loginName: string, oldPassword: string, newPassword: string): Promise<boolean> {

        let json = JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword
        });

        let httpResponse = await RestService._httpClient.put(UtilUri.appendPath(this._uri, loginName, "password"), new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }
}