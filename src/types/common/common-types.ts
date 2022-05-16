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
 * MainType represents the main type a participant can be.
 */
export enum MainType {

    /**
     * The participant is a user of the system.
     */
    USER = 'USER',

    /**
     * The participant is a device of the system.
     */
    DEVICE = 'DEVICE',

    /**
     * The participant is a service of the system. For exemple the voice mail.
     */
    SERVICE = 'SERVICE',

    /**
     * The participant is not a user of the system.
     */
    EXTERNAL = 'EXTERNAL',

    /**
     * The participant type has not been identified.
     */
    UNKNOWN = 'UNKNOWN' 
}

/**
 * Identifier represents the information used to uniquely identify a participant; either the login name or the phone number.
 */
 export type Identifier = {
    loginName: string;
    phoneNumber: string;
}

/**
 * PartyInfo represents a party involved in a call.
 */
export type PartyInfo = {

    /**
     * This participant's identifier; Either the login name or the phone number.
     */
    id: Identifier;

    /**
     * This participant's first name.
     */
    firstName: string;

    /**
     * This participant's last name.
     */
    lastName: string;

    /**
     * This participant's display name.
     * If 'firstName' and 'lastName' are filled, the 'displayName' is 'null'.
     */
    displayName: string;

    /**
     * This participant's type.
     */
    type: {

        /**
         * The main type.
         */
        main: MainType;

        /**
         * The sub-type.
         */
        subType: string;
    }
}