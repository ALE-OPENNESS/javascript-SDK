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


import PbxManagementRest from "./internal/rest/pbx-mngt-rest";
import {Model} from "./types/pbxmngt/model";
import {PbxAttribute} from "./types/pbxmngt/pbx-attribute";
import {PbxObject} from "./types/pbxmngt/pbx-object";
import { Pbx } from "./types/pbxmngt/pbxmngt-types";
import { Filter } from "./types/pbxmngt/filter";

/**
 * PbxManagement service allows an administrator to manage an OmniPcx
 * Enterprise, that is to create/modify/delete any object or sub-object in the
 * OmniPcx Enterprise object model. Using this service requires having a
 * <b>MANAGEMENT</b> license.
 * <p>
 * <b>WARNING:</b> Using this service requires to have a good knowledge of the
 * OmniPCX Enterprise object model.
 * <p>
 * The service uses two kinds of resource: the object model resource and the
 * object instance resource.
 * <p><b><u>The object model</u></b>: The object model can be retrieved for the whole Pbx
 * or for a particular object. It provides the detail of object attributes:
 * whether the attribute is mandatory/optional in the object creation, what
 * range of value is authorized, what are the possible enumeration value.
 * <p><b><u>The object instance</u></b>: It is used to create, modify, retrieve or remove
 * any instances of any object, giving the reference of this object. For the
 * creation or the modification of an object, the body must be compliant with
 * the object model.
 * <p>
 * The list of sub-objects which are returned by a get instance of an object
 * corresponds to the relative path of the first instanciable objects in the
 * hierarchy in order to be able by recursion to build the path to access to any
 * object and sub-object.
 * <p>
 * When access to an object which is a sub-object, the full path must be given :
 * {object1Name}/{object1Id}/{object2Name}/{object2Id}/..../{objectxName}/{objectxId}.
 */
 export class PbxManagement {

    private _pbxMngtRest: PbxManagementRest;

    /**
     * Occurs when a PBX object instance is created. 
     * Only Object Subscriber is concerned by this event.
     * @event
     */
    readonly ON_PBX_OBJECT_INSTANCE_CREATED = "OnPbxObjectInstanceCreated";

    /**
     * Occurs when a PBX object instance is deleted. 
     * Only Object Subscriber is concerned by this event.
     * @event
     */
    readonly ON_PBX_OBJECT_INSTANCE_DELETED = "OnPbxObjectInstanceDeleted";

    /**
     * Occurs when a PBX object instance is modified. 
     * Only Object Subscriber is concerned by this event.
     * @event
     */
    readonly ON_PBX_OBJECT_INSTANCE_MODIFIED = "OnPbxObjectInstanceModified";    

    /**
     * @internal
     */
    constructor(pbxMngtRest: PbxManagementRest) {
        this._pbxMngtRest = pbxMngtRest;
	}

    /**
     * Gets the list of OmniPCX Enterprise nodes connected on this O2G server.
     */
    public async getPbxs(): Promise<number[]> {
        return this._pbxMngtRest.getPbxs();
    }
    
     /**
     * Gets the OmniPCX Enterprise specified by its node id.
     * 
     * @param nodeId the PCX Enterprise node id
     */
    public async getPbx(nodeId: number): Promise<Pbx> {
        return this._pbxMngtRest.getPbx(nodeId);
    }
    
    /**
     * Get the description of the data model for the specified object on the
     * specified OmniPCX Enterprise node.
     * <p>
     * If 'objectName' is 'null', the global object model of the OmniPCX Enterprise node is returned.
     * 
     * @param nodeId     the OmniPCX Enterprise node id
     * @param objectName the object name
     */
    public async getObjectModel(nodeId: number, objectName: string = null): Promise<Model> {
        return this._pbxMngtRest.getObjectModel(nodeId, objectName);
    }
    
    /**
     * Gets the node(root) object.
     * 
     * @param nodeId the OmniPCX Enterprise node id
     */
    public async getNodeObject(nodeId: number): Promise<PbxObject> {
        return this._pbxMngtRest.getNodeObject(nodeId);
    }
    
    /**
     * Gets the object specified by its instance definition and its instance id.
     * 
     * @param nodeId                   the OmniPCX Enterprise node id
     * @param objectInstanceDefinition the object instance definition
     * @param objectId                 the object instance id
     * @param attributes               the optional attributes to retrieve. It can be a string with a comma separated attribute name, or an array of PbxAtribute objects.
     */
    public async getObject(nodeId: number, objectInstanceDefinition: string, objectId: string, attributes: string|PbxAttribute[] = null): Promise<PbxObject>{
        return this._pbxMngtRest.getObject(nodeId, objectInstanceDefinition, objectId, attributes);
    }

    /**
     * Queries the list of object instances that match the specified filter.
     * A filter can be built using the {@link Filter} class, or it can be a string object.
     * @example
     * ```typescript
     *      // Using a Filter object
     *      let filter = o2g.types.pbxmngt.Filter.create(
     *                          "StationType", 
     *                          o2g.types.pbxmngt.AttributeFilter.Equals, 
     *                          "ANALOG");
     *      let objectInstances = await o2g.pbxManagement.getObjectInstances(5, "Subscriber", filter);
     * 
     *      // Using a string as a filter
     *      objectInstances = await o2g.pbxManagement.getObjectInstances(5, "Subscriber", "StationType==ANALOG");
     * 
     * ```
     * 
     * @param nodeId the OmniPCX Enterprise node id
     * @param objectInstanceDefinition the object instance definition
     * @param filter a filter to query the instances ({@link Filter} object or string)
     */
    public async getObjectInstances(nodeId: number, objectInstanceDefinition: string, filter: string|Filter = null): Promise<string[]> {
        return this._pbxMngtRest.getObjectInstances(nodeId, objectInstanceDefinition, filter);
    }
    
    /**
     * Changes one or several attribute values of the specified object.
     * @param nodeId the OmniPCX Enterprise node id
     * @param objectInstanceDefinition the object instance definition
     * @param objectId the object instance id
     * @param attributes the array of attributes to change
     */
     public async setObject(nodeId: number, objectInstanceDefinition: string, objectId: string, attributes: PbxAttribute[]): Promise<boolean> {
        return this._pbxMngtRest.setObject(nodeId, objectInstanceDefinition, objectId, attributes);
    }

    /**
     * Deletes the specified instance of object.
     * <p>
     * The "<i>FORCED_DELETE</i>" action is not available for all object. 
     * Check the availability in the {@link Model} model corresponding to this object.
     * This option can be used, for exemple, to delete a {@code Subscriber} having voice mails in his mail box.
     * @param nodeId the OmniPCX Enterprise node id
     * @param objectInstanceDefinition the object instance definition
     * @param objectId the object instance id
     * @param forceDelete Use the "<i>FORCED_DELETE</i>" action to delete the object.
     */
     public async deleteObject(nodeId: number, objectInstanceDefinition: string, objectId: string, forceDelete = false): Promise<boolean> {
        return this._pbxMngtRest.deleteObject(nodeId, objectInstanceDefinition, objectId, forceDelete);
    }

    /**
     * Creates a new object with the specified collection of attributes
     * @param nodeId the OmniPCX Enterprise node id
     * @param objectInstanceDefinition the object instance definition
     * @param attributes the array of attributes to set at this object creation.
     */
     public async createObject(nodeId: number, objectInstanceDefinition: string, attributes: PbxAttribute[]): Promise<boolean> {
        return this._pbxMngtRest.createObject(nodeId, objectInstanceDefinition, attributes);
    }    

}