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
import {Forward} from '../../types/routing/forward';
import {Overflow} from '../../types/routing/overflow';
import {ForwardRoute} from '../types/routing/forward-route';
import OverflowRoute from '../types/routing/overflow-route';
import HttpContent from '../util/http-content';
import {RoutingState} from '../../types/routing/routing-state';
import { ForwardCondition } from '../../types/routing/forward';
import { OverflowCondition } from '../../types/routing/overflow';
import { DndState } from '../../types/routing/routing-types';
import { RoutingCapabilities } from '../../types/routing/routing-capability';
import { O2GRoutingCapabilities, O2GRoutingState } from '../types/routing/o2grouting-types';
import { O2GDestination } from '../types/routing/o2g-destination';




export default class RoutingRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async activateDnd(loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "dnd");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async cancelDnd(loginName: string): Promise<boolean> {

        let uriDelete = UtilUri.appendPath(this._uri, "dnd");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async getDndState(loginName: string): Promise<DndState> {
        let uriGet = UtilUri.appendPath(this._uri, "dnd");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<DndState>(await RestService._httpClient.get(uriGet));
	}

	public async getCapabilities(loginName: string): Promise<RoutingCapabilities> {
        let uriGet = this._uri;
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let _capabilities: O2GRoutingCapabilities = this.getResult<O2GRoutingCapabilities>(await RestService._httpClient.get(uriGet)); 
        if (_capabilities) {

            return RoutingCapabilities.build(_capabilities);
        }
        else {
            return null;
        }
	}

    public async cancelForward(loginName: string): Promise<boolean> {
        let uriDelete = UtilUri.appendPath(this._uri, "forwardroute");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete)
        return httpResponse.isSuccessStatusCode();
    }

    public async getForward(loginName: string): Promise<Forward> {
        let uriGet = UtilUri.appendPath(this._uri, "forwardroute");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let httpResponse =  await RestService._httpClient.get(uriGet);
        let json = httpResponse.response;
        if (httpResponse.isSuccessStatusCode()) {

            if (json.length === 0) {
                return Forward.build();
            }
            else {
                let forwardRoute: ForwardRoute = JSON.parse(json);
                return Forward.build(forwardRoute);
            }
        }
        else {
            return null;
        }
	}

	public async forwardOnVoiceMail(condition: ForwardCondition, loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "forwardroute");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            forwardRoute: ForwardRoute.createForwardOnVoiceMail(condition)
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
	}

    public async forwardOnNumber(number: string, condition: ForwardCondition, loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "forwardroute");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            forwardRoute: ForwardRoute.createForwardOnNumber(number, condition)
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async overflowOnVoiceMail(condition: OverflowCondition, loginName: string): Promise<boolean> {
        
        let uriPost = UtilUri.appendPath(this._uri, "overflowroute");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            overflowRoutes: [OverflowRoute.createOverflowOnVoiceMail(condition)]
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async getOverflow(loginName: string): Promise<Overflow> {
        let uriGet = UtilUri.appendPath(this._uri, "overflowroute");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let httpResponse =  await RestService._httpClient.get(uriGet);
        let json = httpResponse.response;
        if (httpResponse.isSuccessStatusCode()) {

            if (json.length === 0) {
                return Overflow.build();
            }
            else {
                let overflowRoute: OverflowRoute = JSON.parse(json);
                return Overflow.build(overflowRoute);
            }
        }
        else {
            return null;
        }
    }

    public async cancelOverflow(loginName: string): Promise<boolean> {
        let uriDelete = UtilUri.appendPath(this._uri, "overflowroute");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete)
        return httpResponse.isSuccessStatusCode();
    }

    public async setRemoteExtensionActivation(active: boolean, loginName: string): Promise<boolean> {
                
        let uriPost = this._uri;
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            presentationRoutes: [
                {
                    destinations: [
                        O2GDestination.createMobileDestination(active)
                    ]
                }
            ]
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async getRoutingState(loginName: string): Promise<RoutingState> {
        var uriGet = UtilUri.appendPath(this._uri, "state");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        var o2gRoutingState: O2GRoutingState = this.getResult<O2GRoutingState>(await RestService._httpClient.get(uriGet));
        if (o2gRoutingState) {
            return RoutingState.build(o2gRoutingState);
        }
        else {
            return null;
        }
    }

    public async requestSnapshot(loginName: string): Promise<boolean> {
                
        var uriPost = UtilUri.appendPath(this._uri, "state/snapshot");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        var httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }
}