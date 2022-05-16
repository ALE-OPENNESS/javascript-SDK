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
import AssertUtil from "../util/assert";
import HttpContent from '../util/http-content';
import { MailBox, MailBoxInfo, VoiceMessage } from '../../types/messaging/messaging-types';


type MailBoxes = {
    mailboxes: MailBox[];
}

type VoicemailsList = {
    voicemails: VoiceMessage[];
}


export default class MessagingRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getMailboxes(loginName: string): Promise<MailBox[]> {
        
        let uriGet = this._uri;
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        let mailboxes: MailBoxes = this.getResult<MailBoxes>(await RestService._httpClient.get(uriGet))
        if (mailboxes) {
            return mailboxes.mailboxes;
            
        }
        else {
            return null;
        }
    }

    public async getMailboxInfo(mailboxId: string, password: string, loginName: string): Promise<MailBoxInfo> {
        
        let uriPost = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(mailboxId, "mailboxId"));
        if (loginName != null) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        if (password) {
            var json = JSON.stringify({
                "password": password
            });

            let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
            return this.getResult<MailBoxInfo>(httpResponse);
        }
        else {
            uriPost = UtilUri.appendQuery(uriPost, "withUserPwd");

            let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
            return this.getResult<MailBoxInfo>(httpResponse);
        }
    }

    public async getVoiceMessages(mailboxId: string, newOnly: boolean, offset: number, limit: number, loginName: string): Promise<VoiceMessage[]> {
         
        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(mailboxId, "mailboxId"), "voicemails");
        if (loginName != null) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        if (newOnly) {
            uriGet = UtilUri.appendQuery(uriGet, "newOnly", "true");
        }
        if (offset) {
            uriGet = UtilUri.appendQuery(uriGet, "offset", offset.toString());
        }
        if (limit) {
            uriGet = UtilUri.appendQuery(uriGet, "limit", limit.toString());
        }
 
        let voicemails: VoicemailsList = this.getResult<VoicemailsList>(await RestService._httpClient.get(uriGet))
        if (voicemails) {
            
            let vms = voicemails.voicemails;
            vms.forEach(vm => vm.date = new Date(vm.date));

            return vms;
        }
        else {
            return null;
        }
    }

    public async downloadVoiceMessage(mailboxId: string, voicemailId: string, loginName: string): Promise<Blob> {
                 
        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(mailboxId, "mailboxId"), 
            "voicemails",
            AssertUtil.notNullOrEmpty(voicemailId, "voicemailId"));

        if (loginName != null) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }
    
        // Get the file as a blob object
        let httpResponse = await RestService._httpClient.get(uriGet, "blob");
        return this.getBlob(httpResponse);
    }
}