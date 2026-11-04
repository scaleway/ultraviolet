import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleThemesMap } from '@ultraviolet/themes'
import { expectNoViolations, renderWithTheme } from '@utils/test'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { Modal } from '..'
import { Button } from '../../../Action/Button'
import { Text } from '../../../Typography/Text'
import illustration from '../__stories__/assets/illustration.webp'

const ProgrammaticModal = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} type="button">
        Open programmatic modal
      </button>
      <Modal ariaLabel="Programmatic modal" onClose={() => setOpen(false)} open={open}>
        <p>Content</p>
      </Modal>
    </>
  )
}

describe('modal - A11y', { tags: ['a11y'] }, () => {
  describe('axe checks', () => {
    it.for([...consoleThemesMap.entries()])('should not have violations when open (theme: %s)', async ([, theme]) => {
      renderWithTheme(
        <Modal ariaLabel="Settings" open>
          <Text as="h2" sentiment="neutral" variant="headingSmallStrong">
            Settings
          </Text>
          <Button>Save</Button>
        </Modal>,
        theme,
      )

      await expectNoViolations(document.body)
    })
  })

  describe('accessible name and description', () => {
    it('should be named by the element referenced by ariaLabelledBy', () => {
      renderWithTheme(
        <Modal ariaLabelledBy="modal-title" open>
          <h2 id="modal-title">Settings</h2>
          <p>Content</p>
        </Modal>,
      )

      expect(screen.getByRole('dialog')).toHaveAccessibleName('Settings')
    })

    it('should be described by the element referenced by ariaDescribedBy', () => {
      renderWithTheme(
        <Modal ariaDescribedBy="modal-description" open>
          <h2>Delete server</h2>
          <p id="modal-description">This action cannot be undone.</p>
        </Modal>,
      )

      expect(screen.getByRole('dialog')).toHaveAccessibleDescription('This action cannot be undone.')
    })
  })

  describe('focus management', () => {
    it('should move focus to the first focusable element on open', async () => {
      renderWithTheme(
        <Modal ariaLabel="Settings" disclosure={<button type="button">Open settings</button>}>
          <button type="button">First action</button>
          <button type="button">Second action</button>
        </Modal>,
      )

      await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))

      expect(screen.getByRole('button', { name: 'First action' })).toHaveFocus()
    })

    it('should focus the dialog when it contains no focusable element', async () => {
      renderWithTheme(
        <Modal ariaLabel="Settings" disclosure={<button type="button">Open settings</button>} isClosable={false}>
          <p>Content</p>
        </Modal>,
      )

      await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))

      expect(screen.getByRole('dialog')).toHaveFocus()
    })

    it('should return focus to the disclosure after closing', async () => {
      renderWithTheme(
        <Modal ariaLabel="Settings" disclosure={<button type="button">Open settings</button>}>
          <p>Content</p>
        </Modal>,
      )
      const trigger = screen.getByRole('button', { name: 'Open settings' })

      await userEvent.click(trigger)
      await userEvent.keyboard('{Escape}')

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(trigger).toHaveFocus()
    })

    it('should return focus to the previously focused element when a programmatic modal closes', async () => {
      renderWithTheme(<ProgrammaticModal />)
      const trigger = screen.getByRole('button', { name: 'Open programmatic modal' })

      await userEvent.click(trigger)
      expect(screen.getByRole('dialog')).toBeVisible()

      await userEvent.keyboard('{Escape}')

      await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
      expect(trigger).toHaveFocus()
    })
  })

  describe('images', () => {
    it('should mark the image as decorative by default', () => {
      renderWithTheme(
        <Modal ariaLabel="Settings" image={illustration} open>
          <p>Content</p>
        </Modal>,
      )

      expect(document.querySelector('dialog img')).toHaveAttribute('alt', '')
    })

    it('should use imageAlt when provided', () => {
      renderWithTheme(
        <Modal ariaLabel="Settings" image={illustration} imageAlt="A server illustration" open>
          <p>Content</p>
        </Modal>,
      )

      expect(screen.getByRole('img')).toHaveAccessibleName('A server illustration')
    })
  })
})
