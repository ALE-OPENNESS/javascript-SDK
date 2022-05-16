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

import MaintenanceRest from "./internal/rest/maint-rest";
import { SystemStatus } from "./types/maint/maint-types";

/**
 * The MaintenanceService allows to retrieve information about the
 * system state, in particular information on the pbx nodes and their connection
 * state. Informations about license are also provided per item: total allocated
 * licenses, numbers of current used and expiration date.
 */
 export class Maintenance {

	private _maintenanceRest: MaintenanceRest;

	/**
	 * Occurs when a CTI link is down. 
	 * @event
	 */
	readonly ON_CTI_LINK_DOWN = "OnCtiLinkDown";
	
	/**
	 * Occurs when a CTI link is up. 
	 * @event
	 */
	readonly ON_CTI_LINK_UP = "OnCtiLinkUp";
	
	/**
	 * Occurs when datas are fully loaded from an OmniPCX Enterprise node. 
	 * @event
	 */
	readonly ON_PBX_LOADED = "OnPbxLoaded";

	/**
	 * @internal
	 */
    constructor(maintenanceRest: MaintenanceRest) {
        this._maintenanceRest = maintenanceRest;
	}

 	/**
	 * This operation provides information about the system state , and the total
	 * number of each license type available for the system. This operation is
	 * restricted to an admin session only.
	 */
	  public async getSystemStatus(): Promise<SystemStatus> { 
		return await this._maintenanceRest.getSystemStatus();
	}

}