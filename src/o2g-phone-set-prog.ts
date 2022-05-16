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

import PhoneSetProgrammingRest from "./internal/rest/phone-set-prog-rest";
import { Device } from "./types/users/users-types";
import { DynamicState } from "./types/phoneset/phoneset-types";
import {Pin} from "./types/phoneset/pin";
import {ProgrammableKey} from "./types/phoneset/programmable-key";
import {SoftKey} from "./types/phoneset/softkey";

export class PhoneSetProgramming {

    private _phoneSetProgrRest: PhoneSetProgrammingRest;

    constructor(phoneSetProgrRest: PhoneSetProgrammingRest) {
        this._phoneSetProgrRest = phoneSetProgrRest;
	}

    public async getDevices(loginName: string): Promise<Device[]> {
        return this._phoneSetProgrRest.getDevices(loginName);
    }
    
    public async getDevice(loginName: string, deviceId: string): Promise<Device> {
        return this._phoneSetProgrRest.getDevice(loginName, deviceId);
    }
    
    public async getProgrammableKeys(loginName: string, deviceId: string): Promise<ProgrammableKey[]> {
        return this._phoneSetProgrRest.getProgrammableKeys(loginName, deviceId);
    }
    
    public async getProgrammedKeys(loginName: string, deviceId: string): Promise<ProgrammableKey[]> {
        return this._phoneSetProgrRest.getProgrammedKeys(loginName, deviceId);
    }
    
    public async setProgrammableKey(loginName: string, deviceId: string, key: ProgrammableKey): Promise<boolean> {
        return this._phoneSetProgrRest.setProgrammableKey(loginName, deviceId, key);
    }
    
    public async deleteProgrammableKey(loginName: string, deviceId: string, position): Promise<boolean> {
        return this._phoneSetProgrRest.deleteProgrammableKey(loginName, deviceId, position);
    }
    
    public async getSoftKeys(loginName: string, deviceId: string): Promise<SoftKey[]> {
        return this._phoneSetProgrRest.getSoftKeys(loginName, deviceId);
    }
    
    public async setSoftKey(loginName: string, deviceId: string, key: SoftKey): Promise<boolean> {
        return this._phoneSetProgrRest.setSoftKey(loginName, deviceId, key);
    }
    
    public async deleteSoftKey(loginName: string, deviceId: string, position: number): Promise<boolean> {
        return this._phoneSetProgrRest.deleteSoftKey(loginName, deviceId, position);
    }
    
    public async lockDevice(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.lockDevice(loginName, deviceId);
    }
    
    public async unlockDevice(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.unlockDevice(loginName, deviceId);
    }
    
    public async enableCampon(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.enableCampon(loginName, deviceId);
    }
    
    public async disableCampon(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.disableCampon(loginName, deviceId);
    }
    
    public async getPinCode(loginName: string, deviceId: string): Promise<Pin> {
        return this._phoneSetProgrRest.getPinCode(loginName, deviceId);
    }
    
    public async setPinCode(loginName: string, deviceId: string, code: Pin): Promise<boolean> {
        return this._phoneSetProgrRest.setPinCode(loginName, deviceId, code);
    }
    
    public async getDynamicState(loginName: string, deviceId: string): Promise<DynamicState> {
        return this._phoneSetProgrRest.getDynamicState(loginName, deviceId);
    }
    
    public async setAssociate(loginName: string, deviceId: string, associate: string): Promise<boolean> {
        return this._phoneSetProgrRest.setAssociate(loginName, deviceId, associate);
    }
    
    public async activateRemoteExtension(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.activateRemoteExtension(loginName, deviceId);
    }
    
    public async deactivateRemoteExtension(loginName: string, deviceId: string): Promise<boolean> {
        return this._phoneSetProgrRest.deactivateRemoteExtension(loginName, deviceId);
    }
}