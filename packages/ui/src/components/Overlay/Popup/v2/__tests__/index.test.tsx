import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Popup } from '..'
import { Modal } from '../../../Modal'
import { usePopupContext } from '../context'

const renderPopup = ({
  rootProps = {},
  triggerEvent,
  panelProps = {},
}: {
  rootProps?: Partial<Parameters<typeof Popup.Root>[0]>
  triggerEvent?: 'click' | 'hover'
  panelProps?: Partial<Parameters<typeof Popup.Panel>[0]>
} = {}) =>
  renderWithTheme(
    <Popup.Root {...rootProps}>
      <Popup.Trigger {...(triggerEvent ? { triggerEvent } : {})}>
        <button type="button">Open</button>
      </Popup.Trigger>
      <Popup.Panel {...panelProps}>Content</Popup.Panel>
    </Popup.Root>,
  )

describe('popup v2', () => {
  describe('trigger', () => {
    it('should be closed by default', () => {
      renderPopup()
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('should open and close on click on the trigger', async () => {
      renderPopup()

      const trigger = screen.getByRole('button', { name: 'Open' })

      await userEvent.click(trigger)
      expect(screen.getByRole('dialog')).toBeVisible()

      await userEvent.click(trigger)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should open and close on hover', async () => {
      renderPopup({ triggerEvent: 'hover' })
      const trigger = screen.getByRole('button', { name: 'Open' })

      await userEvent.hover(trigger)
      expect(screen.getByRole('dialog')).toBeVisible()

      await userEvent.unhover(trigger)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('dismiss', () => {
    it('should call onOpenChange when dismissed by Escape', async () => {
      const onOpenChange = vi.fn()
      renderPopup({ rootProps: { defaultVisible: true, onOpenChange } })

      await userEvent.keyboard('{Escape}')

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })

    it('should not close an enclosing Modal when clicking a menu item in the Popup', async () => {
      const onClose = vi.fn()

      const MenuList = () => {
        const { setOpen } = usePopupContext()

        return (
          <>
            <Popup.Trigger>
              <button type="button">Open</button>
            </Popup.Trigger>
            <Popup.Panel role="menu" accessibleLabel="Actions">
              <button type="button" role="menuitem" onClick={() => setOpen(false)}>
                Create
              </button>
            </Popup.Panel>
          </>
        )
      }

      renderWithTheme(
        <Modal ariaLabel="modal-test" open onClose={onClose}>
          <Popup.Root>
            <MenuList />
          </Popup.Root>
        </Modal>,
        undefined,
        { container: document.body },
      )

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      await userEvent.click(screen.getByRole('menuitem', { name: 'Create' }))

      expect(screen.queryByRole('menuitem', { name: 'Create' })).not.toBeInTheDocument()
      expect(onClose).not.toHaveBeenCalled()
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('should call onOpenChange when dismissed by an outside click', async () => {
      const onOpenChange = vi.fn()
      renderPopup({ rootProps: { defaultVisible: true, onOpenChange } })

      await userEvent.click(document.body)

      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })

  describe('controlled / uncontrolled', () => {
    it('should respect defaultVisible in uncontrolled mode', () => {
      renderPopup({ rootProps: { defaultVisible: true } })
      expect(screen.getByRole('dialog')).toBeVisible()
    })

    it('should not update internal state in controlled mode', async () => {
      const onOpenChange = vi.fn()
      renderPopup({ rootProps: { visible: false, onOpenChange } })

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(onOpenChange).toHaveBeenCalledWith(true)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('panel', () => {
    it('should reflect the placement on the panel', async () => {
      renderPopup({ panelProps: { placement: 'top' } })

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(screen.getByRole('dialog')).toHaveAttribute('data-placement', 'top')
    })

    it('should render an arrow when arrow is true', async () => {
      renderPopup({ panelProps: { arrow: true } })

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))

      expect(screen.getByRole('dialog').querySelector('svg')).toBeInTheDocument()
    })

    it('should sync the panel min-width to the trigger width when matchTriggerWidth is true', async () => {
      renderPopup({ panelProps: { matchTriggerWidth: true } })
      const trigger = screen.getByRole('button', { name: 'Open' })
      trigger.getBoundingClientRect = () => ({
        bottom: 20,
        height: 20,
        left: 0,
        right: 240,
        top: 0,
        width: 240,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      })

      await userEvent.click(trigger)

      await waitFor(() => expect(screen.getByRole('dialog')).toHaveStyle({ minWidth: '240px' }))
    })

    it('should portal the panel to document.body by default', async () => {
      const { container } = renderPopup()

      await userEvent.click(screen.getByRole('button', { name: 'Open' }))
      const dialog = screen.getByRole('dialog')

      expect(container).not.toContainElement(dialog)
      expect(document.body).toContainElement(dialog)
    })
  })
})
