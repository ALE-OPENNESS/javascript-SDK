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

import HttpResponse from "./http-response";
import HttpContent from "./http-content";

enum HttpMethod {

    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}


export default class HttpClient {
    private _username: string;
    private _password: string;

    _headers = new Map();

    constructor() {
    }

    setHeader(headerName: string, headerValue: string) {
        this._headers.set(headerName, headerValue);
    }

    setAuthorisationHeader(username: string, password: string) {
        this._username = username;
        this._password = password;

        this.setHeader("Authorization", "Basic " + btoa(username + ":" + password));
    }

    resetAuthorisationHeader() {
        this._headers.delete("Authorization");
        this._username = null;
        this._password = null;
    }

    sendRequest(method: HttpMethod, uri: string, content: HttpContent = null, responseType = null): Promise<HttpResponse> {

        return new Promise((resolve, reject) => {

            var xhr = new XMLHttpRequest();

            if (this._headers.has("Authorization")) {
                xhr.open(method, uri, true, this._username, this._password);
            }
            else {
                xhr.open(method, uri, true);
            }

            this._headers.forEach((value, key) =>  xhr.setRequestHeader(key, value));

            xhr.onerror = function() {
                reject(new HttpResponse(this.status, this.response));
            };

            xhr.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE) {
                    resolve(new HttpResponse(this.status, this.response));
				}
            };

            xhr.withCredentials = true;
            if (responseType) {
                xhr.responseType = responseType;
            }

            if (content) {
                xhr.setRequestHeader('Content-Type', content.type);
                xhr.send(content.content);
            }
            else {
                if (method == HttpMethod.POST) {
                    xhr.setRequestHeader('Content-Type', 'application/json');
                }
                xhr.send();
            }
        });
    }

    get(uri: string, responseType: string = null): Promise<HttpResponse> {
        return this.sendRequest(HttpMethod.GET, uri, null, responseType);
    }

    delete(uri: string): Promise<HttpResponse> {
        return this.sendRequest(HttpMethod.DELETE, uri);
    }

    post(uri: string, content: HttpContent = null, responseType: string = null): Promise<HttpResponse> {
        return this.sendRequest(HttpMethod.POST, uri, content, responseType);
    }

    put(uri: string, content: HttpContent = null): Promise<HttpResponse> {
        return this.sendRequest(HttpMethod.PUT, uri, content);
    }
}