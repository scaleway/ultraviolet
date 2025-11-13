import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshotWithPortal } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../../Button'
import { Dialog } from '..'

describe('dialog', () => {
  it('should renders correctly', () =>
    shouldMatchSnapshotWithPortal(
      <Dialog open sentiment="primary" title="Test">
        <Dialog.Stack>
          <Dialog.Text>text example</Dialog.Text>
          <Dialog.Buttons
            primaryButton={<Button sentiment="danger">Discard changes</Button>}
            secondaryButton={
              <Dialog.CancelButton onClick={() => {}}>
                Cancel
              </Dialog.CancelButton>
            }
          />
        </Dialog.Stack>
      </Dialog>,
    ))

  it('should handle disclosure & render prop', async () => {
    renderWithTheme(
      <Dialog
        disclosure={<Button>Open Dialog</Button>}
        sentiment="primary"
        title="Title Test"
      >
        {({ close }) => (
          <Dialog.Stack>
            <Dialog.Text>text example</Dialog.Text>
            <Dialog.Buttons
              primaryButton={
                <Button sentiment="danger">Discard changes</Button>
              }
              secondaryButton={
                <Dialog.CancelButton onClick={close}>
                  Cancel
                </Dialog.CancelButton>
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
