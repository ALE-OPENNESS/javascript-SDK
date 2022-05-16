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
 * PilotStatus represents the possible state of a CCD pilot.
 */
 export enum PilotStatus {
    
    /**
     * The pilot is opened.
     */
    OPEN = 'OPEN', 
    
    /**
     * The pilot is blocked.
     */
    BLOCKED = 'BLOCKED', 
    
    /**
     * The pilot is on a blocked on a rule.
     */
    BLOCKED_ON_RULE = 'BLOCKED_ON_RULE', 
    
    /**
     * The pilot is blocked on a blocking rule.
     */
    BLOCKED_ON_BLOCKED_RULE = 'BLOCKED_ON_BLOCKED_RULE', 
    
    /**
     * The pilot is in general forwarding.
     */
    GENERAL_FORWARDING = 'GENERAL_FORWARDING', 
    
    /**
     * The pilot is in general forwarding on a rule.
     */
    GENERAL_FORWARDING_ON_RULE = 'GENERAL_FORWARDING_ON_RULE',
    
    /**
     * The pilot is blocked while in general forwarding on a rule.
     */
    BLOCKED_ON_GENERAL_FORWARDING_RULE = 'BLOCKED_ON_GENERAL_FORWARDING_RULE', 
    
    /**
     * Other state
     */
    OTHER = 'OTHER'
}


/**
 * AcdData represents the acd extension for an acd call.
 */
 export type AcdData = {
    
    /**
     * The information associated to this acd call.
     */
    callInfo: {
        /**
         * The waiting time in a queue from which the call has been distributed.
         */
        queueWaitingTime: number;

        /**
         * The global waiting time in the CCD.
         */
        globalWaitingTime: number;

        /**
         * The agent group the agent who answer the call is logged in.
         */
        agentGroup: number;

        /**
         * Whether it's a local acd call
         */
        local: boolean;
    };

    /**
     * The information about the queue that has distributed this call.
     */
    queueData: {
        /**
         * The estimated waiting time in the queue.
         */
        waitingTime: number;

        /**
         * Whether this queue is saturated.
         */
        saturated: boolean;
    };

    /**
     * The pilot who has distributed this call.
     */
    pilotNumber: string;

    /**
     * The RSI point that has distribuet this call.
     */
    rsiNumber: string;

    /**
     * Whether the transfer on the pilot was supervised.
     */
    supervisedTransfer: boolean;

    /**
     * The information about the possible transfer on a pilot.
     */
    pilotTransferInfo: {
        /**
         * Whether the transfer on this CCD pilot is possible.
         */
        transferPossible: boolean;

        /**
         * The pilot state.
         */
        pilotStatus: PilotStatus;
    };
}


/**
 * MediaState represents a media state.
 */
export enum MediaState {
    
    /**
     * Unknown media state. O2G server is unable to provide the information.
     */
     UNKNOWN = 'UNKNOWN',
    
     /**
      * The OFF_HOOK state is used when the device is busy for other reasons than a call; typically during service activation.
      */
     OFF_HOOK = 'OFF_HOOK', 
     
     /**
      * Idle state, no activity on the media.
      */
     IDLE = 'IDLE', 
     
     /**
      * The call is releasing.
      */
     RELEASING = 'RELEASING', 
     
     /**
      * A make call is in progress.
      */
     DIALING = 'DIALING', 
     
     /**
      * The call has been placed on hold.
      */
     HELD = 'HELD', 
     
     /**
      * An incoming call is ringing.
      */
     RINGING_INCOMING = 'RINGING_INCOMING', 
     
     /**
      * An outgoing call is in progress and the other party is ringing.
      */
     RINGING_OUTGOING = 'RINGING_OUTGOING', 
     
     /**
      * The call is active.
      */
     ACTIVE = 'ACTIVE' 
}


/**
 * RecordState represent the recording state of a call.
 */
 export enum RecordState {
    
    /**
     * The recording is paused.
     */
    PAUSED = 'PAUSED',
    
    /**
     * The recording is in progress.
     */
    RECORDING = 'RECORDING'
}


