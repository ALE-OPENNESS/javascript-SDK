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

import TelephonyRest from "./internal/rest/telephony-rest";
import {AcrSkill} from "./types/telephony/acr-skill";
import { RecordingAction } from "./types/telephony/RecordingAction";
import { HuntingGroups, Call, Leg, TelephonicState, Participant, DeviceState, HuntingGroupStatus, Callback, MiniMessage } from "./types/telephony/telephony-types";


/**
 * The TelephonyService allows a user to initiate a call and to activate
 * any kind of OmniPCX Enterprise telephony services.
 * <p>
 * Using this service requires having a <b>TELEPHONY_ADVANCED</b> license,
 * except for the 3 basic services
 * {@link basicMakeCall}, {@link basicAnswerCall} and {@link basicDropMe} that are available without any
 * license.
 * 
 */
 export class Telephony {

	private _telephonyRest: TelephonyRest;

	/**
	 * Occurs in response to a snapshot request.
	 * @event
	 */
    readonly ON_TELEPHONY_STATE = "OnTelephonyState";

	/**
	 * Occurs when a new call is created.
	 * @event
	 */
    readonly ON_CALL_CREATED = "OnCallCreated";

	/**
	 * Occurs when an existing call is modified.
	 * @event
	 */
    readonly ON_CALL_MODIFIED = "OnCallModified";

	/**
	 * Occurs when a call has been removed.
	 * @event
	 */
    readonly ON_CALL_REMOVED = "OnCallRemoved";

	/**
	 * Occurs when a user's state has been modified.
	 * @event
	 */
    readonly ON_USER_STATE_MODIFIED = "OnUserStateModified";

	/**
	 * Occurs when a device's state has been modified.
	 * @event
	 */
    readonly ON_DEVICE_STATE_MODIFIED = "OnDeviceStateModified";

	/**
	 * Occurs when a user's dynamic state change.
	 * @event
	 */
    readonly ON_DYNAMIC_STATE_MODIFIED = "OnDynamicStateModified";

	/**
	 * @internal
	 */
	constructor(telephonyRest: TelephonyRest) {
		this._telephonyRest = telephonyRest;
	}

    /**
     * Initiates a call from the specified device to the specified called number.
     * <p>
     * If the session is opened by a user, the device phone number must be one of
     * the user.
     * <p>
     * If the automatic answer on make call 'autoAnswer' parameter is set to
     * 'false' the deviceId is called before launching the make call to
     * callee, else callee is called immediately
     * 
     * @param deviceId   the device phone number for which the call is made
     * @param callee     the called number
     * @param autoAnswer automatic answer on make call.
     */
	public async basicMakeCall(deviceId: string, callee: string, autoAnswer = true):  Promise<boolean> {
		return await this._telephonyRest.basicMakeCall(deviceId, callee, autoAnswer);
	}
	
    /**
     * Answers to an incoming ringing call on the specified device.
     * <p>
     * If the session is opened by a user, the device phone number must be one of
     * the user.
     * 
     * @param deviceId the device phone number
     */
	public async basicAnswerCall(deviceId: string):  Promise<boolean> { 
		return await this._telephonyRest.basicAnswerCall(deviceId);
	}

    /**
     * Exits from the call for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>
     * if the call is a single call, it is released; if it is a conference, the call
     * carries on without the user.
     * 
     * @param loginName the login name for whom the drop is done
     */
	public async basicDropMe(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.basicDropMe(loginName);
	}

    /**
     * Retrieves the calls in progress for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getCalls(loginName: string = null):  Promise<Call[]> { 
		return await this._telephonyRest.getCalls(loginName);
	}

    /**
     * Returns the call specified by the call reference for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param loginName the login name
     */
	 public async getCall(callRef: string, loginName: string = null):  Promise<Call> { 
		return await this._telephonyRest.getCall(callRef, loginName);
	}

    /**
     * Initiates a call from the specified device to the specified called number for
     * the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>
     * If the automatic answer on make call 'autoAnswer' parameter is set to
     * 'false' the deviceId is called before launching the make call to
     * callee, else callee is called immediately
     * 
     * @param deviceId   the device phone number for which the call is made
     * @param callee     the called number
     * @param autoAnswer automatic answer on make call.
     * @param loginName  the login name
     */
	 public async makeCall(deviceId: string, callee: string, autoAnswer: boolean = true, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makeCall(deviceId, callee, autoAnswer, loginName);
	}

	/**
	 * Initiates a new call to another user (the callee), using the specified deviceId and options.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * Use the makeCallEx service to initiated a call from one of the devices of the logged user. 
	 * First, the call server initiates a call on the user 'deviceId'. Then when the call is answered the call server starts the call to the 'callee'.
	 * an {@link ON_CALL_CREATED} is raised.
	 * <p>
	 * If <c>inhibitProgressTone</c> is <see langword="true"/>, progress tone is inhibited on an outbound call.
	 * <p>
	 * The callingNumber is used on an outbound call to  to present another calling number on the public network call in order to hide the real calling extension number.
	 * 
     * @param deviceId   			the device phone number for which the call is made
     * @param callee     			the called number
     * @param autoAnswer 			automatic answer on make call
	 * @param inhibitProgressTone 	allows to inhibit the progress tone on the current external call
	 * @param associatedData 		correlator data to add to the call
	 * @param callingNumber 		calling number to present to the public network
     * @param loginName  			the login name
	 */
	public async makeCallEx(deviceId: string, callee: string, autoAnswer: boolean = true, inhibitProgressTone = false, associatedData: string = null, callingNumber: string = null, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makeCallEx(deviceId, callee, autoAnswer, inhibitProgressTone, associatedData, callingNumber, loginName);
	}

	/**
	 * Initiates a new private call to another user (the callee), using a pin code and an optional secret code.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * The private call is a service which allows a user to specify that the external call made is personal and not professional.The charging for this
	 * type of call can then be given specific processing.
	 * <p>
	 * Use the 'makePrivateCall' service to initiated a private call from one of the devices of the logged user. First, the call server initiates a 
	 * call on the user 'deviceId'. Then when the call is answered the call server starts the call to the 'callee'.
	 * an {@link ON_CALL_CREATED} is raised.
	 * <p>
	 * The private call requires the user enters a PIN code (Personal Identification Number). 
	 * 
     * @param deviceId   			the device phone number for which the call is made
     * @param callee     			the called number
	 * @param pin 					the PIN code to identify the caller
	 * @param secretCode 			the optional secret code used to confirm the PIN code
     * @param loginName  			the login name
	 */
	public async makePrivateCall(deviceId: string, callee: string, pin: string, secretCode: string = null, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makePrivateCall(deviceId, callee, pin, secretCode, loginName);
	}

	/**
	 * Initiates a new business call to another user (the callee), using the specified business code.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * Use the 'makeBusinessCall' service to initiated a business call from one of the devices of the logged user. First, the call server initiates a 
	 * call on the user 'deviceId'. Then when the call is answered the call server starts the call to the 'callee'.
	 * an {@link ON_CALL_CREATED} is raised.
	 * <p>
	 * 
     * @param deviceId   			the device phone number for which the call is made
     * @param callee     			the called number
	 * @param businessCode 			the cost center on which the call will be charged
	 * @param loginName 			the login name
	 */
	public async makeBusinessCall(deviceId: string, callee: string, businessCode: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makeBusinessCall(deviceId, callee, businessCode, loginName);
	}

	/**
	 * Initiates a call from a CCD agent to a supervisor.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * Use the 'makeSupervisorCall' service to initiated to initiated a call from an agent to a supervisor. First, the call server initiates a 
	 * call on the agent 'deviceId'. Then, when the call is answered the call server calls the supervisor.
	 * an {@link ON_CALL_CREATED} is raised.
	 * <p>
	 * 
     * @param deviceId   			the device phone number for which the call is made
     * @param autoAnswer 			automatic answer on make call
	 * @param loginName 			the login name
	 */
	public async makeSupervisorCall(deviceId: string, autoAnswer: boolean = true, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makeSupervisorCall(deviceId, autoAnswer, loginName);
	}

	/**
	 * Initiates an enquiry call from a CCD agent to a pilot or a RSI point.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * Use the 'makePilotOrRSISupervisedTransferCall' service to initiated an enquiry call to a CCD pilot or an RSI point from a CCD operator. 
	 * <p>
	 * The CCD pilot or the RSI point performs a call distribution to select an agent that will be alerted by this call. The 'callProfile' is mandatory
	 * in case of "Advanced Call Routing" call distribution strategy.
	 * 
     * @param deviceId   			the device phone number for which the call is made
	 * @param pilot 				called CCD pilot or RSI point number
	 * @param associatedData 		correlator data to add to the call
	 * @param callProfile 			The call profile associated to this call
	 * @param loginName 			the login name
	 */
	public async makePilotOrRSISupervisedTransferCall(deviceId: string, pilot: string, associatedData: string = null, callProfile: AcrSkill[] = null, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.makePilotOrRSISupervisedTransferCall(deviceId, pilot, associatedData, callProfile, loginName);
	}

	/**
	 * Initiates an local call to a CCD pilot or a RSI point.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
	 * <p>
	 * Use the 'makePilotOrRSICall' service to initiated a local call to a CCD pilot or an RSI point. 
	 * <p>
	 * The CCD pilot or the RSI point performs a call distribution to select an agent that will be alerted by this call. The 'callProfile' is mandatory
	 * in case of "Advanced Call Routing" call distribution strategy.
	 * 
     * @param deviceId   			the device phone number for which the call is made
	 * @param pilot 				called CCD pilot or RSI point number.
     * @param autoAnswer 			automatic answer on make call
	 * @param associatedData 		correlator data to add to the call
	 * @param callProfile 			The call profile associated to this call
	 * @param loginName 			the login name
	 */
	public async makePilotOrRSICall(deviceId: string, pilot: string, autoAnswer: boolean = true, associatedData: string = null, callProfile: AcrSkill[] = null, loginName: string = null): Promise<boolean> { 
		return null;
	}
	
    /**
     * Puts an active call on hold and retrieve a call that has been previously put
     * in hold.
     * <p>
     * If the session is opened by a user, the device phone number must be one of
     * the user.
     * 
     * @param callRef  the call reference of the call on hold
     * @param deviceId the device phone number for which the operation is done
     */
	 public async alternate(callRef: string, deviceId: string):  Promise<boolean> { 
		return await this._telephonyRest.alternate(callRef, deviceId);
	}

    /**
     * Answers to an incoming ringing call specified by it reference.
     * <p>
     * If the session is opened by a user, the device phone number must be one of
     * the user.
     * <p>
     * Answering a call will fail if the call state is not correct. The state can be
     * checked by listening to the telephony events, and more specifically by
     * checking the capabilities of the involved leg. (answer capability on the
     * leg).
     * 
     * @param callRef  the call reference of the call on hold
     * @param deviceId the device phone number for which the operation is done
     */
	 public async answer(callRef: string, deviceId: string):  Promise<boolean> { 
		return await this._telephonyRest.answer(callRef, deviceId);
	}
	
    /**
     * Associates data to a previously established call.
     * <p>
     * If the session is opened by a user, the device phone number must be one of
     * the user.
     * 
     * @param callRef        the call reference of the call on hold
     * @param deviceId       the device phone number for which the operation is done
     * @param associatedData the associated data
     */
	public async attachData(callRef: string, deviceId: string, associatedData: string):  Promise<boolean> { 
		return await this._telephonyRest.attachData(callRef, deviceId, associatedData);
	}

    /**
     * Transfers the active call to another user, without keeping control on this
     * call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef    the reference of the active call
     * @param transferTo the phone number to which the call is transfered
     * @param anonymous  anonymous transfer if this parameter is 'true', the
     *                   call will be transfered as anonymous
     * @param loginName  the login name
     */
	 public async blindTransfer(callRef: string, transferTo: string, anonymous: boolean = false, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.blindTransfer(callRef, transferTo, anonymous, loginName);
	}

    /**
     * Requests a callback on the call specified by the call reference for the
     * specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param loginName the login name
     */
	 public async callback(callRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.callback(callRef, loginName);
	}

    /**
     * Returns the legs involved by the call specified by the call reference for the
     * specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param loginName the login name
     */
	 public async getDeviceLegs(callRef: string, loginName: string = null):  Promise<Leg[]> { 
		return await this._telephonyRest.getDeviceLegs(callRef, loginName);
	}

    /**
     * Returns the leg specified by its id, involved by the call specified by the
     * call reference for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param legId     the leg identifier
     * @param loginName the login name
     */
	 public async getDeviceLeg(callRef: string, legId: string, loginName: string = null):  Promise<Leg> { 
		return await this._telephonyRest.getDeviceLeg(callRef, legId, loginName);
	}

    /**
     * Exits from the call specified by its reference for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * <p>
     * if the call is a single call, it is released; if it is a conference, the call
     * carries on without the user.
     * 
     * @param callRef   the call reference
     * @param loginName the login name for whom the drop is done
     */
	 public async dropme(callRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.dropme(callRef, loginName);
	}

    /**
     * Puts on hold the call specified by its reference, on the specified device,
     * for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param deviceId  the device phone number from which the call put on hold
     * @param loginName the login name
     */
	 public async hold(callRef: string, deviceId: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.hold(callRef, deviceId, loginName);
	}

    /**
     * Makes a 3-party conference with a specified active call and a specified held
     * call for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef     the active call reference
     * @param heldCallRef the held call reference
     * @param loginName   the login name
     */
	 public async merge(callRef: string, heldCallRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.merge(callRef, heldCallRef, loginName);
	}

    /**
     * Redirects an outgoing ringing call specified by its reference to the voice
     * mail of the called user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the ringing call reference
     * @param loginName the login name
     */
	 public async overflowToVoiceMail(callRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.overflowToVoiceMail(callRef, loginName);
	}
	
    /**
     * Gets the telephonic state and capabilities for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getState(loginName: string = null):  Promise<TelephonicState> { 
		return await this._telephonyRest.getState(loginName);
	}
	
    /**
     * Parks the specified active call to a target device. If the device is not
     * provided, the call will be parked on the current device.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the active call reference
     * @param parkTo    the target device
     * @param loginName the login name
     */
	 public async park(callRef: string, parkTo: string = null, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.park(callRef, parkTo, loginName);
	}

    /**
     * Returns the list of participants in the specified call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the call reference
     * @param loginName the login name
     */
	 public async getParticipants(callRef: string, loginName: string = null):  Promise<Participant[]> { 
		return await this._telephonyRest.getParticipants(callRef, loginName);
	}
	
    /**
     * Returns the specified participant in the specified call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef       the call reference
     * @param participantId the participant identifier
     * @param loginName     the login name
     */
	 public async getParticipant(callRef: string, participantId: string, loginName: string = null):  Promise<Participant> { 
		return await this._telephonyRest.getParticipant(callRef, participantId, loginName);
	}

    /**
     * Drops the specified participant from the specified call for the specified
     * user.
     * <p>
     * If the call is a single call, it is released; if it is a conference, the call
     * carries on without the participant.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef       the call reference
     * @param participantId the participant identifier
     * @param loginName     the login name
     */
	 public async dropParticipant(callRef: string, participantId: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.dropParticipant(callRef, participantId, loginName);
	}

    /**
     * Releases the current call (active or ringing) to retrieve a previously put in
     * hold call (cancel a consultation call).
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef        the held call reference
     * @param deviceId       the device phone number for which the operation is done
     * @param enquiryCallRef the reference of the enquiry call to cancel
     * @param loginName      the login name
     */
	 public async reconnect(callRef: string, deviceId: string, enquiryCallRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.reconnect(callRef, deviceId, enquiryCallRef, loginName);
	}

    /**
     * Starts, stops, pauses or resumes the recording of a the specified call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef   the reference of the recorded call
     * @param action    the recording action
     * @param loginName the login name
     */
	 public async doRecordAction(callRef: string, action: RecordingAction, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.doRecordAction(callRef, action, loginName);
	}

    /**
     * Redirects an incoming ringing call to another user or number, instead of
     * responding to it. If 'redirectTo' is equal to 'VOICEMAIL',
     * redirect the incoming ringing call to the user voice mail.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef    the incoming ringing call reference
     * @param redirectTo Phone number of the redirection, or "VOICEMAIL"
     * @param anonymous  anonymous redirection if this parameter is 'true',
     *                   the call will be redirected as anonymous
     * @param loginName  the login name
     */
	 public async redirect(callRef: string, redirectTo: string, anonymous: boolean = false, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.redirect(callRef, redirectTo, anonymous, loginName);
	}

    /**
     * Retrieves a call that has been previously put in hold.
     * <p>
     * This method with return {@code false} if it is invoked from a session opened
     * by an administrator.
     * 
     * @param callRef  the held call reference
     * @param deviceId the device phone number for which the operation is done
     */
	 public async retrieve(callRef: string, deviceId: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.retrieve(callRef, deviceId, loginName);
	}

    /**
     * Sends DTMF codes on the specified active call.
     * 
     * @param callRef  the active call reference
     * @param deviceId the device phone number for which the operation is done
     * @param number   the DTMF codes to send
     */
	 public async sendDtmf(callRef: string, deviceId: string, number: string):  Promise<boolean> { 
		return await this._telephonyRest.sendDtmf(callRef, deviceId, number);
	}

    /**
     * Sends the account info for the specified call, on the specified device.
     * <p>
     * This operation is used by a CCD agent to send the transaction code at the end
     * of the call. The string value MUST complain with the transaction code
     * accepted by OXE (that is numerical value only)
     * 
     * @param callRef     the call reference
     * @param deviceId    the device phone number for which the operation is done
     * @param accountInfo the transaction code
     */
	 public async sendAccountInfo(callRef: string, deviceId: string, accountInfo: string):  Promise<boolean> { 
		return await this._telephonyRest.sendAccountInfo(callRef, deviceId, accountInfo);
	}

    /**
     * Transfers a specified active call to a specified held call for the specified
     * user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callRef     the active call reference
     * @param heldCallRef the held call reference
     * @param loginName   the login name
     */
	 public async transfer(callRef: string, heldCallRef: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.transfer(callRef, heldCallRef, loginName);
	}

    /**
     * Logs the specified user on a specified desk sharing set.
     * <p>
     * The user must be configured as a Desk sharing user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param dssDeviceNumber the desk sharing set phone number
     * @param loginName       the login name
     * @see {@link deskSharingLogOff}
     */
	 public async deskSharingLogOn(dssDeviceNumber: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.deskSharingLogOn(dssDeviceNumber, loginName);
	}

    /**
     * Logs off the specified user from the desk sharing set.
     * <p>
     * The user must be configured as a Desk sharing user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     * @see {@link deskSharingLogOn}
     */
	 public async deskSharingLogOff(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.deskSharingLogOff(loginName);
	}

    /**
     * Gets states of all devices of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getDevicesState(loginName: string = null):  Promise<DeviceState[]> { 
		return await this._telephonyRest.getDevicesState(loginName);
	}

    /**
     * Gets state of the specified device of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param deviceId  the device phone number for which the operation is done
     * @param loginName the login name
     */
	 public async getDeviceState(deviceId: string, loginName: string = null):  Promise<DeviceState> { 
		return await this._telephonyRest.getDeviceState(deviceId, loginName);
	}

    /**
     * Picks up the specified incoming call for another user.
     * 
     * @param deviceId         the device phone number for which the operation is
     *                         done
     * @param otherCallRef     reference of the call to pickup (on the remote user)
     * @param otherPhoneNumber the phone number on which the call is ringing
     * @param autoAnswer       'true' to automatically answer the call after
     *                         the pickup.
     */
	 public async pickUp(deviceId: string, otherCallRef: string, otherPhoneNumber: string, autoAnswer: boolean = false):  Promise<boolean> { 
		return await this._telephonyRest.pickUp(deviceId, otherCallRef, otherPhoneNumber, autoAnswer);
	}

    /**
     * Performs an intrusion in the active call of a called user.
     * <p>
     * No parameter is required to invoke the intrusion: it only depends on the
     * current capability intrusion of the current device. It is based on the fact
     * that the current device must be in releasing state while calling a user which
     * is in busy call with another user, the current device has the intrusion
     * capability and the 2 users engaged in the call have the capability to allow
     * intrusion.
     * </p>
     * 
     * @param deviceId the device from where the unpark request is requested.
     * @since O2G 2.4
     */
	 public async intrusion(deviceId: string):  Promise<boolean> { 
		return await this._telephonyRest.intrusion(deviceId);
	}

    /**
     * UnParks a call from a target device.
     * 
     * @param heldCallRef Reference of the held call.
     * @param deviceId    the device from where the unpark request is requested.
     */
	 public async unPark(deviceId: string, heldCallRef: string):  Promise<boolean> { 
		return await this._telephonyRest.unPark(deviceId, heldCallRef);
	}

    /**
     * Retrieves the specified user hunting group status.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getHuntingGroupStatus(loginName: string = null):  Promise<HuntingGroupStatus> { 
		return await this._telephonyRest.getHuntingGroupStatus(loginName);
	}

    /**
     * Logs on the specified user in his current hunting group.
     * <p>
     * The user must be configured as member of a hunting group.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async huntingGroupLogOn(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.huntingGroupLogOn(loginName);
	}

    /**
     * Logs off the specified user from his current hunting group.
     * <p>
     * The user must be configured as member of a hunting group.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async huntingGroupLogOff(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.huntingGroupLogOff(loginName);
	}

    /**
     * Sets the specified user as member of an existing hunting group.
     * <p>
     * The request will fail if the hunting group does not exist. If the user
     * already belongs to the group, nothing is done and 'true' is returned.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param hgNumber  the hunting group number
     * @param loginName the login name
     */
	 public async addHuntingGroupMember(hgNumber: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.addHuntingGroupMember(hgNumber, loginName);
	}

    /**
     * Removes the specified user from an existing hunting group.
     * <p>
     * The request will fail if the hunting group does not exist. If the user does
     * not belong to the group, nothing is done and 'true' is returned.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param hgNumber  the hunting group number
     * @param loginName the login name
     */
	 public async deleteHuntingGroupMember(hgNumber: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.deleteHuntingGroupMember(hgNumber, loginName);
	}

    /**
     * Gets the list of hunting groups existing on the OXE node the specified user
     * belongs to.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async queryHuntingGroups(loginName: string = null):  Promise<HuntingGroups> { 
		return await this._telephonyRest.queryHuntingGroups(loginName);
	}

    /**
     * Returns the list of callback requests for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getCallbacks(loginName: string = null):  Promise<Callback[]> { 
		return await this._telephonyRest.getCallbacks(loginName);
	}

    /**
     * Deletes all callback requests for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async deleteCallbacks(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.deleteCallbacks(loginName);
	}

    /**
     * Deletes the specified callback requests for the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callbackId the callback identifier
     * @param loginName the login name
     */
	 public async deleteCallback(callbackId: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.deleteCallback(callbackId, loginName);
	}

    /**
     * Returns the current new message for the specified user.
     * <p>
     * As soon as a message is read, it is erased from OXE and cannot be read again.
     * The messages are retrieved in Last In First Out mode.
     * <p>
     * This method with return 'false' if all the messages have been
     * retrieved.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param loginName the login name
     */
	 public async getMiniMessage(loginName: string = null):  Promise<MiniMessage> { 
		return await this._telephonyRest.getMiniMessage(loginName);
	}

    /**
     * Sends the specified mini message to the specified recipient.
     * 
     * @param recipient the recipient of the mini message phone number
     * @param message   the mini message text
     *                  <p>
     *                  If the session has been opened for a user, the
     *                  'loginName' parameter is ignored, but it is mandatory
     *                  if the session has been opened by an administrator.
     * 
     * @param loginName the login name
     */
	 public async sendMiniMessage(recipient: string, message: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.sendMiniMessage(recipient, message, loginName);
	}

    /**
     * Requests for call back from an idle device of the specified user.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored, but it is mandatory if the session has been opened by an
     * administrator.
     * 
     * @param callee    phone number of the called party for which a call back is
     *                  requested.
     * @param loginName the login name
     */
	 public async requestCallback(callee: string, loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.requestCallback(callee, loginName);
	}
	
    /**
     * Asks a snapshot event on the specified user.
     * <p>
     * The event OnTelephonyState will contain the TelephonicState (calls[] and
     * deviceCapabilities[]). If a second request is asked since the previous one is
     * still in progress, it has no effect.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is
     * ignored.
     * 
     * @param loginName the login name
     */
	 public async requestSnapshot(loginName: string = null):  Promise<boolean> { 
		return await this._telephonyRest.requestSnapshot(loginName);
	}

}