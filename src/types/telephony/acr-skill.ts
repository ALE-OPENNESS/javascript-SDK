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

/**
 * AcrSkill represents a skill associated to a call. When the "Advanced Call Routing" call distribution strategy is configured, 
 * the CCD agent are selected according to their {@link AgentSkill}. 
 * The selected agent skills must match the skill required by the call.
 */
export class AcrSkill {
    
    private skillNumber: number;
    private acrStatus: boolean;
    private expertEvalLevel: number;
    
    /**
     * Construct a new AcrSkill with the specified parameters.
     * @param number the skill number
     * @param level the expected skill level
     * @param mandatory whether this skill is a mandatory skill.
     */
    constructor(number: number, level: number, mandatory: boolean) {
        this.skillNumber = number;
        this.expertEvalLevel = level;
        this.acrStatus = mandatory;
    }

    /**
     * Returns the skill number
     */
    public get number(): number {
        return this.skillNumber;
    }

    /**
     * Returns whether this skill is a mandatory skill.
     */
    public get mandatory(): boolean {
        return this.acrStatus;
    }

    /**
     * Returns the skill level.
     */
    public get evalLevel(): number {
        return this.expertEvalLevel;
    }

}