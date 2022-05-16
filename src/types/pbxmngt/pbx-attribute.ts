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

import {PbxAttributeMap} from "./pbx-attr-map";
import Exceptions from "../../internal/o2g-exceptions";
import { O2GPbxAttribute } from "../../internal/types/pbxmngt/o2gpbxmngt-types";

/**
 * PbxAttribute class represents an attribute in a {@link PbxObject} object. A PbxAttribute
 * can be of the following type:
 * <p><b><u>Integer</u></b>: An Integer value is equivalent to an int value.
 * <p><b><u>Boolean</u></b>: An Boolean value is equivalent to an boolean value.
 * <p><b><u>Enumerated</u></b>: An enumerated value can have a limited set of possible
 * values. PbxAttribute treats enumerated value as string value.
 * <p><b><u>OctetString, ByteString</u></b>: An OctetString or a ByteString are equivalent to a string value.
 * <p><b><u>Sequence</u></b>: A Sequence is a structured data whose attribute member have
 * a specific name and type: For exemple
 * @example
 * ```typescript
 *     Skill := Sequence {
 *         Skill_Nb := Integer,
 *         Skill_Level := Integer,
 *         Skill_Activate := Boolean
 *     }
 * ```
 * 
 * <p><b><u>Set</u></b>: A Set value is a list of attributes of the same type. It can be
 * a list of simple value like:
 * 
 * @example
 * ```typescript
 *     SimpleSet := Set {
 *         Item := OctetString
 *     }
 * ```
 * 
 * or a list of sequences:
 * 
 * @example
 * ```typescript
 *     SkillSet := Set {
 *         Item := Sequence {
 *             Skill_Nb := Integer,
 *             Skill_Level := Integer,
 *             Skill_Activate := Boolean
 *         }
 *     }
 * ```
 */
export class PbxAttribute {

    private _name: string
    private _values: string[];
    private _attributeMaps: PbxAttributeMap[];
    private _sequenceMap: PbxAttributeMap;

    /**
     * @internal
     */
    constructor(name: string) {
        this._name = name;
	}

    /**
     * Returns this attribute's name.
     */
    public get name(): string {
        return this.name;
    }

    /**
     * @ignore
     */
    static build(attr: O2GPbxAttribute) {
        let attrSet = null;
        if (attr.complexValue) {
            attrSet = attr.complexValue.map(cv => PbxAttributeMap.build(cv));
        }

        let attribute = new PbxAttribute(attr.name);
        attribute._attributeMaps = attrSet;
        attribute._values = attr.value;

        return attribute;
    }

    /**
     * @ignore
     */
    public static addSequenceAttribute(pbxAttribute: PbxAttribute, name: string, attr: O2GPbxAttribute) {

        if (pbxAttribute._sequenceMap == null) {
            pbxAttribute._sequenceMap = new PbxAttributeMap();
        }

        let attribute = new PbxAttribute(name);
        attribute._values = attr.value;

        pbxAttribute._sequenceMap.add(attribute);
    }

    /**
     * Creates a new PbxAttribute of type sequence with the specified strings.
     * 
     * @param attrName the attribute name
     * @param values   the list of string values to add in this attribute
     */
    public static createSetOfStrings(attrName: string, values: string[]): PbxAttribute {

        let attribute = new PbxAttribute(attrName);
        attribute._values = values;

        return attribute;
    }

    /**
     * Creates a new PbxAttribute of type string.
     * @example
     * ```typescript
     *     let simpleAttr = PbxAttribute.createString("AttrName", "a string value");
     * ```
     * 
     * @param attrName the attribute name
     * @param value the string value
     */
    public static createString(attrName: string, value: string): PbxAttribute {

        let attribute = new PbxAttribute(attrName);
        attribute._values = [value];

        return attribute;
    }

    /**
     * Creates a new PbxAttribute of type boolean.
     * @example
     * ```typescript
     *     let simpleAttr = PbxAttribute.createBoolean("AttrName", true);
     * ```
     * 
     * @param attrName the attribute name
     * @param value the boolean value
     */
    public static createBoolean(attrName: string, value: boolean): PbxAttribute {

        let attribute = new PbxAttribute(attrName);
        attribute._values = [value ? "true" : "false"];

        return attribute;
    }

    /**
     * Creates a new PbxAttribute with the specified sequence.
     * @example
     * ```typescript
     *     let sequence = 
     *         PbxAttribute.createSequence(
     *             "sequence", 
     *             PbxAttributeMap.create([
     *                 PbxAttribute.createInteger("Param1", 1),
     *                 PbxAttribute.createBoolean("Param2", true)
     *             ])
     *         );
     * ```
     * 
     * @param attrName the attribute name
     * @param sequence the sequence value
     */
     public static createSequence(attrName: string, sequence: PbxAttributeMap): PbxAttribute {
        
        let attribute = new PbxAttribute(attrName);
        attribute._sequenceMap = sequence;

        return attribute;
    }

