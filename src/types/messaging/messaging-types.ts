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

import { PartyInfo } from "../common/common-types";


/**
 * MailBox represents a mail box in a voice mail system. A voice mail is assigned to a user.
 */
export type MailBox = {

    /**
     * The mail box identifier.
     */
    id: string;

    /**
     * The mail box name.
     */
    name: string;

    
    /**
     * The mail box capabilities.
     */
    capabilities: {
        
        /**
         * Whether the voicemail server can return the list of messages.
         */
        listMessages: boolean;
        
        /**
         * Whether Voice messages can be downloaded.
         */
        getMessages: boolean;
        
        /**
         * Whether Recorded messages can be downloaded.
         */
        getRecord: boolean;
        
        /**
         * Whether the voicemail server can play voice messages.
         */
        play: boolean;
        
        /**
         * Whether a played voice message can be paused and resumes from the position it has been paused.
         */
        pause: boolean;
        
        /**
         * Whether the media session can be terminate.
         */
        hangup: boolean;
        
        /**
         * Whether the voicemail server can record voice messages.
         */
        record: boolean;
        
        /**
         * Wheter a voice message can be resumed to the position it has been paused.
         */
        resume: boolean;
        
        /**
         * Whether the current recording can be cancelled.
         */
        cancel: boolean;
        
        /**
         * Wheter the voicemail server can forward voice messages.
         */
        forward: boolean;
        
        /**
         * Whether the voicemail server can call back the originator of the voice message.
         */
        callback: boolean;
        
        /**
         * Whether a voice message or a record can be sent to recipients.
         */
        send: boolean;
        
        /**
         * Whether the voicemail server can send events in case of message deposit / removal.
         */
        events: boolean;
    }
}

/**
 * MailBoxInfo provides information on the mail box the user is
 * connected on.
 * 
 * @see {@link Messaging.getMailboxInfo}
 */
export type MailBoxInfo = {

    /**
     * The number of voice messages in this mail box.
     */
    totalVoiceMsg: number;

    /**
     * The new voice messages in this mail box.
     */
    newVoiceMsg: number;
    

    /**
     * The storage usage.
     */
    storageUsage: number;
}


/**
 * VoiceMessage represents a message stored in a voice Mail box.
 */
 export type VoiceMessage = {

    /**
     * The message identifier.
     */
    voicemailId: string;

    /**
     * The party who has deposit this message.
     */
    from: PartyInfo;

    /**
     * The message duration.
     */
    duration: number;

    /**
     * The date this message has been deposit.
     */
    date: Date;


    /**
     * Whether this message has been read.
     */
    unread: boolean;

    /**
     * Whether this message has high priority.
     */
    highPriority: boolean,
}