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
import {Incident} from '../../types/analytics/incident';
import {ChargingFile} from '../../types/analytics/charging-file';
import {ChargingResult} from '../../types/analytics/charging-result';
import {TimeRange} from '../../types/analytics/time-range';
import { O2GChargingResult, O2GIncident } from '../types/analytics/o2ganalytics-types';
import { O2GChargingFile } from '../types/analytics/o2ganalytics-types';

type O2GChargingFileResult = {
    files: O2GChargingFile[];
}

type O2GIncidents = {
    incidents: O2GIncident[];
}

export default class AnalyticsRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }


    padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
      }
      
    _formatDateFilter(date: Date) {
        return [
            date.getFullYear(),
            (date.getMonth() + 1).toString().padStart(2, '0'),
            date.getDate().toString().padStart(2, '0')
        ].join('');
      }


    public async getIncidents(nodeId: number, last: number): Promise<Array<Incident>> {

        let uriGet = UtilUri.appendPath(this._uri, "incidents");
        uriGet = UtilUri.appendQuery(uriGet, "nodeId", AssertUtil.positive(nodeId, "nodeId").toString());

        if (last > 0) {
            uriGet = UtilUri.appendQuery(uriGet, "last", last.toString());
        }

        let o2gIncidentsResult = this.getResult<O2GIncidents>(await RestService._httpClient.get(uriGet));
        if (o2gIncidentsResult) {

            let o2gIncident: O2GIncident[] = o2gIncidentsResult.incidents;
            if (o2gIncident) {

                return o2gIncident.map((inc: O2GIncident) => Incident.build(inc));
            }
        }

        return null;
    }

    public async getChargingFiles(nodeId: number, filter: TimeRange): Promise<Array<ChargingFile>> {

        var uriGet = UtilUri.appendPath(this._uri, "charging", "files");
        uriGet = UtilUri.appendQuery(uriGet, "nodeId", AssertUtil.positive(nodeId, "nodeId").toString());

        if (filter) {
            uriGet = UtilUri.appendQuery(uriGet, "fromDate", this._formatDateFilter(filter.from));
            uriGet = UtilUri.appendQuery(uriGet, "toDate", this._formatDateFilter(filter.to));
        }

        let o2gChargingFilesResult = this.getResult<O2GChargingFileResult>(await RestService._httpClient.get(uriGet));
        if (o2gChargingFilesResult) {

            let o2gChargingFiles: O2GChargingFile[] = o2gChargingFilesResult.files;
            if (o2gChargingFiles) {

                return o2gChargingFiles.map((cf: O2GChargingFile) => ChargingFile.build(cf));
            }
        }

        return null;
    }

    public async getChargingsFromFilter(nodeId: number, filter: TimeRange, topResults: number, all: boolean): Promise<ChargingResult> {

        var uriGet = UtilUri.appendPath(this._uri, "charging");
        uriGet = UtilUri.appendQuery(uriGet, "nodeId", AssertUtil.positive(nodeId, "nodeId").toString());

        if (filter) {
            uriGet = UtilUri.appendQuery(uriGet, "fromDate", this._formatDateFilter(filter.from));
            uriGet = UtilUri.appendQuery(uriGet, "toDate", this._formatDateFilter(filter.to));
        }

        if (topResults) {
            uriGet = UtilUri.appendQuery(uriGet, "top", topResults.toString());
        }

        if (all) {
            uriGet = UtilUri.appendQuery(uriGet, "all", "true");
        }

        let o2gChargingResult: O2GChargingResult = this.getResult<O2GChargingResult>(await RestService._httpClient.get(uriGet));
        if (o2gChargingResult) {

            return ChargingResult.build(o2gChargingResult, filter);
        }
        else {
            return null;
        }
    }

    public async getChargingsFromFiles(nodeId: number, files: Array<ChargingFile>, topResults: number, all: boolean): Promise<ChargingResult> {

        var uriGet = UtilUri.appendPath(this._uri, "charging");
        uriGet = UtilUri.appendQuery(uriGet, "nodeId", AssertUtil.positive(nodeId, "nodeId").toString());
        uriGet = UtilUri.appendQuery(uriGet, "files", AssertUtil.notNull(files, "files").map((file: ChargingFile) => file.name).join(','));

        if (topResults) {
            uriGet = UtilUri.appendQuery(uriGet, "top", topResults.toString());
        }

        if (all) {
            uriGet = UtilUri.appendQuery(uriGet, "all", "true");
        }

        let o2gChargingResult: O2GChargingResult = this.getResult<O2GChargingResult>(await RestService._httpClient.get(uriGet));
        if (o2gChargingResult) {

            return ChargingResult.build(o2gChargingResult);
        }
        else {
            return null;
        }
    }
}