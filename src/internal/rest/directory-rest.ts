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
import {Criteria} from '../../types/directory/criteria';
import { SearchResult } from '../../types/directory/directory-types';

export default class DirectoryRest extends RestService {

    constructor(uri: string) {
        super(uri);
    }

    public async search(filter: Criteria, limit: number, loginName: string): Promise<boolean> {

        var uriPost = UtilUri.appendPath(this._uri, "search");
        if (loginName) {
            uriPost = UtilUri.appendQuery(uriPost, "loginName", loginName);
        }

        let req: any = new Object();
        req.filter = filter;

        if (limit) {
            req.limit = limit;
        }
        var json = JSON.stringify(req);

        var httpResponse = await RestService._httpClient.post(uriPost, new HttpContent(json));
        return httpResponse.isSuccessStatusCode();    
    }

    public async cancel(loginName: string): Promise<boolean> {

        var uriDelete = UtilUri.appendPath(this._uri, "search");
        if (loginName) {
            uriDelete = UtilUri.appendQuery(uriDelete, "loginName", loginName);
        }

        var httpResponse = await RestService._httpClient.delete(uriDelete);
        return httpResponse.isSuccessStatusCode();    
    }

    public async getResults(loginName: string): Promise<SearchResult> {

        var uriGet = UtilUri.appendPath(this._uri, "search");
        if (loginName) {
            uriGet = UtilUri.appendQuery(uriGet, "loginName", loginName);
        }

        return this.getResult<SearchResult>(await RestService._httpClient.get(uriGet));
    }
}