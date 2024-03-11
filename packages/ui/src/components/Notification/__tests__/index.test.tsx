import {
  afterEach,
  beforeEach,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { act, screen } from '@testing-library/react'
import { NotificationContainer, notification } from '..'
import { shouldMatchEmotionSnapshotWithPortal } from '../../../../.jest/helpers'

describe('Toaster', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  test('renders correctly with close button', async () => {
    await shouldMatchEmotionSnapshotWithPortal(<NotificationContainer />, {
      transform: async () => {
        notification('Description', 'Title', 'icon', true)

        act(() => jest.runAllTimers())

        expect(await screen.findAllByText('Title')).toMatchSnapshot()
      },
    })
  })

  test('renders correctly with custom close button', async () => {
    await shouldMatchEmotionSnapshotWithPortal(<NotificationContainer />, {
      transform: async () => {
        notification(
          ({ closeToast }) => (
            <button onClick={closeToast} type="button">
              Decline
            </button>
          ),
          'Invitation',
          'Avatar',
          false,
        )

        act(() => jest.runAllTimers())

        expect(await screen.findAllByText('Decline')).toMatchSnapshot()
      },
    })
  })
})
