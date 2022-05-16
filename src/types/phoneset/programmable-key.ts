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
 * ProgrammableKey class represents a programmable key on an OmniPCX Enterprise device.
 */
export class ProgrammableKey extends DeviceKey {

    private _locked: boolean;

    /**
     * Construct a new ProgrammableKey with the specified parameters.
     * @param position the key position
     * @param number the associated number
     * @param mnemonic the key mnemonic
     * @param locked 'true' if the key is locked, 'false' otherwise
     */
    constructor(position: number, number: string, mnemonic: string = null, locked: boolean = false) {
        super(position, number, mnemonic);

        this._locked = locked;
    }

    /**
     * Return whether this key is locked.
     */
    public get locked(): boolean {
        return this._locked;
    }

    /**
     * @ignore
     */
    public static build(pkey: any): ProgrammableKey {
        return new ProgrammableKey(pkey.position, pkey.number, pkey.mnemonic, pkey.locked);
    }
}