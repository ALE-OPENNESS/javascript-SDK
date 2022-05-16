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

/**
 * TelFacility represents the telephonic facilities.
 */
 export enum TelFacility {
    
    CallingLineIdentificationPresentation = "CallingLineIdentificationPresentation",
    ConnectedLineIdentificationPresentation = "ConnectedLineIdentificationPresentation",
    CallingLineIdentificationRestriction = "CallingLineIdentificationRestriction",
    ConnectedLineIdentificationRestriction = "ConnectedLineIdentificationRestriction",
    MaliciousCallIdentification = "MaliciousCallIdentification",
    CallForwardingUnconditional = "CallForwardingUnconditional",
    CallForwardingOnBusy = "CallForwardingOnBusy",
    CallForwardingOnNoReply = "CallForwardingOnNoReply",
    Transfer = "Transfer",
    AdviceOfChargeAtSetup = "AdviceOfChargeAtSetup",
    AdviceOfChargeDuringCall = "AdviceOfChargeDuringCall",
    AdviceOfChargeAtEnd = "AdviceOfChargeAtEnd",
    ClosedUserGroup = "ClosedUserGroup",
    CallWaiting = "CallWaiting",
    UserToUserSignalling = "UserToUserSignalling",
    UserToUserFacility = "UserToUserFacility",
    TerminalPortability = "TerminalPortability",
    Interception = "Interception",
    Booking = "Booking",
    CampOn = "CampOn",
    Conference = "Conference",
    MiniMessaging = "MiniMessaging",
    Subaddressing = "Subaddressing",
    BasicCall = "BasicCall",
    OperatorFacility = "OperatorFacility",
    Substitution = "Substitution",
    PriorityIncomingCall = "PriorityIncomingCall",
    Transit = "Transit",
    PrivateOverflowToPublic = "PrivateOverflowToPublic",
    ReroutingPublicToPrivate = "ReroutingPublicToPrivate",
    FaxServer = "FaxServer",
    VoiceMail = "VoiceMail",
    CentralAbbreviatedNumbering = "CentralAbbreviatedNumbering",
    IndividualAbbreviatedNumbering = "IndividualAbbreviatedNumbering",
    IntegratedServiceVirtualPrivateNetwork = "IntegratedServiceVirtualPrivateNetwork",
    OverflowVirtualPrivateNetwork = "OverflowVirtualPrivateNetwork",
    ARSService = "ARSService",
    DISA = "DISA",
    None = "None"    
}
