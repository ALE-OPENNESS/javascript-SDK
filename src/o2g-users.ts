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

import UsersRest from "./internal/rest/users-rest";
import { Preferences, SupportedLanguages, User } from "./types/users/users-types";

export class Users {

	private _usersRest: UsersRest;

	/**
	 * Raised on creation of an user.
	 * @event
	 */
	readonly ON_USER_CREATED = "OnUserCreated";

	/**
	 * Raised when user is deleted.
	 * @event
	 */
     readonly ON_USER_DELETED = "OnUserDeleted";

	/**
	 * Raised on any change on the user's data.
	 * @event
	 */
     readonly ON_USER_INFO_CHANGED = "OnUserInfoChanged";


	/**
	 * @internal
	 */
    constructor(usersRest: UsersRest) {
		this._usersRest = usersRest;
	}

    /**
     * Retrieves a list of users login from the connected OXEs.
     * <p>
     * if 'nodeIds' is 'null', retrieves the login of users from all the
     * connected OmniPCX Enterprise nodes. This method is generally used by an
     * administrator. if it is used by a user, 'nodeIds' must be set to
     * 'null' and 'onlyACD' to 'false'. In this case only the user login
     * is retrieved.
     * 
     * @param nodeIds Specify a list of OXE nodes Id in which the query is done.
     *                This parameter is only valid for an administrator session.
     * @param onlyACD Allows to select only the ACD operators (agents or
     *                supervisors) during the query. This parameter is only valid
     *                for an administrator session.
     */
	 public async getLogins(nodeIds: number[] = null, onlyACD: boolean = false): Promise<string[]> {
		return await this._usersRest.getLogins(nodeIds, onlyACD);
	}

    /**
     * Retrieves the information on a user from its login.
     * 
     * @param loginName the user login name
     */
	 public async getByLoginName(loginName: string = null): Promise<User> {
		return await this._usersRest.getByLoginName(loginName);
	}

    /**
     * Retrieves the information on a user from its company extension umber.
     * 
     * @param companyPhone the user extension number
     */
	 public async getByCompanyPhone(companyPhone: string): Promise<User> {
		return await this._usersRest.getByCompanyPhone(companyPhone);
	}

    /**
     * Returns the specified user supported languages.
     * 
     * @param loginName the user login name
     */
	 public async getSupportedLanguages(loginName: string): Promise<SupportedLanguages> {
		return await this._usersRest.getSupportedLanguages(loginName);
	}
	
    /**
     * Returns the preference of the specified user.
     * 
     * @param loginName the user login name
     */
	 public async getPreferences(loginName: string): Promise<Preferences> {
		return await this._usersRest.getPreferences(loginName);
	}

    /**
     * Changes the specified user password.
     * 
     * @param loginName   the user login name
     * @param oldPassword the old password
     * @param newPassword the new password
     */
	 public async changePassword(loginName: string, oldPassword: string, newPassword: string): Promise<boolean> {
		return await this._usersRest.changePassword(loginName, oldPassword, newPassword);
	}
}