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

import { O2GPinCode } from "../../internal/types/phoneset/phoneset-types";
import { PinControl } from "./pin-control";

/**
 * Pin class represents a PIN (Personal Identification Number)
 * <p>
 * This service allows the user to announce that the call he is making is a personal (external) call and not a business call. 
 * Using pulse metering tickets, the company is then able to invoice this call again as a personal call.
 * <p>
 * This service can be applied to local users (employees) or visitors (in this case, the created user set is a virtual set without a physical address). 
 * <p>
 * To use this service, users must dial the personal prefix followed by the PIN No. and then the secret code followed by the external number. 
 * <p>
 * The Personal Identification Number is private and secret; only the administrator and, in certain cases, the pulse metering administrator may know it.
 */
export  class Pin {
    private _number: string;
    private _withSecretCode: boolean;
    private _control: PinControl;
    private _group: number;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Return the PIN number.
     */
    public get number(): string {
        return this._number;
    }

    /**
     * Return whether the PIN code request to be validated by the user secret code.
     */
    public get withSecretCode(): boolean {
        return this._withSecretCode;
    }

    /**
     * Return the access control this PIN code provide.
     */
    public get control(): PinControl {
        return this._control;
    }

    /**
     * Return the PIN group associatde to this PIN code.
     */
    public get group(): number {
        return this._group;
    }

    /**
     * @ignore
     */
     public static build(pin: O2GPinCode): Pin {

        let p: Pin = new Pin();
        p._number = pin.Pin_Number;
        p._withSecretCode = pin.With_Secret_Code;
        p._group = pin.Pin_Group;
        p._control = PinControl[pin.Pin_Type_Of_Control];

        return p;
    }

    /**
     * @ignore
     */
    public static from(pin: Pin): O2GPinCode {

        return {
            'Pin_Number': pin._number,
            'Pin_Group': pin._group,
            'With_Secret_Code': pin._withSecretCode,
            'Pin_Type_Of_Control': pin._control.toString()
        };
    }
}