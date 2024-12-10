/* eslint-disable eslint-comments/disable-enable-pair */

import { userEvent } from '@testing-library/user-event'

export const resetUserEvent = (element: HTMLInputElement) =>
  userEvent.type(element, '{backspace}', {
    initialSelectionStart: 0,
    initialSelectionEnd: element.value.length,
  })
