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
import AssertUtil from "../util/assert";
import {AcrSkill} from '../../types/telephony/acr-skill';
import { RecordingAction } from '../../types/telephony/RecordingAction';
import { Call, Leg, Callback, MiniMessage, Participant, HuntingGroups, HuntingGroupStatus, DeviceState, TelephonicState } from '../../types/telephony/telephony-types';


type CallList = {
    calls: Call[];
}

type LegList = {
    legs: Leg[];
}

type ParticipantList = {
    participants: Participant[];
}

type DeviceStateList = {
    deviceStates: DeviceState[];
}

type CallbackList = {
    callbacks: Callback[];
}

export default class TelephonyRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }


    public async basicMakeCall(deviceId: string, callee: string, autoAnswer: boolean): Promise<boolean> {

        const json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            callee: AssertUtil.notNullOrEmpty(callee, "callee"),
            autoAnswer: autoAnswer
        });

        let httpResponse = await RestService._httpClient.post(UtilUri.appendPath(this._uri, "basicCall") , new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async basicAnswerCall(deviceId: string): Promise<boolean> { 

        const json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId")
        });

        let httpResponse = await RestService._httpClient.post(UtilUri.appendPath(this._uri, "basicCall/answer") , new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async basicDropMe(loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "basicCall/dropme");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost)
        return httpResponse.isSuccessStatusCode();
    }


    public async getState(loginName: string): Promise<TelephonicState> {

        let uriGet = UtilUri.appendPath(this._uri, "state");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<TelephonicState>(await RestService._httpClient.get(uriGet));
    }

    public async getCalls(loginName: string): Promise<Call[]> {

        let uriGet = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let calls: CallList = this.getResult<CallList>(await RestService._httpClient.get(uriGet));
        if (calls) {
            return calls.calls;
        }
        else {
            return null;
        }
    }

    public async getCall(callRef: string, loginName: string): Promise<Call> { 

        let uriGet = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"));
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<Call>(await RestService._httpClient.get(uriGet));
    }

    public async makeCall(deviceId: string, callee: string, autoAnswer: boolean, loginName: string): Promise<boolean> {
        return this.makeCallEx(deviceId, callee, autoAnswer, false, null, null, loginName)
    }

	public async makeCallEx(deviceId: string, callee: string, autoAnswer: boolean = true, inhibitProgressTone: boolean = false, associatedData: string = null, callingNumber: string = null, loginName: string = null): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req: any = new Object();
        req.deviceId = AssertUtil.notNullOrEmpty(deviceId, "deviceId");
        req.callee = AssertUtil.notNullOrEmpty(callee, "callee");
        req.autoAnswer = autoAnswer;
        if (inhibitProgressTone) {
            req.inhibitProgressTone = inhibitProgressTone;
        }

        if (associatedData) {
            req.associateData = associatedData;
        }

        if (callingNumber) {
            req.callingNumber = callingNumber;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async makePrivateCall(deviceId: string, callee: string, pin: string, secretCode: string, loginName: string): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req: any = new Object();
        req.deviceId = AssertUtil.notNullOrEmpty(deviceId, "deviceId");
        req.callee = AssertUtil.notNullOrEmpty(callee, "callee");
        req.pin = AssertUtil.notNullOrEmpty(pin, "pin");;
        if (secretCode) {
            req.secretCode = secretCode;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
	}

	public async makeBusinessCall(deviceId: string, callee: string, businessCode: string, loginName: string): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            callee: AssertUtil.notNullOrEmpty(callee, "callee"),
            businessCode: AssertUtil.notNullOrEmpty(businessCode, "businessCode")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async makeSupervisorCall(deviceId: string, autoAnswer: boolean, loginName: string): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            autoAnswer: autoAnswer,
            acdCall: {
                callToSupervisor: true
            }
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async makePilotOrRSISupervisedTransferCall(deviceId: string, pilot: string, associatedData: string, callProfile: AcrSkill[], loginName: string): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }


        let req: any = new Object();
        req.deviceId = AssertUtil.notNullOrEmpty(deviceId, "deviceId");
        req.callee = AssertUtil.notNullOrEmpty(pilot, "pilot");
        if (associatedData) {
            req.associateData = associatedData;
        }

        req.acdCall = new Object();
        req.acdCall.supervisedTransfer = true;

        if (callProfile) {
            req.acdCall.skills = callProfile;
        }

        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async makePilotOrRSICall(deviceId: string, pilot: string, autoAnswer: boolean, associatedData: string, callProfile: AcrSkill[], loginName: string): Promise<boolean> { 
        
        let uriPost = UtilUri.appendPath(this._uri, "calls");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req: any = new Object();
        req.deviceId = AssertUtil.notNullOrEmpty(deviceId, "deviceId");
        req.callee = AssertUtil.notNullOrEmpty(pilot, "pilot");
        req.autoAnswer = autoAnswer;
        if (associatedData) {
            req.associateData = associatedData;
        }

        if (callProfile) {
            req.acdCall = new Object();
            req.acdCall.skills = callProfile;
        }

        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async alternate(callRef: string, deviceId: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "alternate");

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async answer(callRef: string, deviceId: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "answer");

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async attachData(callRef: string, deviceId: string, associatedData: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "attachdata");

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            associatedData: AssertUtil.notNullOrEmpty(associatedData, "associatedData")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async blindTransfer(callRef: string, transferTo: string, anonymous: boolean, loginName: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "blindtransfer");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            transferTo: AssertUtil.notNullOrEmpty(transferTo, "transferTo"),
            anonymous: anonymous
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async callback(callRef: string, loginName: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "callback");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

	public async getDeviceLegs(callRef: string, loginName: string): Promise<Leg[]> { 
        let uriGet = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "deviceLegs");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let legs: LegList = this.getResult<LegList>(await RestService._httpClient.get(uriGet));
        if (legs) {
            return legs.legs;
        }
        else {
            return null;
        }
    }

	public async getDeviceLeg(callRef: string, legId: string, loginName: string): Promise<Leg> { 
        
        let uriGet = UtilUri.appendPath(
            this._uri, 
            "calls", 
            AssertUtil.notNullOrEmpty(callRef, "callRef"), 
            "deviceLegs",
            AssertUtil.notNullOrEmpty(legId, "legId"));
        
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<Leg>(await RestService._httpClient.get(uriGet));
    }

	public async dropme(callRef: string, loginName: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "dropme");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async hold(callRef: string, deviceId: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "hold");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async merge(callRef: string, heldCallRef: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "merge");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            heldCallRef: AssertUtil.notNullOrEmpty(heldCallRef, "heldCallRef")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();    
    }

	public async overflowToVoiceMail(callRef: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "overflowToVoiceMail");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();    
    }

    public async park(callRef: string, parkTo: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "park");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            parkTo: AssertUtil.notNullOrEmpty(parkTo, "parkTo")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();    
    }

	public async getParticipants(callRef: string, loginName: string): Promise<Participant[]> { 
        let uriGet = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "participants");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        var participants: ParticipantList = this.getResult<ParticipantList>(await RestService._httpClient.get(uriGet));
        if (participants) {
            return participants.participants;
        }
        else {
            return null;
        }
    }

	public async getParticipant(callRef: string, participantId: string, loginName: string): Promise<Participant> { 

        let uriGet = UtilUri.appendPath(
            this._uri, 
            "calls", 
            AssertUtil.notNullOrEmpty(callRef, "callRef"), 
            "participants",
            AssertUtil.notNullOrEmpty(participantId, "participantId"));

        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<Participant>(await RestService._httpClient.get(uriGet));
    }

	public async dropParticipant(callRef: string, participantId: string, loginName: string): Promise<boolean> { 

        var uriDelete = UtilUri.appendPath(
            this._uri, 
            "calls", 
            AssertUtil.notNullOrEmpty(callRef, "callRef"), 
            "participants",
            AssertUtil.notNullOrEmpty(participantId, "participantId"));

        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();    
    }

	public async reconnect(callRef: string, deviceId: string, enquiryCallRef: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "reconnect");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            enquiryCallRef: AssertUtil.notNullOrEmpty(enquiryCallRef, "enquiryCallRef")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async doRecordAction(callRef: string, action: RecordingAction, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "recording");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        uriPost = UtilUri.appendQuery(uriPost, "action", action);

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }


	public async redirect(callRef: string, redirectTo: string, anonymous: boolean, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "redirect");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            redirectTo: AssertUtil.notNullOrEmpty(redirectTo, "redirectTo"),
            anonymous: anonymous
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async retrieve(callRef: string, deviceId: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "retrieve");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async sendDtmf(callRef: string, deviceId: string, number: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "sendDtmf");

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            number: AssertUtil.notNullOrEmpty(number, "number")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async sendAccountInfo(callRef: string, deviceId: string, accountInfo: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "sendaccountinfo");

        let json = JSON.stringify({
            deviceId: AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            accountInfo: AssertUtil.notNullOrEmpty(accountInfo, "accountInfo")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async transfer(callRef: string, heldCallRef: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "calls", AssertUtil.notNullOrEmpty(callRef, "callRef"), "transfer");

        let json = JSON.stringify({
            heldCallRef: AssertUtil.notNullOrEmpty(heldCallRef, "heldCallRef")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async deskSharingLogOn(dssDeviceNumber: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "deskSharing");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            dssDeviceNumber: AssertUtil.notNullOrEmpty(dssDeviceNumber, "dssDeviceNumber")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async deskSharingLogOff(loginName: string): Promise<boolean> { 

        var uriDelete = UtilUri.appendPath(this._uri, "deskSharing");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

	public async getDevicesState(loginName: string): Promise<DeviceState[]> { 

        let uriGet = UtilUri.appendPath(this._uri, "devices");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        var states: DeviceStateList = this.getResult<DeviceStateList>(await RestService._httpClient.get(uriGet));
        if (states) {
            return states.deviceStates;
        }
        else {
            return null;
        }
    }

	public async getDeviceState(deviceId: string, loginName: string): Promise<DeviceState> { 

        let uriGet = UtilUri.appendPath(this._uri, "devices", AssertUtil.notNullOrEmpty(deviceId, "deviceId"));
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<DeviceState>(await RestService._httpClient.get(uriGet));
    }

	public async pickUp(deviceId: string, otherCallRef: string, otherPhoneNumber: string, autoAnswer: boolean): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "devices", AssertUtil.notNullOrEmpty(deviceId, "deviceId"), "pickup");

        let json = JSON.stringify({
            otherCallRef: AssertUtil.notNullOrEmpty(otherCallRef, "otherCallRef"), 
            otherPhoneNumber: AssertUtil.notNullOrEmpty(otherPhoneNumber, "otherPhoneNumber"), 
            autoAnswer: autoAnswer
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async intrusion(deviceId: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "devices", AssertUtil.notNullOrEmpty(deviceId, "deviceId"), "intrusion");

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }


	public async unPark(deviceId: string, heldCallRef: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "devices", AssertUtil.notNullOrEmpty(deviceId, "deviceId"), "unpark");

        let json = JSON.stringify({
            heldCallRef: AssertUtil.notNullOrEmpty(heldCallRef, "heldCallRef")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }


	public async getHuntingGroupStatus(loginName: string): Promise<HuntingGroupStatus> { 

        let uriGet = UtilUri.appendPath(this._uri, "huntingGroupLogOn");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<HuntingGroupStatus>(await RestService._httpClient.get(uriGet));
    }

	public async huntingGroupLogOn(loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "huntingGroupLogOn");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

	public async huntingGroupLogOff(loginName: string): Promise<boolean> { 

        var uriDelete = UtilUri.appendPath(this._uri, "huntingGroupLogOn");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

	public async addHuntingGroupMember(hgNumber: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "huntingGroupMember", AssertUtil.notNullOrEmpty(hgNumber, "hgNumber"));
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

	public async deleteHuntingGroupMember(hgNumber: string, loginName: string): Promise<boolean> { 

        var uriDelete = UtilUri.appendPath(this._uri, "huntingGroupMember", AssertUtil.notNullOrEmpty(hgNumber, "hgNumber"));
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

	public async queryHuntingGroups(loginName: string): Promise<HuntingGroups> { 

        let uriGet = UtilUri.appendPath(this._uri, "huntingGroups");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<HuntingGroups>(await RestService._httpClient.get(uriGet));
    }

	public async getCallbacks(loginName: string): Promise<Callback[]> { 

        let uriGet = UtilUri.appendPath(this._uri, "incomingCallbacks");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        var callbacks: CallbackList = this.getResult<CallbackList>(await RestService._httpClient.get(uriGet));
        if (callbacks) {
            return callbacks.callbacks;
        }
        else {
            return null;
        }
    }

	public async deleteCallbacks(loginName: string): Promise<boolean> { 

        var uriDelete = UtilUri.appendPath(this._uri, "incomingCallbacks");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async deleteCallback(callbackId: string, loginName: string): Promise<boolean> {
        var uriDelete = UtilUri.appendPath(this._uri, "incomingCallbacks", AssertUtil.notNullOrEmpty(callbackId, "callbackId"));
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

	public async getMiniMessage(loginName: string): Promise<MiniMessage> { 

        let uriGet = UtilUri.appendPath(this._uri, "miniMessages");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<MiniMessage>(await RestService._httpClient.get(uriGet));
    }

	public async sendMiniMessage(recipient: string, message: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "miniMessages");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            recipient: AssertUtil.notNullOrEmpty(recipient, "recipient"),
            message: AssertUtil.notNullOrEmpty(message, "message")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

	public async requestCallback(callee: string, loginName: string): Promise<boolean> { 

        let uriPost = UtilUri.appendPath(this._uri, "outgoingCallbacks");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            callee: AssertUtil.notNullOrEmpty(callee, "callee")
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async requestSnapshot(loginName: string): Promise<boolean> { 
        let uriPost = UtilUri.appendPath(this._uri, "state/snapshot");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost)
        return httpResponse.isSuccessStatusCode();
    }
}