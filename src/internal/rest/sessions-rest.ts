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
import HttpContent from '../util/http-content';
import UtilUri from "../util/util-uri";
import { SessionInfo } from '../types/common/o2gcommon-types';

export default class SessionsRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async open(applicationName: string): Promise<SessionInfo> {

        var params = { "applicationName" :  applicationName }
        var httpContent = new HttpContent(JSON.stringify(params));

        return this.getResult(await RestService._httpClient.post(this._uri, httpContent));
    }

    public async close(): Promise<boolean> {
        var httpResponse = await RestService._httpClient.delete(this._uri);
        return httpResponse.isSuccessStatusCode();
    }

    public async keepAlive(): Promise<boolean> {
        var httpResponse = await RestService._httpClient.post(UtilUri.appendPath(this._uri, "keepalive"));
        return httpResponse.isSuccessStatusCode();
    }
}