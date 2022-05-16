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

import {PbxAttribute} from "./pbx-attribute";
import { O2GPbxObject } from "../../internal/types/pbxmngt/o2gpbxmngt-types";

/**
 * PbxObject represents an object of the OmniPCX Enterprise object model.
 * <p>
 * A PbxObject object is referenced by it's object instance definition,
 * a hierarchical path from the root object, and a unique instance id.<br>
 * For exemple:
 * <ul>
 * <li>"Subscriber" : A Subscriber object.</li>
 * <li>"Application_Configuration/1/ACD2/1/ACD2_Operator/1/ACD2_Operator_data" :
 * A CCD operator data object.</li>
 * </ul>
 */
export class PbxObject {

    private _objectName: string;
    private _id: string;
    private _objectNames: string[];
    private _attributes: Map<string, PbxAttribute>;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns the collection of sub-objects names.
     */
    public get objectNames(): string[] {
        return this._objectNames
    }

    /**
     * Returns this object name. 
     */
    public get name(): string {
        return this._objectName;
    }

    /**
     * Returns this object instance id.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Returns the attribute with the specified name.
     * 
     * @param attrName the attribue name.
     */
    public getAttribute(attrName: string): PbxAttribute {
        return this._attributes.get(attrName);
    }

    /**
     * @ignore
     */
    public static build(o2GPbxObject: O2GPbxObject): PbxObject {

        let mapAttributes = new Map<string, PbxAttribute>();
        if (o2GPbxObject.attributes) {

            for (const attr of o2GPbxObject.attributes) {

                let names = attr.name.split('.');
                if (names.length == 1){
                    mapAttributes.set(attr.name, PbxAttribute.build(attr));
                } 
                else {
                    if (!mapAttributes[names[0]]) {
                        mapAttributes.set(names[0], new PbxAttribute(names[0]));
                    }

                    PbxAttribute.addSequenceAttribute(mapAttributes.get(names[0]), names[1], attr);
                }
            }
        }

        let result = new PbxObject();
        result._id = o2GPbxObject.objectId;
        result._objectNames = o2GPbxObject.objectNames;
        result._objectName = o2GPbxObject.objectName;
        result._attributes = mapAttributes;

        return result;
    }
}