import { userEvent } from '@testing-library/user-event'

export const resetUserEvent = (element: HTMLInputElement) =>
  userEvent.type(element, '{backspace}', {
    initialSelectionEnd: element.value.length,
    initialSelectionStart: 0,
  })
