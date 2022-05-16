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

import AssertUtil from "../../internal/util/assert";
import { AttributeFilter } from "./attribute-filter";
import Exceptions from "../../internal/o2g-exceptions";
import {PbxAttribute} from "./pbx-attribute";

/**
 * Filter class represents a filter that can be used to query OmniPCX Enterprise Object instances.
 * <p>
 * @example
 * ```typescript
 *   let complex = Filter.and(
 *                      Filter.or(
 *                        Filter.create("Station_Type", AttributeFilter.Equals, "ANALOG"),
 *                        Filter.create("Station_Type", AttributeFilter.Equals, "ALE-300")
 *                      ),
 *                      Filter.create("Directory_Name", OperationFilter.StartsWith, "f")
 *                    );
 * ```
 */
export class Filter {

    private _value: string;

    /**
     * @internal
     */
    constructor(value: string) {
        this._value = value;
    }

    public get value(): string {
        return this._value;
    }


    /**
     * Create a new filter with the specified attribute, operation and value.
     * @param attribute the attribute, either a {@link PbxAttribute} value, or a string object
     * @param operation the operation
     * @param value the value to test
     */
    public static create(attribute: string|PbxAttribute, operation: AttributeFilter, value: string): Filter {

        let attrName = (typeof attribute == 'object') ? attribute.name : attribute;

        if (operation == AttributeFilter.Equals) return new Filter(attrName + "==" + value);
        else if (operation == AttributeFilter.NotEquals) return new Filter(attrName + "!=" + value);
        else if (operation == AttributeFilter.StartsWith) return new Filter(attrName + "==" + value + "*");
        else if (operation == AttributeFilter.EndsWith) return new Filter(attrName + "==*" + value);
        else if (operation == AttributeFilter.GreatherThanOrEquals) return new Filter(attrName + "=ge=" + value);
        else if (operation == AttributeFilter.LessThanOrEquals) return new Filter(attrName + "=le=" + value);
        else {
            Exceptions.throw(Exceptions.Errors.InvalidArgument, "Unknown operation: " + operation);
        }
    }

    private static combineOperator(ope: string, filter1: Filter, filter2: Filter, otherFilters: Filter[]): Filter {

        let result = AssertUtil.notNull(filter1, "filter1").value + ' ' + ope + ' ' + AssertUtil.notNull(filter2, "filter2").value;

        otherFilters.forEach(f => result = result + ' ' + ope + ' ' + f.value);
        return new Filter(result);
    }

    /**
     * Combine a set of filter with a logical And. 
     * @param filter1 the first filter
     * @param filter2 the second filter
     * @param otherFilters other optional filters
     */
     public static and(filter1: Filter, filter2: Filter, ...otherFilters: Filter[]): Filter {        
        return this.combineOperator("and", filter1, filter2, otherFilters);
    }

    /**
     * Combine a set of filter with a logical Or. 
     * @param filter1 the first filter
     * @param filter2 the second filter
     * @param otherFilters other optional filters
     */
     public static or(filter1: Filter, filter2: Filter, ...otherFilters: Filter[]): Filter {        
        return this.combineOperator("or", filter1, filter2, otherFilters);
    }
}