/**
 * Tag represents a tag (a define name and value), associated to a call.
 */
 export type Tag = {

    /**
     * The tag name.
     */
    name: string;

    /**
     * The tag value.
     */
    value: string;

    /**
     * The tag visibilities.
     */
    visibilities: string[];
}

/**
 * {@code Capabilities} represents the call capabilities.
*/
export type CallCapabilities = {
    /**
     * Whether a device can be added to this call.
     */
    addDevice: boolean;

    /**
     * Whether a participant can be added to this call.
     */
    addParticipant: boolean;

    /**
     * Whether this call can be intruted.
     */
    intruded: boolean;

    /**
     * Whether it is possible to make intrusion on the user called through this call.
     */
    intrusion: boolean;

    /**
     * Whether this call can be transferred.
     */
    transfer: boolean;

    /**
     * Whether this call can be blind transferred.
     */
    blindTransfer: boolean;

    /**
     * Whether this call can be merged.
     */
    merge: boolean;

    /**
     * Whether this call can be redirected.
     */
    redirect: boolean;

    /**
     * Whether this call can be picked up.
     */
    pickedUp: boolean;

    /**
     * Whether this call can be redirected on voice mail.
     */
    redirectToVoiceMail: boolean;

    /**
     * Whether this call can overflow on voice mail.
     */
    overflowToVoiceMail: boolean;

    /**
     * Whether this call can be dropped.
     */
    dropMe: boolean;

    /**
     * Whether this call can be terminated.
     */
    terminate: boolean;

    /**
     * Whether this call can be rejected.
     */
    reject: boolean;

    /**
     * Whether this call can be called back.
     */
    callBack: boolean;

    /**
     * Whether this call can be parked.
     */
    park: boolean;

    /**
     * Whether this call can be recorded.
     */
    startRecord: boolean;

    /**
     * Whether this call can stop recording.
     */
    stopRecord: boolean;

    /**
     * Whether this call can pause recording.
     */
    pauseRecord: boolean;

    /**
     * Whether this call can resume recording.
     */
    resumeRecord: boolean;

    /**
     * Whether drop participant can be invoked.
     */
    dropParticipant: boolean;

    /**
     * Whether mute participant can be invoked.
     */
    muteParticipant: boolean;

    /**
     * Whether hold participant can be invoked.
     */
    holdParticipant: boolean;
 }

/**
 * CallData represents the data associated to a call.
 */
export type CallData = {

    /**
     * The initial party called.
     */
    initialCalled: PartyInfo;

    /**
     * Whether it is a device call.
     */
    deviceCall: boolean;

    /**
     * Whether this call is anonymous
     */
    anonymous: boolean;

    /**
     * tThis call UUID.
     */
    callUUID: string;

    /**
     * The state of this call.
     */
    state: MediaState;

    /**
     * The record state of this call.
     */
    recordState: RecordState;

    /**
     * This call tags.
     */
    tags: Tag[]

    /**
     * The call capabilities.
     */
    capabilities: CallCapabilities

    /**
     * The call associated data.
     */
    associatedData: string;

    /**
     * This call account info.
     */
    accountInfo: string;

    /**
     * This call associated acd data.
     */
    acdCallData: AcdData;
}

/**
 * LegCapabilities represents the capability of a leg. The action that can
 * be carried out on the leg according to its state.
 */
export type LegCapabilities = {
    /**
     * Whether the leg can answer.
     */
    answer: boolean;

    /**
     * Whether the leg can be dropped.
     */
    drop: boolean;

    /**
     * Whether the leg can be put on hold.
     */
    hold: boolean;

    /**
     * Whether can be retrieved.
     */
    retrieve: boolean;

    /**
     * Whether the leg can be reconnected.
     */
    reconnect: boolean;

    /**
     * Whether the leg can be muted.
     */
    mute: boolean;

    /**
     * Whether the leg can be unmuted.
     */
    unMute: boolean;

    /**
     * Whether the leg can send dtmf.
     */
    sendDtmf: boolean;

    /**
     * Whether the leg can switch device.
     */
    switchDevice: boolean; 
}