    /**
     * Creates a new PbxAttribute with the specified list of sequences.
     * @example
     * ```typescript
     *     let skillSet = PbxAttribute.createSequenceSet("skillSet", [ 
     *         PbxAttributeMap.create([
     *             PbxAttribute.createInteger("Skill_nb", 21),
     *             PbxAttribute.createInteger("Skill_Level", 2),
     *             PbxAttribute.createBoolean("Skill_Activate", true)
     *         ]),
     *         PbxAttributeMap.create([
     *             PbxAttribute.create("Skill_nb", 22),
     *             PbxAttribute.create("Skill_Level", 1),
     *             PbxAttribute.create("Skill_Activate", true)
     *         ])
     *     ]);
     * ```
     * 
     * @param attrName the attribute name
     * @param setOfSequences the list of sequences
     */
     public static createSequenceSet(attrName: string, setOfSequences: PbxAttributeMap[]): PbxAttribute {
        
        let attribute = new PbxAttribute(attrName);
        attribute._attributeMaps = setOfSequences;

        return attribute;
    }

    /**
     * Creates a new PbxAttribute of type integer.
     * @example
     * ```typescript
     *     let simpleAttr = PbxAttribute.createInteger("AttrName", 2);
     * ```
     * 
     * @param attrName the attribute name
     * @param value the integer value
     */    
    public static createInteger(attrName: string, value: number): PbxAttribute {

        let attribute = new PbxAttribute(attrName);
        attribute._values = [value.toString()];

        return attribute;
    }

    /**
     * Returns the attributes set at the specified index.
     * <p>
     * This method is used when the attribute is a set of sequences. 
     * For exemple the SkillSet attribute in object ACD2_Operator_data:
     * @example
     * ```typescript
     *     SkillSet := Set
     *         [
     *             Sequence
     *                 {
     *                     Skill_Level := Integer
     *                     Skill_Nb := Integer
     *                     Skill_Activate := Boolean
     *                 }
     *         ]
     * ```
     * ```typescript
     *     let attr = pbxObject.getAttribute("SkillSet");
     *     int skillLevel = attr.getAt(0).getAttribute("Skill_Level").asInteger();
     * ```
     * 
     * @param index the attribute set index
     */
    public getAt(index: number): PbxAttributeMap {
        
        if (this._attributeMaps == null) {
            Exceptions.throw(Exceptions.Errors.InvalidObject, "This attribute is not a Set");
        }
        
        return this._attributeMaps[index];
    }

    /**
     * Returns this attribute value as a sequence of attributes.
     */
     public asAttributeMap(): PbxAttributeMap {
        return this._sequenceMap;
    }

    /**
     * Returns the value of this attribute as a list of PbxAttributeMap.
     */
     public asListOfMaps(): PbxAttributeMap[] {
        return this._attributeMaps;
    }

    private _assertUnique(values: string[]) {
        if (values && Array.isArray(values) && values.length == 1) {
            return values[0];
        }

        Exceptions.throw(Exceptions.Errors.InvalidObject, "value is not a list with a unique element");
    }

    /**
     * Returns this attribute value as a boolean.
     */
    public asBoolean(): boolean {
        
        let value = this._assertUnique(this._values);
        if (value == "true") {
            return true;
        }
        else if (value == "false") {
            return false;
        }
        else {
            Exceptions.throw(Exceptions.Errors.InvalidObject, "value " + value + " is not a boolean");
        }
    }

    /**
     * Sets the value of this attribute as a boolean
     * @param value the boolean value
     */
     public setBoolean(value: boolean) {
        this._values = [value ? "true" : "false"];
        this._sequenceMap = null;
        this._attributeMaps = null;
    }

    /**
     * Returns this attribute value as an integer.
     */
     public asInteger(): number {
        let value = this._assertUnique(this._values);
        return parseInt(value);
    }

    /**
     * Sets the value of this attribute as an integer.
     * @param value the integer value
     */
     public setInteger(value: number) {
        this._values = [value.toString()];
        this._sequenceMap = null;
        this._attributeMaps = null;
    }

    /**
     * Returns this attribute value as a string.
     */
     public asString(): string {
        return this._assertUnique(this._values);
    }

    /**
     * Sets the value of this attribute as a string.
     * @param value the integer value
     */
     public setString(value: string) {
        this._values = [value];
        this._sequenceMap = null;
        this._attributeMaps = null;
    }

    /**
     * Returns this attribute value as a enum value.
     */
     public asEnum(): string {
        return this.asString();
    }

    /**
     * @Ignore
     */
    public static from(attr: PbxAttribute): O2GPbxAttribute[] {

        let listAttr = new Array<O2GPbxAttribute>();

        if (attr._sequenceMap) {

            Object.keys(attr._sequenceMap).forEach(name => listAttr.push({
                "name": attr.name + "." + name,
                value: attr._sequenceMap[name]._values
            }));
        }
        else if (attr._attributeMaps) {
            
            listAttr.push({
                "name": attr.name,
                "value": attr._values,
                "complexValue": attr._attributeMaps.map(attrMap => PbxAttributeMap.from(attrMap, attr.name))
            });
        }
        else {

            listAttr.push({
                "name": attr.name,
                "value": attr._values
            });
        }

        return listAttr;
    }
}