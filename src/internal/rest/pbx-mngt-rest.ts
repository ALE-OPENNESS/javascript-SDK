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
import HttpContent from '../util/http-content';
import UtilUri from "../util/util-uri";
import AssertUtil from "../util/assert";
import {Model} from '../../types/pbxmngt/model';
import {PbxObject} from '../../types/pbxmngt/pbx-object';
import {PbxAttribute} from '../../types/pbxmngt/pbx-attribute';
import { Pbx } from '../../types/pbxmngt/pbxmngt-types';
import { O2GObjectModel, O2GPbxAttribute } from '../types/pbxmngt/o2gpbxmngt-types';
import { O2GPbxObject } from '../types/pbxmngt/o2gpbxmngt-types';
import { O2GPbxList } from '../types/pbxmngt/o2gpbxmngt-types';
import { O2GPbxObjectIds } from '../types/pbxmngt/o2gpbxmngt-types';
import { Filter } from '../../types/pbxmngt/filter';

export default class PbxManagementRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async getPbxs(): Promise<Array<number>> {

        let pbxs: O2GPbxList = this.getResult(await RestService._httpClient.get(this._uri));
        if (pbxs) {

            return pbxs.nodeIds.map(e => parseInt(e));
        }
        else {
            return null;
        }
    }

    public async getPbx(nodeId: number): Promise<Pbx> {

        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.positive(nodeId, "nodeId").toString());
        return this.getResult(await RestService._httpClient.get(uriGet));  
    }

    public async getObjectModel(nodeId: number, objectName: string): Promise<Model> {

        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.positive(nodeId, "nodeId").toString(), "model");
        if (objectName) {
            uriGet = UtilUri.appendPath(uriGet, objectName);
        }

        let o2gObjectModel: O2GObjectModel = this.getResult<O2GObjectModel>(await RestService._httpClient.get(uriGet))
        if (o2gObjectModel) {
            return Model.build(o2gObjectModel);
            
        }
        else {
            return null;
        }
    }

    public async getNodeObject(nodeId: number): Promise<PbxObject> {

        let uriGet = UtilUri.appendPath(this._uri, AssertUtil.positive(nodeId, "nodeId").toString(), "instances");

        let o2GPbxObject: O2GPbxObject = this.getResult<O2GPbxObject>(await RestService._httpClient.get(uriGet))
        if (o2GPbxObject) {
            return PbxObject.build(o2GPbxObject);
            
        }
        else {
            return null;
        }

    }

    public async getObject(nodeId: number, objectInstanceDefinition: string, objectId: string, attributes: string | PbxAttribute[]): Promise<PbxObject> {

        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.positive(nodeId, "nodeId").toString(), 
            "instances",
            AssertUtil.notNullOrEmpty(objectInstanceDefinition, "objectInstanceDefinition"),
            AssertUtil.notNullOrEmpty(objectId, "objectId"));

        if (attributes) {
            if (Array.isArray(attributes)) {
                uriGet = UtilUri.appendQuery(uriGet, "attributes", attributes.join());
            }
            else {
                uriGet = UtilUri.appendQuery(uriGet, "attributes", attributes);
            }
        }

        let o2GPbxObject: O2GPbxObject = this.getResult<O2GPbxObject>(await RestService._httpClient.get(uriGet))
        if (o2GPbxObject) {
            return PbxObject.build(o2GPbxObject);
            
        }
        else {
            return null;
        }
    }

    public async getObjectInstances(nodeId: number, objectInstanceDefinition: string, filter: string|Filter): Promise<string[]> {
        
        let uriGet = UtilUri.appendPath(
            this._uri, 
            AssertUtil.positive(nodeId, "nodeId").toString(), 
            "instances",
            AssertUtil.notNullOrEmpty(objectInstanceDefinition, "objectInstanceDefinition"))

        if (filter) {
            if (typeof filter == 'object') {
                // Considered as a Filter object
                uriGet = UtilUri.appendQuery(uriGet, "filter", filter.value);
            }
            else {
                uriGet = UtilUri.appendQuery(uriGet, "filter", filter);
            }
        }

        let objectIds: O2GPbxObjectIds = this.getResult<O2GPbxObjectIds>(await RestService._httpClient.get(uriGet))
        if (objectIds) {
            return objectIds.objectIds;
        }
        else {
            return null;
        }
    }

    public async setObject(nodeId: number, objectInstanceDefinition: string, objectId: string, attributes: PbxAttribute[]): Promise<boolean> {

        let uriPut = UtilUri.appendPath(
            this._uri, 
            AssertUtil.positive(nodeId, "nodeId").toString(), 
            "instances",
            AssertUtil.notNullOrEmpty(objectInstanceDefinition, "objectInstanceDefinition"),
            AssertUtil.notNullOrEmpty(objectId, "objectId"));

        let o2GPbxAttributeList: Array<O2GPbxAttribute> = new Array<O2GPbxAttribute>();
        attributes.forEach(a => o2GPbxAttributeList.push(...PbxAttribute.from(a)));
        
        let json = JSON.stringify({
            "attributes": o2GPbxAttributeList
        });

        let httpResponse = await RestService._httpClient.put(uriPut, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();    
    }

    public async createObject(nodeId: number, objectInstanceDefinition: string, attributes: PbxAttribute[]): Promise<boolean> {

        let uriPost = UtilUri.appendPath(
            this._uri, 
            AssertUtil.positive(nodeId, "nodeId").toString(), 
            "instances",
            AssertUtil.notNullOrEmpty(objectInstanceDefinition, "objectInstanceDefinition"));

        let o2GPbxAttributeList: Array<O2GPbxAttribute> = new Array<O2GPbxAttribute>();
        attributes.forEach(a => o2GPbxAttributeList.push(...PbxAttribute.from(a)));
        
        let json = JSON.stringify({
            "attributes": o2GPbxAttributeList
        });

        let httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();    
    }

    public async deleteObject(nodeId: number, objectInstanceDefinition: string, objectId: string, forceDelete: boolean): Promise<boolean> {

        let uriDelete = UtilUri.appendPath(
            this._uri, 
            AssertUtil.positive(nodeId, "nodeId").toString(), 
            "instances",
            AssertUtil.notNullOrEmpty(objectInstanceDefinition, "objectInstanceDefinition"),
            AssertUtil.notNullOrEmpty(objectId, "objectId"));

        if (forceDelete) {
            uriDelete = UtilUri.appendQuery(uriDelete, "force");
        }

        let httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();    
   }

}