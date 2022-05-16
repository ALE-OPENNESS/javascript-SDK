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

import { IntrusionMode } from "./types/cc-agent/intrusion-mode";
import CallCenterAgentRest from "./internal/rest/ccAgent-rest";
import { OperatorConfig, OperatorState } from "./types/cc-agent/cc-agent-types";
import { WithdrawReason } from "./types/cc-agent/cc-agent-types";

/**
 * CallCenterAgent provides services for CCD operators. Using this
 * service requires having a <b>CONTACTCENTER_AGENT</b> license.
 */
export class CallCenterAgent {

    private _ccAgentRest: CallCenterAgentRest

    /**
     * Occurs when an agent state has changed.
     * @event
     */
    readonly ON_AGENT_STATE_CHANGED = "OnAgentStateChanged";

    /**
     * Occurs when an agent request help from his supervisor.
     * @see {@link requestPermanentListening}, {@link requestSupervisorHelp}
     * @event
     */
    readonly ON_SUPERVISOR_HELP_REQUESTED = "OnSupervisorHelpRequested";

    /**
     * Occurs when an agent has requested the assistance of his supervisor and when the request is canceled by the agent 
     * or when the request is rejected by the supervisor.
     * @see {@link cancelSupervisorHelpRequest}, {@link rejectAgentHelpRequest}
     * @event
     */
    readonly ON_SUPERVISOR_HELP_CANCELLED = "OnSupervisorHelpCancelled"

    /**
     * 
     * @internal
     */
    constructor(ccAgentRest: CallCenterAgentRest) {
        this._ccAgentRest = ccAgentRest;
	}

    /**
     * Gets the operator configuration.
     * @param loginName the operator login name
     * @returns 
     */
    public async getConfiguration(loginName: string = null): Promise<OperatorConfig> { 
		return await this._ccAgentRest.getConfiguration(loginName);
	}

    /**
     * Gets the specified agent or supervisor state.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName the operator login name
     */
    public async getState(loginName: string = null): Promise<OperatorState> { 
		return await this._ccAgentRest.getState(loginName);
	}

    /**
     * Logon an agent or a supervisor.
     * <p>
     * For a Supervisor, if the 'pgNumber' is omitted, the supervisor is logged on out off group.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param proAcdNumber the pro-acd device number
     * @param pgNumber     the agent processing group number
     * @param headset      activate the headset mode
     * @param loginName    the ccd operator login name.
     */
    public async logon(proAcdNumber: string, pgNumber: string = null, headset = false, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.logon(proAcdNumber, pgNumber, headset, loginName);
    }

    /**
     * Logoff an agent or a supervisor.
     * <p>This method does nothing an returns 'true" if the agent or the supervisor is already logged off.
     * 
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName    the ccd operator login name.
     */
    public async logoff(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.logoff(loginName);
    }

    /**
     * Enters in a agent group. Only for a supervisor.
     * <p>
     * This method is used by a supervisor to enter an agent group when it is in
     * pre-assigned state (logged but not in an agent group).
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param pgNumber  the agent processing group number
     * @param loginName the supervisor login name
     */
    public async enter(pgNumber: string, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.enter(pgNumber, loginName);
    }

    /**
     * Exits from an agent group. Only for a supervisor.
     * <p>
     * This method is used by a supervisor to leave an agent group an go back in
     * pre-assigned state (logged but not in an agent group).
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName the supervisor login name
     */
    public async exit(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.exit(loginName);
    }

    /**
     * Puts the specified agent in wrapup.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName the agent login name
     */
    public async setWrapup(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.setWrapup(loginName);
    }

    /**
     * Puts the specified agent in ready state.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName the agent login name
     */
    public async setReady(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.setReady(loginName);
    }
    
    /**
     * Puts the specified agent in pause.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param loginName the agent login name
     */
    public async setPause(loginName: string = null) {
        return await this._ccAgentRest.setPause(loginName);
    }
    
    /**
     * Requests to listen to the agent by a supervisor.
     * <p>
     * On success, an {@link ON_SUPERVISOR_HELP_REQUESTED} event is raised. for both the agent and the supervisor.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @param agentNumber the listened agent number
     * @param loginName   the supervisor login name
     */
    public async requestPermanentListening(agentNumber: string, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.requestPermanentListening(agentNumber, loginName);
    }
    
