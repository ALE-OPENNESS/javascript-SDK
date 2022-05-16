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
import { IntrusionMode } from '../../types/cc-agent/intrusion-mode';
import {OperatorType} from '../../types/cc-agent/operator-type'
import { AgentGroups, AgentSkill, OperatorConfig, OperatorState, WithdrawReason } from '../../types/cc-agent/cc-agent-types';

type O2GAgentConfig = {
    type: string;
    proacd: string;
    processingGroups: AgentGroups;
    skills: {
        skills: AgentSkill[];
    };
    selfAssign: boolean;
    headset: boolean;
    help: boolean;
    multiline: boolean;
}

type O2GWithdrawReasons = {
    reasons: WithdrawReason[];
}

export default class CallCenterAgentRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getConfiguration(loginName: string): Promise<OperatorConfig> { 
        let uriGet = UtilUri.appendPath(this._uri, "config");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let o2gAgentConfig: O2GAgentConfig = this.getResult<O2GAgentConfig>(await RestService._httpClient.get(uriGet));
        if (o2gAgentConfig) {

            let mapSkills = new Map<number, AgentSkill>();
            if (o2gAgentConfig.skills.skills) {

                o2gAgentConfig.skills.skills.forEach(s => mapSkills.set(s.number, s));
            }

            return {
                "type": OperatorType[o2gAgentConfig.type],
                "proacd": o2gAgentConfig.proacd,
                "groups": o2gAgentConfig.processingGroups,
                "selfAssign": o2gAgentConfig.selfAssign,
                "skills": mapSkills,
                "headset": o2gAgentConfig.headset,
                "help": o2gAgentConfig.help,
                "multiline": o2gAgentConfig.multiline
            };
        }
        else {
            return null;
        }
    }

    public async getState(loginName: string): Promise<OperatorState> { 
        let uriGet = UtilUri.appendPath(this._uri, "state");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<OperatorState>(await RestService._httpClient.get(uriGet));
    }

    public async logon(proAcdNumber: string, pgNumber: string, headset: boolean, loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "logon");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req: any = new Object();
        req.proAcdDeviceNumber = AssertUtil.notNullOrEmpty(proAcdNumber, "proAcdNumber");
        if (pgNumber) {
            req.pgGroupNumber = pgNumber;
        }
        if (headset) {
            req.headset = true;
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async logoff(loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "logoff");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async enter(pgNumber: string, loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, "enter");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req = {
            "pgGroupNumber": AssertUtil.notNullOrEmpty(pgNumber, "pgNumber")
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async exit(loginName: string): Promise<boolean> {
        // First get the operator state to get the processing group
        let state = await this.getState(loginName);
        if (state.pgNumber) {

            let uriPost = UtilUri.appendPath(this._uri, "exit");
            if (loginName) {
                uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
            }
    
            let json = JSON.stringify({
                "pgGroupNumber": state.pgNumber
            });
    
            let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
            return httpResponse.isSuccessStatusCode();
        }
        else {
            return false;
        }
    }

    private async _doAgentAction(action: string, loginName: string): Promise<boolean> {

        let uriPost = UtilUri.appendPath(this._uri, action);
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async setWrapup(loginName: string): Promise<boolean> {
        return this._doAgentAction("wrapUp", loginName);
    }

    public async setReady(loginName: string): Promise<boolean> {
        return await this._doAgentAction("ready", loginName);
    }

    public async setPause(loginName: string): Promise<boolean> {
        return await this._doAgentAction("pause", loginName);
    }

    public async requestPermanentListening(agentNumber: string, loginName: string): Promise<boolean> {
        
        let uriPost = UtilUri.appendPath(this._uri, "permanentListening");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req = {
            "agentNumber": AssertUtil.notNullOrEmpty(agentNumber, "agentNumber")
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async requestIntrusion(agentNumber: string, intrusionMode: IntrusionMode, loginName: string): Promise<boolean> {
         
        let uriPost = UtilUri.appendPath(this._uri, "intrusion");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req = {
            "agentNumber": AssertUtil.notNullOrEmpty(agentNumber, "agentNumber"),
            "mode": intrusionMode
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async changeIntrusionMode(newIntrusionMode: IntrusionMode, loginName: string): Promise<boolean> {

        let uriPut = UtilUri.appendPath(this._uri, "intrusion");
        if (loginName) {
            uriPut = UtilUri.appendQuery(uriPut, "loginName", loginName);
        }

        let req = {
            "mode": newIntrusionMode
        }
        let json = JSON.stringify(req);

        let httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async requestSupervisorHelp(loginName: string): Promise<boolean> {
        return await this._doAgentAction("supervisorHelp", loginName);
    }

    private async _doCancelSupervisorHelpRequest(otherNumber: string, loginName: string): Promise<boolean> {

        let uriDelete = UtilUri.appendPath(this._uri, "supervisorHelp");
        uriDelete = UtilUri.appendQuery(uriDelete, "other", otherNumber);
        
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async rejectAgentHelpRequest(agentNumber: string, loginName: string): Promise<boolean> {
        return this._doCancelSupervisorHelpRequest(AssertUtil.notNullOrEmpty(agentNumber, "agentNumber"), loginName)
    }

    public async cancelSupervisorHelpRequest(supervisorNumber: string, loginName: string): Promise<boolean> {
        return this._doCancelSupervisorHelpRequest(AssertUtil.notNullOrEmpty(supervisorNumber, "supervisorNumber"), loginName)
    }

    public async requestSnapshot(loginName: string): Promise<boolean> {
         
        let uriPost = UtilUri.appendPath(this._uri, "state/snapshot");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let httpResponse = await RestService._httpClient.post(uriPost);
        return httpResponse.isSuccessStatusCode();
    }

    public async activateSkills(skillNumbers: number[], loginName: string): Promise<boolean> {
         
        let uriPost = UtilUri.appendPath(this._uri, "config/skills/activate");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            "skills": skillNumbers
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async deactivateSkills(skillNumbers: number[], loginName: string): Promise<boolean> {
         
        let uriPost = UtilUri.appendPath(this._uri, "config/skills/deactivate");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            "skills": skillNumbers
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async getWithdrawReasons(pgNumber: string, loginName: string): Promise<WithdrawReason[]> {

        let uriGet = UtilUri.appendPath(this._uri, "withdrawReasons");
        uriGet = UtilUri.appendQuery(uriGet, "pgNumber", AssertUtil.notNullOrEmpty(pgNumber, "pgNumber"));
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let o2gWithdrawReasons: O2GWithdrawReasons = this.getResult<O2GWithdrawReasons>(await RestService._httpClient.get(uriGet));
        if (o2gWithdrawReasons) {
            return o2gWithdrawReasons.reasons;
        }
        else {
            return null;
        }
    }

    public async setWithdraw(reason: WithdrawReason, loginName: string): Promise<boolean> {
         
        let uriPost = UtilUri.appendPath(this._uri, "withdraw");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let json = JSON.stringify({
            "reasonIndex": AssertUtil.notNull(reason, "reason").index
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }
}