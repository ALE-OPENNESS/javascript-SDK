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

import MessagingRest from "./internal/rest/messaging-rest";
import { MailBox } from "./types/messaging/messaging-types";
import { MailBoxInfo } from "./types/messaging/messaging-types";
import { VoiceMessage } from "./types/messaging/messaging-types";

/**
 * Messaging service provides access to user's voice mail box.
 * It's possible using this service to connect to the voice mail box, retrieve
 * the information and the list of voice mails and manage the mail box. Using
 * this service requires having a <b>TELEPHONY_ADVANCED</b> license. <br>It's
 * possible to download the voice mail as a wav file and to delete an existing
 * messages.
 */
 export class Messaging {

    private _messagingRest: MessagingRest;

    /**
     * @internal
     */
    constructor(messagingRest: MessagingRest) {
        this._messagingRest = messagingRest;
	}

    /**
     * Get the specified user's mailboxes. This is the logical first step to access
     * further operation on voice mail feature.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the user login name
     */
    public async getMailboxes(loginName: string = null): Promise<MailBox[]> {
        return this._messagingRest.getMailboxes(loginName);
    }


    /**
     * Get the information on the specified mail box.
     * <p>
     * The 'password' is optional. if not set, the user password is used to
     * connect on the voicemail. This is only possible if the OmniPCX Enterprise
     * administrator has managed the same pasword for the user and his mailbox.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param mailBoxId the mail box identifier given in a {@link MailBox}
     * @param password  the mail box password
     * @param loginName the user login name
     * 
     */
    public async getMailboxInfo(mailBoxId: string, password: string = null, loginName: string = null): Promise<MailBoxInfo> {
        return this._messagingRest.getMailboxInfo(mailBoxId, password, loginName);
    }


    /**
     * Get the list of voice messages in the specified mail box.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param mailboxId the mail box identifier given in a {@link MailBox}
     *                  object
     * @param newOnly   filter only unread voicemail if set to 'true'
     * @param offset    the offset from which to start retrieving the voicemail list
     * @param limit     the maximum number of items to return
     * @param loginName the user login name
     */
     public async getVoiceMessages(mailboxId: string, newOnly: boolean = false, offset: number = null, limit: number = null, loginName: string = null): Promise<VoiceMessage[]> {
        return this._messagingRest.getVoiceMessages(mailboxId, newOnly, offset, limit, loginName);
    }

    public async deleteVoiceMessage(mailboxId: string, voicemailId: string, loginName: string = null) {
    }

    async deleteVoiceMessages(mailboxId: string, msgIds: string[], loginName: string = null) {
    }

    async downloadVoiceMessage(mailboxId: string, voicemailId: string, loginName: string = null) {
        return this._messagingRest.downloadVoiceMessage(mailboxId, voicemailId, loginName);
    }


}