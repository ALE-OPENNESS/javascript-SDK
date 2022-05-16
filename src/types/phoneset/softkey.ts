/*
* Copyright 2022 ALE International
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

import {DeviceKey} from "./device-key";

/**
 * SoftKey class represents a software key on an OmniPcx Enterprise device.
 */
export class SoftKey extends DeviceKey {

    /**
     * Construct a new SoftKey with the specified parameters.
     * @param position the key position
     * @param number the associated number
     * @param mnemonic the key mnemonic
     */
    constructor(position: number, number: string, mnemonic: string = null) {
        super(position, number, mnemonic);
    }

    /**
     * @ignore
     */
    public static build(pkey: any): SoftKey {
        return new SoftKey(pkey.position, pkey.number, pkey.mnemonic);
    }
}