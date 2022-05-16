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

import { O2GPbxAttribute, O2GPbxComplexAttribute } from "../../internal/types/pbxmngt/o2gpbxmngt-types";
import {PbxAttribute} from "./pbx-attribute";

/**
 * PbxAttributeMap represents a sequence of named attributes.
 */
export class PbxAttributeMap {

    private _attributes: Map<String, PbxAttribute>;

    /**
     * @internal
     */
    constructor() {
    }

    /**
     * Returns the names of the attributes in this sequence.
     */
    public get names(): string[] {
        return Array.from(this._attributes.keys()).map(s => s.toString());
    }

    /**
     * Returns the Attribute with the specified name.
     * @example
     * ```typescript
     *     let skillSequence = ...
     *     let attr = skillSequence.getAttribute("Skill_nb");
     * ```
     * 
     * @param name The attribute name
     */
    public getAttribute(name: string): PbxAttribute {
        return this._attributes.get(name);
    }

    /**
     * Adds the specified attribute to this sequence. It's possible to chain the
     * add operations to create a complete sequence.
     * 
     * @example
     * ```typescript
     *        let attr = PbxAttributeMap.create()
     *                      .add(PbxAttribute.createBoolean("Elem1", true))
     *                      .add(PbxAttribute.createInteger("Elem2", 23));
     * ```
     * 
     * @param attr the attribute to add to this sequence
     * @return the sequence object.
     */
    public add(value: PbxAttribute): PbxAttributeMap {
        this._attributes.set(value.name, value);
        return this;
    }

    /**
     * Create a new empty PbxAttributeMap. Use this method to create a new sequence
     * of attribute. For exemple:
     * 
     * @example
     * ```typescript
     *     Sequence {
     *         Param1 := Integer,
     *         Param2 := Boolean
     *     }
     * ```
     * Can be create with the following operations
     * ```typescript
     *     let sequence = PbxAttributeMap.create()
     *                      .add(PbxAttribute.createInteger("Param1", 1))
     *                      .add(PbxAttribute.createBoolean("Param2", true));
     * ```
     */
    public static create(): PbxAttributeMap {
        return new PbxAttributeMap();
    }


    /**
     * Create a new PbxAttributeMap with the specified attributes.
     * Use this method to create a new sequence of attribute. For exemple:
     * 
     * @example
     * ```typescript
     *     Sequence {
     *         Param1 := Integer,
     *         Param2 := Boolean
     *     }
     * ```
     * Can be created with the following operations
     * @example
     * ```typescript
     *     let sequence = 
     *         PbxAttributeMap.createWith([
     *                      PbxAttribute.createInteger("Param1", 1),
     *                      PbxAttribute.createBoolean("Param2", true)
     *         ]);
     * ```
     * 
     * @param attributes the array of attributes
     */
     public static createWith(attributes: PbxAttribute[]): PbxAttributeMap {

        let map = new PbxAttributeMap();
        attributes.forEach(a => map._attributes.set(a.name, a));
        return map;
    }


    /**
     * @ignore
     */
    public static build(o2gPbxComplexAttribute: O2GPbxComplexAttribute): PbxAttributeMap {

        let mapAttributes = new PbxAttributeMap();

        if (o2gPbxComplexAttribute.attributes) {
            o2gPbxComplexAttribute.attributes.forEach(a => mapAttributes._attributes.set(a.name, PbxAttribute.build(a)));
        }

        return mapAttributes;
    }

    /**
     * @ignore
     */
     public static from(attributeMaps: PbxAttributeMap, attrName: string): O2GPbxComplexAttribute {

        let o2gPbxAttributes = new Array<O2GPbxAttribute>();
        attributeMaps.names.forEach(name => o2gPbxAttributes.push(...PbxAttribute.from(attributeMaps.getAttribute(name))));

        return {
            "name": attrName,
            "attributes": o2gPbxAttributes
        };
    }

}