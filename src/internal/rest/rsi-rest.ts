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
import UtilUri from '../util/util-uri';
import AssertUtil from '../util/assert';
import HttpContent from '../util/http-content';
import { Tones } from '../../types/rsi/tones';
import {AdditionalDigitCollectionCriteria} from '../../types/rsi/add-digit-coll-criteria';
import { RsiPoint, RouteSession } from '../../types/rsi/rsi-types';


type RsiPointList = {
    rsiPoints: RsiPoint[];
}

type RouteSessionList = {
    routeSessions: RouteSession[];
}

export default class RsiRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getRsiPoints(): Promise<RsiPoint[]> {
        let rsiPoints: RsiPointList = this.getResult<RsiPointList>(await RestService._httpClient.get(this._uri));
        if (rsiPoints) {
            return rsiPoints.rsiPoints;
        }
        else {
            return null;
        }
    }

    public async enableRsiPoint(rsiNumber: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "enable");
        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async disableRsiPoint(rsiNumber: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "disable");
        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async startCollectDigits(rsiNumber: string, callRef: string, numChars: number, flushChar: string, timeout: number, additionalCriteria: AdditionalDigitCollectionCriteria) {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "collectDigits");

        let req: any = new Object();
        req.callRef = AssertUtil.notNullOrEmpty(callRef, "callRef");
        req.numChars = numChars;
        if (flushChar) {
            req.flushChar = flushChar;
        }
        if (timeout) {
            req.timeout = timeout;
        }
        if (additionalCriteria) {
            req.additionalCriteria = additionalCriteria;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return null;
    }

    public async stopCollectDigits(rsiNumber: string, collCrid: string): Promise<boolean> {
        let uriDelete = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), 
            "collectDigits",
            AssertUtil.notNullOrEmpty(collCrid, "collCrid"));

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async playTone(rsiNumber: string, callRef: string, tone: Tones, duration: number): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "playTone");

        let json = JSON.stringify({
            "callRef": AssertUtil.notNullOrEmpty(callRef, "callRef"),
            "tone": tone,
            "duration": duration
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async cancelTone(rsiNumber: string, callRef: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "stopTone");

        let json = JSON.stringify({
            "callRef": AssertUtil.notNullOrEmpty(callRef, "callRef"),
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async playVoiceGuide(rsiNumber: string, callRef: string, guideNumber: number, duration = null): Promise<boolean> {
 
        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "playVoiceGuide");

        let req: any = new Object();
        req.callRef = AssertUtil.notNullOrEmpty(callRef, "callRef");
        req.guideNumber = guideNumber;
        if (duration) {
            req.duration = duration;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
   }

   public async routeEnd(rsiNumber: string, routeCrid: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "routeEnd");

        let json = JSON.stringify({
            "routeCrid": routeCrid
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
   }

   public async routeSelect(rsiNumber: string, routeCrid: string, selectedRoute: string, callingLine: string, associatedData: string, routeToVoiceMail: boolean): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "routeSelect");

        let req: any = new Object();
        req.routeCrid = AssertUtil.notNullOrEmpty(routeCrid, "routeCrid");
        req.selectedRoute = AssertUtil.notNullOrEmpty(selectedRoute, "selectedRoute");
        if (callingLine) {
            req.callingLine = callingLine;
        }
        if (associatedData) {
            req.associatedData = associatedData;
        }
        if (routeToVoiceMail) {
            req.routeToVoiceMail = routeToVoiceMail;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async getRouteSessions(rsiNumber: string): Promise<RouteSession[]> {
        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), "routeSessions");

        let routeSessions: RouteSessionList = this.getResult<RouteSessionList>(await RestService._httpClient.get(uriGet));
        if (routeSessions) {
            return routeSessions.routeSessions;
        }
        else {
            return null;
        }
    }

    public async getRouteSession(rsiNumber: string, routeCrid: string): Promise<RouteSession> {
        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(rsiNumber, "rsiNumber"), 
            "routeSessions",
            AssertUtil.notNullOrEmpty(routeCrid, "routeCrid")
            );

        return this.getResult<RouteSession>(await RestService._httpClient.get(uriGet));
    }
}