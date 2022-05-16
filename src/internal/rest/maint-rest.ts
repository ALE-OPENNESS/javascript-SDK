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
import { ServerAddress, SystemStatus, PbxStatus, License, ConfigurationType } from '../../types/maint/maint-types';


type O2GSystemStatus = {
    logicalAddress: ServerAddress;
    startDate: string;
    ha: boolean;
    primary: string;
    primaryVersion: string;
    secondary: string;
    secondaryVersion: string;
    pbxs: PbxStatus[];
    license: {
        lics: License[];
    };
    configurationType: string;
}

export default class MaintenanceRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getSystemStatus(): Promise<SystemStatus> { 

        let uriGet = UtilUri.appendPath(this._uri, "status");

        let o2gSystemStatus: O2GSystemStatus = this.getResult<O2GSystemStatus>(await RestService._httpClient.get(uriGet));
        if (o2gSystemStatus) {

            return {
                "logicalAddress": o2gSystemStatus.logicalAddress,
                "startDate": new Date(o2gSystemStatus.startDate),
                "haMode": o2gSystemStatus.ha,
                "primary": o2gSystemStatus.primary,
                "primaryVersion": o2gSystemStatus.primaryVersion,
                "secondary": o2gSystemStatus.secondary,
                "secondaryVersion": o2gSystemStatus.secondaryVersion,
                "pbxs": o2gSystemStatus.pbxs,
                "licenses": o2gSystemStatus.license.lics,
                "configurationType": ConfigurationType[o2gSystemStatus.configurationType]
            };
        }
        else {
            return null;
        }
	}
}