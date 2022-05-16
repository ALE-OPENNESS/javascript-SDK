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

export default class UtilUri {

    static ensureHttps(uri: string): string {
        return uri.replace("http:", "https:");
    }

    static appendPath(uri: string, ...paths: string[]): string {

        var newUri = uri;
        for (let i=0; i<paths.length; i++) {
            newUri += "/" + paths[i];
        }
        return newUri;
    }

    static appendQuery(uri: string, queryName: string, queryValue: string = null): string {

        var newUri = uri;

        if (newUri.indexOf("?") >= 0) {
            if (queryValue) {
                newUri += "&" + queryName + "=" + queryValue;
            }
            else {
                newUri += "&" + queryName;
            }
        }
        else {
            if (queryValue) {
                newUri += "?" + queryName + "=" + queryValue;
            }
            else {
                newUri += "?" + queryName;
            }
        }

        return newUri;
    }
}