    /**
     * Requests intrusion in a ccd call.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param agentNumber   the extension number of the ccd agent who answers the
     *                      ccd call
     * @param intrusionMode the intrusion mode
     * @param loginName     the supervisor login name
     */
     public async requestIntrusion(agentNumber: string, intrusionMode = IntrusionMode.NORMAL, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.requestIntrusion(agentNumber, intrusionMode, loginName);
    }
    
    /**
     * Changes the intrusion mode.
     * <p>
     * Calling this method allows to change the intrusion mode, or to cancel an intrusion. To cancel an intrusion, the application must pass the current mode
     * in the 'newIntrusionMode' parameter.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param newIntrusionMode the new intrusion mode
     * @param loginName        the supervisor login name
     */
     public async changeIntrusionMode(newIntrusionMode: IntrusionMode, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.changeIntrusionMode(newIntrusionMode, loginName);
    }
    
    /**
     * Requests help of the supervisor.
     * <p>
     * On success, an {@link ON_SUPERVISOR_HELP_REQUESTED} event is raised for both the agent and supervisor.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param loginName the agent login name
     */
    public async requestSupervisorHelp(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.requestSupervisorHelp(loginName);
    }
    
    /**
     * Rejects an help request from an agent.
     * <p>
     * This method is invoked by a supervisor when he reject an help request from an agent. On success, an {@link ON_SUPERVISOR_HELP_CANCELLED} event is raised.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param agentNumber the extension number of the agent who has requested help
     * @param loginName   the supervisor login name
     */
    public async rejectAgentHelpRequest(agentNumber: string, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.rejectAgentHelpRequest(agentNumber, loginName);
    }
    
    /**
     * Cancels a supervisor help request.
     * <p>
     * This method is invoked by an agent when he want to cancel an help request. On success, an {@link ON_SUPERVISOR_HELP_CANCELLED} event is raised.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param supervisorNumber the requested supervisor extension number
     * @param loginName        the agent login name
     */
    public async cancelSupervisorHelpRequest(supervisorNumber: string, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.cancelSupervisorHelpRequest(supervisorNumber, loginName);
    }
    
    /**
     * Asks a snapshot event to receive an {@link ON_AGENT_STATE_CHANGED} event.
     * <p>
     * The {@link ON_AGENT_STATE_CHANGED} event contain the operator {@link  OperatorState} object. If a second
     * request is asked since the previous one is still in progress, it has no effect.
     * <p>
     * If an administrator invokes this method with loginName=null, the snapshot event request is done for all the agents. The event processing can
     * be long depending on the number of users.
     * 
     * @param loginName the agent login name
     */
    public async requestSnapshot(loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.requestSnapshot(loginName);
    }
    
    /**
     * Activates the specified skills.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * <p>
     * This method doesn't control the skills number. If a skill number is invalid
     * (not assigned to the operator), it is ignored and the method returns 'true'.
     * 
     * @param skills    the list of skills to activate.
     * @param loginName the agent login name
     */
    public async activateSkills(skillNumbers: number[], loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.activateSkills(skillNumbers, loginName);
    }
    
    /**
     * Deactivates the specified skills.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * <p>
     * This method doesn't control the skills number. If a skill number is invalid
     * (not assigned to the operator), it is ignored and the method returns 'true'.
     * 
     * @param skills    the list of skills to activate.
     * @param loginName the agent login name
     */
    public async deactivateSkills(skillNumbers: number[], loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.deactivateSkills(skillNumbers, loginName);
    }
    
    /**
     * Returns the list of withdraw reason for the specified processing group.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * 
     * @param pgNumber  the agent processing group number
     * @param loginName the agent login name
     */
     public async getWithdrawReasons(pgNumber: string, loginName: string = null): Promise<WithdrawReason[]> {
        return await this._ccAgentRest.getWithdrawReasons(pgNumber, loginName);
    }    


    /**
     * Withdraws an agent with the specified reason.
     * <p>
     * If the session has been opened for a user, the 'loginName' parameter is ignored, but it is mandatory if the session has been opened by an administrator.
     * @see {@link getWithdrawReasons}
     * 
     * @param reason    the withdraw reason
     * @param loginName the agent login name
     */
     public async setWithdraw(reason: WithdrawReason, loginName: string = null): Promise<boolean> {
        return await this._ccAgentRest.setWithdraw(reason, loginName);
    }
    
}