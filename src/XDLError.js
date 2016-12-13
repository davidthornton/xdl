/**
 * @flow
 */

import * as Analytics from './Analytics';
import * as Intercom from './Intercom';

import type { ErrorCodes } from './ErrorCode';

export default class XDLError extends Error {
  code: string;
  isXDLError: bool;

  constructor(
    code: $Keys<ErrorCodes>,
    message: string,
    options: { noTrack: bool } = { noTrack: false }
  ) {
    super(message);

    this.code = code;
    this.isXDLError = true;

    if (options && !options.noTrack) {
      Analytics.logEvent('XDL Error', {
        code,
        message,
      });

      Intercom.trackEvent('error', {
        code,
        message,
      });
    }
  }
}
