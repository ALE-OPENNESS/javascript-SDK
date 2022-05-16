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
import Exceptions from '../o2g-exceptions'

export default class AssertUtil {

    static notNullOrEmpty(str: string, name: string): string {

        if ((str == null) || (str.trim().length == 0)) {
            Exceptions.throw(Exceptions.Errors.InvalidArgument, name + " must not be null or empty");
        }

        return str;
    }

    static notNull(obj: any, name: string): any {

        if (obj) {
            return obj;
        }
        else {
            Exceptions.throw(Exceptions.Errors.InvalidArgument, name + " must not be null");
        }
    }

    static positive(value: number, name: string): number {
        if (value < 0) {
            Exceptions.throw(Exceptions.Errors.InvalidArgument, name + " must be positive");
        }

        return value;
    }

    static positiveStrict(value: number, name: string): number {
        if (value <= 0) {
            Exceptions.throw(Exceptions.Errors.InvalidArgument, name + " must be positive");
        }

        return value;
    }
}