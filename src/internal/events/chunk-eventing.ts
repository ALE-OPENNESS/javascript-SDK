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

import {RoutingState} from "../../types/routing/routing-state";


class Dispatcher {

	_dispatchers = new Map();
	_adapters = new Map();

	constructor() {
		this._registerEvents();
	}

	_registerEvents() {
		this._registerEvent("OnChannelInformation", "OnChannelInformation");
		this._registerEvent("OnRoutingStateChanged", "OnRoutingStateChanged", function(event){

			return {
				eventName: event.eventName,
				loginName: event.loginName,
				routingState: RoutingState.build(event.routingState)
			};
		});

		this._registerEvent("OnEventSummaryUpdated");

		this._registerEvent("OnUserInfoChanged");
		this._registerEvent("OnUserCreated");
		this._registerEvent("OnUserDeleted");

		this._registerEvent("OnTelephonyState");
		this._registerEvent("OnCallCreated");
		this._registerEvent("OnCallModified");
		this._registerEvent("OnCallRemoved");
		this._registerEvent("OnUserStateModified");
		this._registerEvent("OnDeviceStateModified");
		this._registerEvent("OnDynamicStateModified");

		this._registerEvent("OnComRecordCreated");
		this._registerEvent("OnComRecordModified");
		this._registerEvent("OnComRecordsDeleted");
		this._registerEvent("OnComRecordsAck");
		this._registerEvent("OnComRecordsUnAck");

		this._registerEvent("OnCtiLinkDown");
		this._registerEvent("OnCtiLinkUp");
		this._registerEvent("OnPbxLoaded");

		this._registerEvent("OnAgentStateChanged");
		this._registerEvent("OnSupervisorHelpRequested");
		this._registerEvent("OnSupervisorHelpCancelled");

		this._registerEvent("OnDigitCollected");
		this._registerEvent("OnToneGeneratedStart");
		this._registerEvent("OnToneGeneratedStop");
		this._registerEvent("OnRouteEnd");
		this._registerEvent("OnRouteRequest");

		this._registerEvent("OnPbxObjectInstanceCreated");
		this._registerEvent("OnPbxObjectInstanceDeleted");
		this._registerEvent("OnPbxObjectInstanceModified");
	}

	
	_registerEvent(eventName: string, dispatcherName: string = null, adapter: any = null) {

		if (dispatcherName) {
			this._dispatchers.set(eventName, dispatcherName);
		}
		else {
			this._dispatchers.set(eventName, eventName);
		}
		if (adapter) {
			this._adapters.set(eventName, adapter);
		}
	}

	_dispatch(event: any) {

		var eventName = event.eventName;
		var dispatcher = this._dispatchers.get(eventName);

		if (dispatcher) {

			var adapter = this._adapters.get(eventName);
			if (adapter) {

				document.dispatchEvent(new CustomEvent(dispatcher, { detail: adapter(event) }));

			}
			else {
				document.dispatchEvent(new CustomEvent(dispatcher, { detail: event }));
			}
		}
	}

}




export default class ChunkEventing {

	private _uri: string;
	private _dispatcher: Dispatcher;

    constructor(uri: string) {
		this._uri = uri;
		this._dispatcher = new Dispatcher();
	}

	public start() {

		var chunkRequest = new XMLHttpRequest();
		var nbChunks = 0;
		var lastChunkIndex = 0;

		var dispatcher = this._dispatcher;

		chunkRequest.onprogress = function() {

			var size = this.responseText.length;
			if (lastChunkIndex == size)
				return;

			var chunk = this.responseText.substring(lastChunkIndex, size);
			var lines = chunk.split('\n');
			for (var i = 0; i<lines.length-1; i++) {
			 
			 	// Parse the event
			 	dispatcher._dispatch.call(dispatcher, JSON.parse(lines[i]))
			}
		
			lastChunkIndex = size;
		}

		chunkRequest.onreadystatechange = function() {
			var etat = this.readyState;
		}
	  
		chunkRequest.open("POST", this._uri);
		chunkRequest.withCredentials = true;
		chunkRequest.setRequestHeader('Accept', "*/*");
		chunkRequest.send();
    }
}