/**
 * Describes a leg. A leg represents the user's device involved in a call for a
 * dedicated media.
 */
 export type Leg = {

    /**
     * The phone number of the device associated to this leg.
     */
    deviceId: string;

    /**
     * The media state.
     */
    state: MediaState;

    /**
     * Whether the remote party is ringing.
     */
    ringingRemote: boolean;

    /**
     * The leg capabilities.
     */
    capabilities: LegCapabilities;
}


/**
 * Represent a participant to a call. A call can have several participants (case of a conference for exemple).
 * A participant is identified by its 'participantId', a unique 'string generated by the O2G server
 */
export type Participant = {

    /**
     * This participant identifier.
     */
    participantId: string;

    /**
     * This participant identity.
     */
    identity: PartyInfo;

    /**
     * Whether this paticipant is anonymous.
     */
    anonymous: boolean;

    /**
     * Whether this participant can be dropped.
     */
    undroppable: boolean;

    /**
     * The participant media state.
     */
    state: MediaState;
}


/**
 * This class describe a call.
 * <p>
 * An outgoing call is created by invoking one of the 'makeCall' methods
 * of {@link Telephony}.
 */
export type Call = {

    /**
     * The reference of this call.
     */
    callRef: string;

    /**
     * The data associated to this call.
     */
    callData: CallData;

    /**
     * The legs associated to this call.
     */
    legs: Leg[];

    /**
     * The participants associated to this call.
     */
    participants: Participant[];
}

/**
 * DeviceCapabilities represents the capability of a device.
 */
export type DeviceCapabilities = {

    /**
     * The device identifier.
     */
    deviceId: string;

    /**
     * Wheather this device can make a call.
     */
    makeCall: boolean;

    /**
     * Wheather his device can make a business call.
     */
    makeBusinessCall: boolean;

    /**
     * Wheather this device can make a private call.
     */
    makePrivateCall: boolean;

    /**
     * Wheather this device can unpark a call.
     */
    unParkCall: boolean;
}


/**
 * Represent the possible user states.
 */
 export enum UserState {
    /**
     * The user is free, there is no call in progress
     */
	FREE = 'FREE',
	
	/**
	 * The user is busy
	 */
    BUSY = 'BUSY',
    
    /**
     * The user state is unknown
     */
    UNKNOWN = 'UNKNOWN'
}



/**
 * Represent the telephonic state of a user.
 */
export type TelephonicState = {

    /**
     * The collection of active calls.
     */
    calls : Call[];

    /**
     * The collection of device capabilities.
     */
    deviceCapabilities: DeviceCapabilities[];

    /**
     * The user state.
     */
    userState: UserState;
}

/**
 * OperationalState represents a device dynamic state.
 */
 export enum OperationalState {
    
    /**
     * The device is in service.
     */
    IN_SERVICE = 'IN_SERVICE', 
    
    /**
     * The device is out of service.
     */
    OUT_OF_SERVICE = 'OUT_OF_SERVICE', 
    
    /**
     * The dynamic state of the device can not be retrieved.
     */
    UNKNOWN = 'UNKNOWN'
}

/**
 * DeviceState represents the state of a device.
 */
 export type DeviceState = {

    /**
     * The device identifier.
     */
    deviceId: string;

    /**
     * The device state.
     */
    state: OperationalState;
}

/**
 * Describes the status of a user regarding hunting groups
 */
export type HuntingGroupStatus = {

    /**
     * Whether a user is logged in a hunting group.
     */
    logon: boolean;
}


/**
 * HuntingGroups gives the hunting group information for a user. A user
 * can be member of only one hunting group.
 */
 export type HuntingGroups = {

    /**
     * The list of existing hunting groups.
     */
    hgList: string[];

    /**
     * The hunting group which the user is a member.
     */
    currentHg: string;
}


/**
 * Callback represenst a callback request. A callback request is
 * invoked by a caller to ask the user to call him back as sson as possible.
 */
 export type Callback = {
     
    /**
      * This callback request id.
      */
    callbackId: string;

    /**
     * The party who has requested the callback.
     */
    partyInfo: PartyInfo;
}


/**
 * MiniMessage class represents a mini message exchanged between two users.
 */
 export type MiniMessage = {

    /**
     * The sender of this message.
     */
    sender: string;

    /**
     * The date the mini message has been sent.
     */
    dateTime: string;

    /**
     * The text message.
     */
    message: string;
}
