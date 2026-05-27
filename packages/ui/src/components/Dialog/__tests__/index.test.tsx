import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from '..'
import { Button } from '../../Button'

describe('dialog', () => {
  it('should render correctly', () => {
    const { asFragment } = renderWithTheme(
      <Dialog open sentiment="primary" title="Test">
        <Dialog.Stack>
          <Dialog.Text>text example</Dialog.Text>
          <Dialog.Buttons
            primaryButton={<Button sentiment="danger">Discard changes</Button>}
            secondaryButton={<Dialog.CancelButton onClick={() => {}}>Cancel</Dialog.CancelButton>}
          />
        </Dialog.Stack>
      </Dialog>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should handle disclosure & render prop', async () => {
    renderWithTheme(
      <Dialog disclosure={<Button>Open Dialog</Button>} sentiment="primary" title="Title Test">
        {({ close }) => (
          <Dialog.Stack>
            <Dialog.Text>text example</Dialog.Text>
            <Dialog.Buttons
              primaryButton={<Button sentiment="danger">Discard changes</Button>}
              secondaryButton={<Dialog.CancelButton onClick={close}>Cancel</Dialog.CancelButton>}
            />
          </Dialog.Stack>
        )}
      </Dialog>,
    )

    const disclosure = screen.getByRole('button', { name: 'Open Dialog' })
    expect(screen.queryByRole('heading', { name: 'Title Test' })).not.toBeInTheDocument()

    await userEvent.click(disclosure)
    expect(screen.getByRole('heading', { name: 'Title Test' })).toBeVisible()

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    await userEvent.click(cancelButton)
    expect(screen.queryByRole('heading', { name: 'Title Test' })).not.toBeInTheDocument()
  })

  it('[CancelButton] : should handle click', async () => {
    const onClick = vi.fn()

    renderWithTheme(<Dialog.CancelButton onClick={onClick}>Cancel</Dialog.CancelButton>)

    const button = screen.getByRole('button', { name: 'Cancel' })
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })
})
