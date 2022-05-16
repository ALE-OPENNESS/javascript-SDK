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

/**
 * DeviceKey class represents the base class for key on an OmniPCX Enterprise device.
 */
export class DeviceKey {

    protected _position: number;
    protected _number: string;
    protected _mnemonic: string;

    /**
     * Construct a new DeviceKey with the specified position, number and mnemonic.
     * @param position the key position on the device
     * @param number the phone number associated to this key
     * @param mnemonic the mnemonic associated to this key
     */
    constructor(position: number, number: string, mnemonic: string = null) {

        this._position = position;
        this._number = number;
        this._mnemonic = mnemonic;
    }

    /**
     * Returns the key position.
     */
    public get position(): number {
        return this._position;
    }

    /**
     * Returns the key associated number.
     */
    public get number(): string {
        return this._number;
    }

    /**
     * Returns the key mnemonic.
     */
    public get mnemonic(): string {
        return this._mnemonic;
    }
}