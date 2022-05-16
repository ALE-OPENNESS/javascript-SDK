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

import { Reason } from "./reason";
import { Role } from "./role"
import { PartyInfo } from "../common/common-types";


/**
 * ComRecordParticipant represents a participant referenced in a com
 * record.
 * <p><b><u>Record content</u></b>: For a <b>simple call</b> (user A calls user B), the
 * call record on each party will contain <u>both the participant A and the
 * participant B</u>: (no guaranty on the order of the participants on 2
 * successive responses).
 * <table>
 * <caption>Simple call</caption>
 * <tr>
 * <th>Side</th>
 * <th>Com record content</th>
 * </tr>
 * <tr>
 * <td>On A side</td>
 * <td>
 * <ul>
 * <li>Participant A (the owner of the record) with role=Caller and the
 * answered status (whether the call has been answered or not).</li>
 * <li>Participant B : neither the role nor the state is provided.</li>
 * </ul>
 * </td>
 * </tr>
 * <tr>
 * <td>On B side</td>
 * <td>
 * <ul>
 * <li>Participant A : neither the role nor the state is provided.</li>
 * <li>Participant B (the owner of the record) with role=Callee and the
 * answered status (whether the call has been answered or not)</li>
 * </ul>
 * </td>
 * </tr>
 * </table>
 * <p>
 * For a <b>re-routed call</b> (user A calls user B, the call is re-routed on
 * user C, caused by overflow, redirection or pickup), the record generated on
 * each side including the user B side (the "victim" of the re-routing) will not
 * contain as participant the user B itself because he was not the last
 * destination of the call:
 * <table>
 * <caption>Re-routed call</caption>
 * <tr>
 * <th>Side</th>
 * <th>Com record content</th>
 * </tr>
 * <tr>
 * <td>On A side</td>
 * <td>
 * <ul>
 * <li>Participant A : with role=Caller, the answered status,
 * initialCalled=B.</li>
 * <li>Participant C.</li>
 * </ul>
 * </td>
 * </tr>
 * <tr>
 * <td>On B side</td>
 * <td>
 * <ul>
 * <li>Participant A : neither the role nor the state is provided.</li>
 * <li>Participant C with role=Callee, the answered status (whether the
 * call has been answered or not) and initialCalled=B which tells B that he was
 * called by A but the call has been rerouted to C(with a reason) which answered
 * or not to the call</li>
 * </ul>
 * </td>
 * </tr>
 * <tr>
 * <td>On C side</td>
 * <td>
 * <ul>
 * <li>Participant A : neither the role nor the state is provided.</li>
 * <li>Participant C with role=Callee, the answered status (whether the
 * call has been answered or not) and initialCalled=B.</li>
 * </ul>
 * </td>
 * </tr>
 * </table>
 * <p>
 * Furthermore, for a multi-parties call using addParticipant, the already
 * connected users in the call will also received a call record which will
 * contain the answered status of the added participant: this information is
 * provided to distinguish the added participants which have really answered and
 * the other which decline the call.
 * <p><b><u>Identification of the participant</u></b>: In the comlog notification events,
 * the participant owner is identified only by its loginName (in order to reduce
 * the event call flow), the other participants are identified with their full
 * identity (loginName, phoneNumber).
 * <p>
 * In a {@link QueryResult} result:
 * <ul>
 * <li>if no optimization is asked, all the participants are identified with
 * their full identity.</li>
 * <li>If the 'optimized' parameter is set to 'true', only the first
 * occurence of a participant (owner or other) is identified with its full
 * identity. The following occurences are identified only with the
 * phonenumber.</li>
 * </ul>
 * 
 */
 export type ComRecordParticipant = {

    /**
     * The participant's role
     */
    role: Role;

    /**
     * Whether this participant has answered the call.
     */
    answered?: boolean;

    /**
     * Returns this participant's identity.
     */
    identity: PartyInfo;

    /**
     * Whether this participant is anonymous.
     */
    anonymous: boolean;

    /**
     * The number that has been initially called when this participant has
     * been entered in the call.
     */
    initialCalled: PartyInfo;

    /**
     * The reason why the call has been established, rerouted, terminated ...
     */
     reason: Reason;
}