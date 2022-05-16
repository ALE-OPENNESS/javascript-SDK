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
 * OperatorDynamicState represents the CCD operator dynamic state.
 */
export enum OperatorDynamicState {

/**
 * The operator is ready.
 */
    READY = "READY",

    /**
     * The operator is logged but out of an agent group.
     */
    OUT_OF_PG = "OUT_OF_PG",

    /**
     * The operator is busy.
     */
    BUSY = "BUSY",

    /**
     * The operator is in the transaction code phase.
     */
    TRANSACTION_CODE_INPUT = "TRANSACTION_CODE_INPUT",

    /**
     * The operator is in the automatic wrapup phase.
     */
    WRAPUP = "WRAPUP",

    /**
     * The operator is in pause.
     */
    PAUSE = "PAUSE",

    /**
     * The operator is in withdraw from the call distribution.
     */
    WITHDRAW = "WITHDRAW",

    /**
     * The operator is in withdraw from the call distribution because he is treating
     * an IM.
     */
    WRAPUP_IM = "WRAPUP_IM",

    /**
     * The operator is in withdraw from the call distribution because he is treating
     * an email.
     */
    WRAPUP_EMAIL = "WRAPUP_EMAIL",

    /**
     * The operator is in withdraw from the call distribution because he is treating
     * an email, nevertheless, a CCD call can be distributed on this operator.
     */
    WRAPUP_EMAIL_INTERRUPTIBLE = "WRAPUP_EMAIL_INTERRUPTIBLE",

    /**
     * The operator is in wrapup after an outbound call.
     */
    WRAPUP_OUTBOUND = "WRAPUP_OUTBOUND",

    /**
     * The operator is in wrapup after a callback call.
     */
    WRAPUP_CALLBACK = "WRAPUP_CALLBACK"

}