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

import AnalyticsRest from "./internal/rest/analytics-rest";
import {Incident} from "./types/analytics/incident";
import {ChargingFile} from "./types/analytics/charging-file";
import {ChargingResult} from "./types/analytics/charging-result";
import {TimeRange} from "./types/analytics/time-range";

/**
 * The Analytics service allows to retrieve OmniPCX entreprise charging information and incidents. 
 * <p>Using this service requires having a <b>ANALYTICS</b> license. This service requires an administrative login.
 * <p>
 * O2G uses SSH to get the information from an OmniPCX Enterprise node. So
 * <b>SSH must be enabled</b> on the OmniPCX Enterprise node to use this
 * service.
 */
export class Analytics {
    private _analyticsRest: AnalyticsRest

    /**
     * 
     * @internal 
     */
    constructor(analyticsRest: AnalyticsRest) {
        this._analyticsRest = analyticsRest;
	}

    /**
     * Returns a list of incidents from the specified OmniPCX Enterprise node.
     * @param nodeId the OmniPCX Enterprise node id
     * @param last the number of incidents to retrieve
     */
    async getIncidents(nodeId: number, last: number = 0): Promise<Array<Incident>> {
        return await this._analyticsRest.getIncidents(nodeId, last);
    }

    /**
     * Get the list of charging file from the specified node, using the time range filter.
     * @param nodeId the OmniPCX Enterprise node id
     * @param filter  time range filter
     * @see {@link getChargingsFromFiles}
     */
    async getChargingFiles(nodeId: number, filter: TimeRange = null): Promise<Array<ChargingFile>> {
        return await this._analyticsRest.getChargingFiles(nodeId, filter);
    }

    /**
     * Query the charging information for the specified node, using the specified options.
     * <p>
     * If 'all' is set to 'true', all the tickets are returned, including the zero cost ticket, and with the called party; If 'all' is
     * set to 'false', the total of charging info is returned for each user, the call number giving the number of calls with non null charging cost.
     * <p>
     * The request processes charging files on the OmniPCX Enterprise. The processing is limited to a maximum of 100 files for performance reason. If
     * the range filter is too large and the number of file to process is greater than 100, the method fails and returns 'null'. In this case, a smaller
     * range must be specified.
     * 
     * @param nodeId     the OmniPCX Enterprise node id
     * @param filter     a time range filter
     * @param topResults allows to return only the 'top N' tickets
     * @param all        'true' to include tickets with a 0 cost
    */
    async getChargingsFromFilter(nodeId: number, filter: TimeRange = null, topResults: number = null, all: boolean = false): Promise<ChargingResult> {
        return await this._analyticsRest.getChargingsFromFilter(nodeId, filter, topResults, all);
    }

    /**
     * Query the charging information for the specified node, using the specified charging files. The charging files can be retrieved with {@link getChargingFiles}.
     * <p>
     * If 'all' is set to 'true', all the tickets are returned, including the zero cost ticket, and with the called party; If 'all' is
     * set to 'false', the total of charging info is returned for each user, the call number giving the number of calls with non null charging cost.
     * <p>
     * The request processes charging files on the OmniPCX Enterprise. The processing is limited to a maximum of 100 files for performance reason. If
     * the range filter is too large and the number of file to process is greater than 100, the method fails and returns 'null'. In this case, a smaller
     * range must be specified.
     * 
     * @param nodeId     the OmniPCX Enterprise node id
     * @param files     the list of file to process
     * @param topResults allows to return only the 'top N' tickets
     * @param all        'true' to include tickets with a 0 cost
    */
     async getChargingsFromFiles(nodeId: number, files: Array<ChargingFile>, topResults: number = null, all: boolean = false): Promise<ChargingResult> {
        return await this._analyticsRest.getChargingsFromFiles(nodeId, files, topResults, all);
    }
}