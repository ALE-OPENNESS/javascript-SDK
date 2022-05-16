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
 * EventSummary represents event counters associated to the user. It allows a user to get its new message 
 */
export type EventSummaryCounters = {

  /**
   * Return the number of missed calls.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   * <p>
   * <b>CAUTION</b>: This attribute doesn't reflect the missed call number managed by the call server itself but is related to the unanswered and non acknowledged incoming calls in the history call.
   * Therefore, either only the explicit acknowledgment of these history com records through the communication log API service, or a new answered call with the same user will decrease this counter. 
   * Moreover, the counter is incremented for each non answered incoming call, including successive attempts from the same caller.
   */
  missedCallsNb?: number;

  /**
   * Return the number of new voice messages.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   */
  voiceMessagesNb?: number;

  /**
   * Return the number of new callback requests.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   */
  callBackRequestsNb?: number;

  /**
   * Return the number of new faxes.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   */
  faxNb?: number;

  /**
   * Return the number of new text messages.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   */
  newTextNb?: number;

  /**
   * Return the number of old text messages.
   * <p>If this attribute is not specified, it means that the server is not able to provide that information.
   */
  oldTextNb?: number;

  /**
   * Return whether an event is waiting.
   * <p>This flags can be used to notify the application that there are new events waiting. 
   */
  eventWaiting?: boolean
};