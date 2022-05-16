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

import {RestService} from './rest-service'
import UtilUri from "../util/util-uri";
import AssertUtil from "../util/assert";
import HttpContent from '../util/http-content';
import {ProgrammableKey} from '../../types/phoneset/programmable-key';
import {SoftKey} from '../../types/phoneset/softkey';
import {Pin} from '../../types/phoneset/pin';
import { DynamicState } from '../../types/phoneset/phoneset-types';
import {O2GPinCode} from '../types/phoneset/phoneset-types';
import { Device } from '../../types/users/users-types';


type DeviceList = {
    devices: Device[];
}

type ProgrammableKeyList = {
    pkeys: ProgrammableKey[];
}

type SoftKeyList = {
    skeys: SoftKey[];
}

export default class PhoneSetProgrammingRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getDevices(loginName: string): Promise<Device[]> {

        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.notNullOrEmpty(loginName, "loginName"), "devices");

        let devices: DeviceList = this.getResult<DeviceList>(await RestService._httpClient.get(uriGet));
        if (devices) {
            return devices.devices;
            
        }
        else {
            return null;
        }
    }

    public async getDevice(loginName: string, deviceId: string): Promise<Device>  {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"));

        return this.getResult<Device>(await RestService._httpClient.get(uriGet));
    }

    public async getProgrammableKeys(loginName: string, deviceId: string): Promise<ProgrammableKey[]> {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "programmeableKeys");

        let pkeys: ProgrammableKeyList = this.getResult<ProgrammableKeyList>(await RestService._httpClient.get(uriGet));
        if (pkeys && pkeys.pkeys) {
            return pkeys.pkeys;
            
        }
        else {
            return null;
        }
    }

    public async getProgrammedKeys(loginName: string, deviceId: string): Promise<ProgrammableKey[]> {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "programmedKeys");

        let pkeys: ProgrammableKeyList = this.getResult<ProgrammableKeyList>(await RestService._httpClient.get(uriGet));
        if (pkeys && pkeys.pkeys) {
            return pkeys.pkeys;
        }
        else {
            return null;
        }
    }

    public async setProgrammableKey(loginName: string, deviceId: string, key: ProgrammableKey): Promise<boolean> {

        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "programmeableKeys",
            AssertUtil.positiveStrict(AssertUtil.notNull(key, "key").position, "key.position").toString());

        let json = JSON.stringify(key);

        var httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async deleteProgrammableKey(loginName: string, deviceId: string, position: number): Promise<boolean> {

        let uriDelete = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "programmeableKeys",
            AssertUtil.positiveStrict(position, "position").toString());

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    public async getSoftKeys(loginName: string, deviceId: string): Promise<SoftKey[]> {
 
        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "softKeys");

        let skeys: SoftKeyList = this.getResult<SoftKeyList>(await RestService._httpClient.get(uriGet));
        if (skeys && skeys.skeys) {
            return skeys.skeys;
        }
        else {
            return null;
        }
   }

   public async setSoftKey(loginName: string, deviceId: string, key: SoftKey): Promise<boolean> {
    
        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "softKeys",
            AssertUtil.positiveStrict(AssertUtil.notNull(key, "key").position, "key.position").toString());

        let json = JSON.stringify(key);

        var httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }

    public async deleteSoftKey(loginName: string, deviceId: string, position: number): Promise<boolean> {

        let uriDelete = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "softKeys",
            AssertUtil.positiveStrict(position, "position").toString());

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();
    }

    private async _doDeviceAction(loginName: string, deviceId: string, action: string, activate: boolean): Promise<boolean> {

        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            action);
        
        uriPut = UtilUri.appendQuery(uriPut, "activate", activate ? "true" : "false");

        var httpResponse = await RestService._httpClient.put(uriPut);
        return httpResponse.isSuccessStatusCode();
    }

    public async lockDevice(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "lock", true);
    }

    public async unlockDevice(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "lock", false);
    }

    public async enableCampon(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "campon", true);
    }
    
    public async disableCampon(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "campon", false);
    }
    
    public async getPinCode(loginName: string, deviceId: string): Promise<Pin> {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "pin");
        
        let pin: O2GPinCode = this.getResult(await RestService._httpClient.get(uriGet))
        if (pin) {
            return Pin.build(pin);
        }
        else {
            return null;
        }
    }
    
    public async setPinCode(loginName: string, deviceId: string, code: Pin): Promise<boolean> {

        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "pin");

        let json = JSON.stringify(Pin.from(code));

        var httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }
    
    public async getDynamicState(loginName: string, deviceId: string): Promise<DynamicState> {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "dynamicState");
        
        return this.getResult<DynamicState>(await RestService._httpClient.get(uriGet));
    }
    
    public async setAssociate(loginName: string, deviceId: string, associate: string): Promise<boolean> {
        
        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.notNullOrEmpty(loginName, "loginName"), 
            "devices",
            AssertUtil.notNullOrEmpty(deviceId, "deviceId"),
            "associate");

        let json = JSON.stringify({
            "associate": AssertUtil.notNullOrEmpty(associate, "associate")
        });

        var httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();
    }
    
    public async activateRemoteExtension(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "REActive", true);
    }
    
    public async deactivateRemoteExtension(loginName: string, deviceId: string): Promise<boolean> {
        return this._doDeviceAction(loginName, deviceId, "REActive", false);
    }


}