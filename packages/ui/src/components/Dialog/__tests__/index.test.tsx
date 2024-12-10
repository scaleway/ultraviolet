import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshotWithPortal,
} from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from '..'
import { Button } from '../../Button'

describe('Dialog', () => {
  it('should renders correctly', () =>
    shouldMatchEmotionSnapshotWithPortal(
      <Dialog title="Test" sentiment="primary" open>
        <Dialog.Stack>
          <Dialog.Text>text example</Dialog.Text>
          <Dialog.Buttons
            secondaryButton={
              <Dialog.CancelButton onClick={() => {}}>
                Cancel
              </Dialog.CancelButton>
            }
            primaryButton={<Button sentiment="danger">Discard changes</Button>}
          />
        </Dialog.Stack>
      </Dialog>,
    ))

  it('should handle disclosure & render prop', async () => {
    renderWithTheme(
      <Dialog
        title="Title Test"
        sentiment="primary"
        disclosure={<Button>Open Dialog</Button>}
      >
        {({ close }) => (
          <Dialog.Stack>
            <Dialog.Text>text example</Dialog.Text>
            <Dialog.Buttons
              secondaryButton={
                <Dialog.CancelButton onClick={close}>
                  Cancel
                </Dialog.CancelButton>
              }
              primaryButton={
                <Button sentiment="danger">Discard changes</Button>
              }
            />
          </Dialog.Stack>
        )}
      </Dialog>,
    )

    const disclosure = screen.getByText('Open Dialog')
    expect(screen.queryByText('Title Test')).not.toBeInTheDocument()
    await userEvent.click(disclosure)
    expect(screen.getByText('Title Test')).toBeInTheDocument()
    const cancelButton = screen.getByText('Cancel')
    await userEvent.click(cancelButton)
    expect(screen.queryByText('Title Test')).not.toBeInTheDocument()
  })

  it('[CancelButton] : should handle click', async () => {
    const onClick = vi.fn()

    renderWithTheme(
      <Dialog.CancelButton onClick={onClick}>Cancel</Dialog.CancelButton>,
    )

    const button = screen.getByText('Cancel')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
