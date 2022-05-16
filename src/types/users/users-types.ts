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
 * Define the device type
 */
 export enum DeviceType {

    /**
     * The device is a DECT device
     */
    DECT = 'DECT',

    /**
     * The device is a deskphone 
     */
    DESKPHONE = 'DESKPHONE',

    /**
     * The device is a mobile device
     */
    MOBILE = 'MOBILE',

    /**
     * The device is a softphone 
     */
    SOFTPHONE = 'SOFTPHONE'
}

/**
 * Device represents a device of a user.
 */
export type Device = {

    /**
     * The device type
     */
    type: DeviceType;

    /**
     * The device identifier which is used to identify the device in telephony requests and events.
     */
    id: string;

    /**
     * The device sub-type. When set, the device sub-type provide information about the device model.
     */
    subType?: string;
}

/**
 * The type of voice mail a user can have
 */
export enum VoicemailType {

    /**
     * Internal 4635 voice mail.
     */
    VM_4635 = 'VM_4635',

    /**
     * Internal 4645 voice mail.
     */
    VM_4645 = 'VM_4645',

    /**
     * External voice mail.
     */
    EXTERNAL = 'EXTERNAL'
 
}


export type User = {

    /**
     * The user company phone. This company phone number is the phone
     * number of the main device when the user has a multi-device configuration.
     */
    companyPhone: string;

    /**
     * The user's first name.
     */
    firstName: string;

    /**
     * The user's last name.
     */
    lastName: string,

    /**
     * The user's login.
     */
    loginNmae: string;

    /**
     * The user's voice mail information.
     */
    voicemail: {
        /**
         * The voice mail number.
         */
        number: string;

        /**
         * The voice mail type.
         */
        type: VoicemailType
    };

    /**
     * The user's devices.
     */
    devices: Device[];

    /**
     * The OmniPCX Enterprise node this user is configured on.
     */
    nodeId: number;
}


/**
 * Preferences represents the preferred settings of a user.
 */
export type Preferences = {

    /**
     * The preferred GUI language. This is the language the user prefers
     * when it uses an application with a graphical user interface.
     */
    guiLanguage: string;

    /**
     * The prefered OXE language. This is the language the user prefers when
     * it uses his phone set.
     */
    oxeLanguage: string;
}

/**
 * SupportedLanguages represents the languages supported by a user.
 * 
 * @see {@link Preferences}.
 */
export type SupportedLanguages = {

    /**
     * The supported languages.
     */
    supportedLanguages: string[];

    /**
     * The supported GUI languages.
     */
    supportedGuiLanguages: string[];
}