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

/**
 * ConfigurationType represents the possible O2G server configurations.
 */
export enum ConfigurationType {
    /**
     * O2G Server is configured for management. An O2G server configured for
     * management does not monitor devices on the OmniPCX Enterprise.
     */
    PBX_MANAGEMENT = 'PBX_MANAGEMENT',

    /**
     * O2G Server is configured with full services.
     */
    FULL_SERVICES = 'FULL_SERVICES' 
}

/**
 * ServerAddress defines an OmniPCX Enterprise address.
 */
export type ServerAddress = {

    /**
     * This address FQDN.
     */
    fqdn: string;

    /**
     * This address IPv4 address.
     */
    ip: string;
}

/**
 * CTILinkState represents the differents possible states of the CTI
 * link between OmniPCX Enterprise and O2G server.
 */
export enum CTILinkState {

    /**
     * CTI Link is established with the main OmniPCX Enterprise call server.
     */
    CONNECTED_MAIN = 'CONNECTED_MAIN',

    /**
     * CTI Link is established with the standby OmniPCX Enterprise call server.
     */
    CONNECTED_SECONDARY = 'CONNECTED_SECONDARY',

    /**
     * CTI Link is not established.
     */
    DISCONNECTED = 'DISCONNECTED'
}


export type PbxStatus = {

    /**
     * The name of the OmniPCX Enterprise.
     */
    name: string;

    /**
     * The OmniPCX Enterprise node number.
     */
    nodeId: number;

    /**
     * The OmniPCX Enterprise main address.
     */
    mainAddress: ServerAddress;

    /**
     * The OmniPCX Enterprise secondary address.
     */
    secondaryAddress: ServerAddress;

    /**
     * The OmniPCX Enterprise version.
     */
    version: string;


    /**
     * Whether this O2G is connected to this OmniPCX Enterprise node.
     */
    connected: boolean;

    /**
     * Whether the O2G has loaded all this OmniPCX Enterprise node's users.
     * @see {@link Maintenance.ON_PBX_LOADED} event.
     */
    loaded: boolean;


    /**
     * The state of the CSTA link between the O2Gserver and this OmniPCX
     * Enterprise node.
     */
    ctiLinkState: CTILinkState;


    /**
     * Whether the OmniPCX Enterprise node is secured. If the OmniPCX
     * Enterprise node is secured, the connection with the O2G server is done using
     * SSH.
     */
    secured: boolean;

    /**
     * The number of monitored users on this OmniPCX Enterprise node.
     */
    monitoredUserNumber: number;
}

/**
 * License represents an O2G license.
 */
export type License = {
    /**
     * The license name.
     */
    name: string;


    /**
     * The number of licenses.
     */
    total: number;


    /**
     * The number of licenses used.
     */
    currentUsed: number;

    /**
     * The expiration date.
     */
    expiration: string 
}


/**
 * SystemStatus provide a full status of the O2G server and its connections.
 */
export type SystemStatus = {

    /**
     * This O2G server logical address.
     */
    logicalAddress: ServerAddress;


    /**
     * The start date of the O2G server.
     */
    startDate: Date;


    /**
     * Whether this O2G is deployed in high availability mode.
     */
     haMode: boolean;


    /**
     * The FQDN of the currently active O2G server when it is configured in
     * HA mode.
     */
    primary: string;


    /**
     * The version of the current active O2G server when it is configured in
     * HA mode.
     */
    primaryVersion: string;


    /**
     * The FQDN of the backup O2G server when it is configured in HA mode.
     */
    secondary: string;


    /**
     * The version of the backup O2G server when it is configured in HA mode.
     */
    secondaryVersion: string;


    /**
     * The collection of OmniPCX Enterprise nodes connected to this O2G server
     */
    pbxs: PbxStatus[];


    /**
     * The O2G server licenses.
     */
     licenses: License[];
    

    /**
     * The O2G Server configuration
     */
    configurationType: ConfigurationType;
}