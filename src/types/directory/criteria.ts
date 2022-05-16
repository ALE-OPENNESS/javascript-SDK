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

import { FilterItem } from "./filter-item";
import { OperationFilter } from "./operation-filter";

/**
 * Criteria allows to specifiy a filter to apply on a directory search.
 * <p>
 * A simple criteria is a tuple of the form: [Attribute, Operation, Value]. For example : [LAST_NAME, BEGINS_WITH, "fr"].
 * <br>A Criteria can also be the logical OR or AND combination of the set of other Criteria's.
 * <p>
 * The acceptable values for the Attributes are:<br>
 * <table>
 * <caption>Attributes values</caption>
 * <thead>
 * <tr><th>Value</th><th>Description</th></tr>
 * </thead>
 * <tr><td>LAST_NAME</td><td>The last name.</td></tr>
 * <tr><td>FIRST_NAME</td><td>The first name.</td></tr>
 * <tr><td>LOGIN_NAME</td><td>The login name.</td></tr>
 * <tr><td>PHONE_NUMBER</td><td>The phone number.</td></tr>
 * </table>
 * <p>
 * The acceptable values for the Operands are<br>
 * <table>
 * <caption>Operands values</caption>
 * <thead>
 * <tr><th>Value</th><th>Description</th></tr>
 * </thead>
 * <tr><td>BEGINS_WITH</td><td>The attribute must begin with the given value.</td></tr>
 * <tr><td>ENDS_WITH</td><td>The attribute must end with the given value.</td></tr>
 * <tr><td>CONTAINS</td><td>The attribute must contain with the given value.</td></tr>
 * <tr><td>EQUAL_IGNORE_CASE</td><td>The attribute is equal to the given value (case insensitive comparison).</td></tr>
 * </table>
 * <p><b><u>exemples</u></b>:
 * @example
 * ```typescript
 *     // Search users whom last name begins with 'b'
 *     let criteria = Criteria.create(
 *                               FilterItem.LASTNAME, 
 *                               OperationFilter.BEGINS_WITH, 
 *                               'b');
 *                               
 *     // Search users whom last name begins with 'b' and first name contains 'ja'
 *     let criteria = Criteria.and(
 *                      Criteria.create(
 *                          FilterItem.LASTNAME,
 *                          OperationFilter.BEGINS_WITH,
 *                          'b'
 *                      ),
 *                      Criteria.create(
 *                          FilterItem.FIRSTNAME,
 *                          OperationFilter.CONTAINS,
 *                          'ja'
 *                      )
 *                    );
 * ```
 *
 */
 export class Criteria {

    private field: string;
    private operation: string;
    private operand: any

    private static _makeField(attr: FilterItem): string {
        if (attr == FilterItem.LAST_NAME) return "lastName";
        else if (attr == FilterItem.FIRST_NAME) return "firstName";
        else if (attr == FilterItem.PHONE_NUMBER) return "id.phoneNumber";
        else return "id.loginName";
    }

    private static _makeOperation(operation: OperationFilter): string {
        if (operation == OperationFilter.BEGINS_WITH) return "BEGIN_WITH";
        else if (operation == OperationFilter.EQUAL_IGNORE_CASE) return "EQUAL_IGNORE_CASE";
        else if (operation == OperationFilter.CONTAINS) return "CONTAIN";
        else return "END_WITH";
    }

    /**
     * @internal
     */
    constructor() {

    }


	/**
	 * Create a new search Criteria with the specified attribute filter, operation
	 * filter and value.
	 * 
	 * @param field     the attribute filter
	 * @param operation the operation
	 * @param operand   the value associated to this critera
	 */
    public static create(field: FilterItem, operation: OperationFilter, value: string): Criteria {

        var criteria = new Criteria();
        criteria.field = Criteria._makeField(field);
        criteria.operation = Criteria._makeOperation(operation);
        criteria.operand = value;

        return criteria;
    }


	/**
	 * Create a search Criteria that is the OR combination of the given
	 * list of Criterias.
	 * 
	 * @param criterias a list of Criteria objects.
	 */
     public static or(): Criteria {

        var criteria = new Criteria();
        criteria.operation = "OR";
        criteria.operand = Array.from(arguments);

        return criteria;
    }

	/**
	 * Create a search Criteria that is the AND combination of the given
	 * list of Criterias.
	 * 
	 * @param criterias a list of Criteria objects.
	 */
     public static and(): Criteria {

        var criteria = new Criteria();
        criteria.operation = "AND";
        criteria.operand = Array.from(arguments);;

        return criteria;
    }
}