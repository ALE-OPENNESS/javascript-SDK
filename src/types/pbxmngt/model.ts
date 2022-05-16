/*
* Copyright 2022 ALE International
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

import { AttributeType } from "./attribute-type";
import { O2GAttributeModel, O2GObjectModel } from "../../internal/types/pbxmngt/o2gpbxmngt-types";

/**
 * OctetStringLength object represents a length constraint for an OctetString object.
 */
 export class OctetStringLength {
    private _min: number;
    private _max: number;

    /**
     * @internal
     */
    private constructor(min: number, max: number) {
        this._min = min;
        this._max = max;
    }

    /**
     * Returns the minimal length.
     */
    public get min(): number {
        return this._min;
    }

    /**
     * Returns the maximal length.
     */
    public get max(): number {
        return this._max;
    }

    /**
     * @ignore
     */
    public static parseLengthValue(value: string): OctetStringLength {
        
        if (value == null) {
            return null;
        }

        let values = value.split("..");
        if (values.length == 2) {
            return new OctetStringLength(parseInt(values[0]), parseInt(values[1]));
        }
        else if (values.length == 1) {
            return new OctetStringLength(0, parseInt(values[0]));
        }
        else {
            // Not throw an exception
            return null;
        }
    }
}

/**
 * ModelAttribute represents an attribute in an object model.
 */
export class ModelAttribute {
    private _name: string;
    private _mandatory: boolean;
    private _multiValue: boolean;
    private _allowedValues: string[]
    private _octetStringLength: OctetStringLength;
    private _defaultValue: string;
    private _filtering: boolean;
    private _usedWhen: string;
    private _type: AttributeType;

    /**
     * @internal
     */
    constructor() {

    }
    
    /**
     * Returns this attribute name.
     */
     public get name(): string {
        return this._name;
    }
    
    /**
     * Returns whether this attribute is andatory.
     */
     public mandatory(): boolean {
        return this._mandatory;
    }
    
    /**
     * Returns this attribute's type
     */
    public type(): AttributeType {
        return this._type;
    }
    
    /**
     * Returns whether this attribute has multiple values. 
     */
    public multiValue(): boolean {
        return this._multiValue;
    }
    
    /**
     * return this._a collection of allowed values
     */
    public allowedValues(): string[] {
        return this._allowedValues;
    }
    
    /**
     * Returns the maximum length of the attribute value when the attribute is an byte string.
     */
    public octetStringLength(): OctetStringLength {
        return this._octetStringLength;
    }
    
    /**
     * Returns this attribute default value.
     */
    public defaultValue(): string {
        return this._defaultValue;
    }
    
    /**
     * Returns whether the attribute can be filtered.
     */
    public filtering(): boolean {
        return this._filtering;
    }
    
    /**
     * return this._in which context this attribute is used.
     */
    public usedWhen(): string {
        return this._usedWhen;
    }

    /**
     * @Ignore
     */
    public static build (a: O2GAttributeModel): ModelAttribute {

        let result = new ModelAttribute();
        result._name = a.name;
        result._mandatory = a.mandatory;
        result._multiValue = a.multiValue;
        result._allowedValues = a.allowedValues;
        result._octetStringLength = OctetStringLength.parseLengthValue(a.lengthValue);
        result._defaultValue = a.defaultValue;
        result._filtering = a.filtering;
        result._usedWhen = a.usedWhen;
        result._type = AttributeType[a.typeValue];

        return result;
    }
}


/**
 * Model represents an object model. It provides the detail of object
 * attributes: whether the attribute is mandatory/optional in the object
 * creation, what range of value is authorized, what are the possible
 * enumeration value.
 */
export class Model {

    private _name: string;
    private _hidden: boolean;
    private _canCreate: boolean;
    private _canDelete: boolean;
    private _canSet: boolean;
    private _canGet: boolean;
    private _otherActions: string[];
    private _attributes: Map<string, ModelAttribute>;
    private _children: Map<string, Model>;

    /**
     * Returns the name of this object model.
     */
     public get name(): string {
        return this._name;
    }

    /**
     * Returns the specified attribute.
     * 
     * @param attrName the attribute name.
     */
    public attribute(attrName: string): ModelAttribute {
        return this._attributes.get(attrName);
    }

    /**
     * Returns the specified child model.
     * 
     * @param name the name of the child model.
     */
     public child(name: string): Model {
        return this._children.get(name);
    }

    /**
     * Returns whether this object is hidden in the OmniPCX Enterprise object model.
     */
    public get hidden(): boolean {
        return this._hidden;
    }

    /**
     * Returns whether this object can be created.
     */
    public get canCreate(): boolean {
        return this._canCreate;
    }

    /**
     * Returns whether this object can be deleted.
     */
     public get canDelete(): boolean {
        return this._canDelete;
    }

    /**
     * Returns whether this object can be set.
     */
     public get canSet(): boolean {
        return this._canSet;
    }

    /**
     * Returns whether this object can be gotten.
     */
    public get canGet(): boolean {
        return this._canGet;
    }

    /**
     * Returns the possible other actions on this model.
     */
    public get otherActions(): string[] {
        return this._otherActions;
    }


    getMandatoryAttributes() {
        return Object.values(this._attributes).filter(a => a.mandatory);
    }

    /**
     * @ignore
     */
    public static build(o2gObjModel: O2GObjectModel): Model {

        let mapObjects = new Map<string, Model>();
        if (o2gObjModel.objects) {

            o2gObjModel.objects.forEach(o2gModel => {
                let objModel: Model = this.build(o2gModel);
                mapObjects.set(objModel.name, objModel);
            });
        }

        let mapAttributes = new Map<string, ModelAttribute>();
        if (o2gObjModel.attributes != null) {
            o2gObjModel.attributes.forEach(a => {
                mapAttributes.set(a.name, ModelAttribute.build(a));
            });
        }

        let model = new Model();
        model._name = o2gObjModel.objectName;
        model._hidden = o2gObjModel.hidden;
        model._canCreate = o2gObjModel.create;
        model._canDelete = o2gObjModel.delete;
        model._canSet = o2gObjModel.set;
        model._canGet = o2gObjModel.get;
        model._otherActions = o2gObjModel.otherActions;
        model._attributes = mapAttributes;
        model._children = mapObjects;

        return model;
    }
}