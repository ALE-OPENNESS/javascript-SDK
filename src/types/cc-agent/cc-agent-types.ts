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

import { OperatorDynamicState } from "./operator-dyn-state";
import { OperatorMainState } from "./operator-main-state";
import { OperatorType } from "./operator-type";

/**
 * AgentSkill class represents a CCD operator skill. Skills are use by
 * the "Advanced Call Routing" call distribution strategy.
 */
 export type AgentSkill = {

    /**
     * The skill number. A unique identifier of this skill.
     */
    number: number;

    /**
     * Returns the skill level.
     */
    level: number;

    /**
     * Whether the skill is active.
     */
    active: boolean;
}


/**
 * AgentGroups represents the group configuration of a CCD operator. The
 * list of groups the operator is attaching in and the preferred group.
 */
 export type AgentGroups = {
    /**
     * The preferred agent group.
     */
    preferred: string;

    /**
     * The agent groups the operator is attaching in.
     */
    groups : string[];
 }


/**
 * OperatorConfiguration class represents a CCD operator configuration.
 */
 export type OperatorConfig = {

    /**
     * The type of CCD operator, agent or supervisor.
     */
    type: OperatorType;

    /**
     * The associated pro-acd station.
     */
    proacd: string,

    /**
     * The agents groups the operator is attached in and the preferred agent group if any.
     */
    groups: AgentGroups;

    /**
     * Whether the operator can choose his agent group.
     */
    selfAssign: boolean;

    /**
     * The operator skills.
     */
    skills: Map<number, AgentSkill>;

    /**
     * Whether the operator has the headset feature configured.
     * <p>
     * The headset feature allows a CCD operator to answer calls using a headset.
     */
    headset: boolean;

    /**
     * Whether the operator can request help from a supervisor.
     */
    help: boolean;

    /**
     * Whether the operator is multiline.
     */
    multiline: boolean;

};

/**
 * OperatorState represents the state of a CCD operator.
 */
 export type OperatorState = {

    /**
     * The operator static state.
     */
    mainState : OperatorMainState;

    /**
     * The operator dynamic state.
     */
    subState : OperatorDynamicState;

    /**
     * The pro-acd this operator is logged on.
     */
    proAcdDeviceNumber : string;

    /**
     * The agent group this operator is logged in.
     */
    pgNumber : string;

    /**
     * Returns the withdraw reason.
     * <p>
     * An int value that represents the withdraw reason index in the withdraw reasons managed in an agent group, 
     * or a 'null' value if the operator in not in withdraw state.
     */
    withdrawReason? : number;

    /**
     * Whether the operator is in withdraw state.
     */
    withdraw : boolean;
}

/**
 * WithdrawReason represents a reason why an agent is in withdraw state.
 * This reason is uses by CCD for statistic purpose.
 */
 export type WithdrawReason = {

    /**
     * The index of this withdraw reason.
     */
    index: number;

    /**
     * The label of this withdraw reason.
     */
     label: string;
}