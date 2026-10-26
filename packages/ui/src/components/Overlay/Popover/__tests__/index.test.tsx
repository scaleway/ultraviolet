import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { theme } from '@ultraviolet/themes'
import { renderWithTheme } from '@utils/test'
import { createRef, useCallback, useState } from 'react'
import type { ComponentProps } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Popover } from '..'
import { Button } from '../../../Action/Button'
import { SelectInput } from '../../../Data Entry/SelectInput'
import { TextInput } from '../../../Data Entry/TextInput'
import { Modal } from '../../Modal'
import { customPopover } from './style.css'

const options: ComponentProps<typeof SelectInput>['options'] = [
  {
    label: 'Option 1',
    value: 'option 1',
  },
  {
    label: 'Option 2',
    value: 'option 2',
  },
]

const AdvancedPopover = () => {
  const [opened, setOpened] = useState(false)
  const onClose = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <Popover
      className={customPopover}
      content={
        <>
          <Modal
            data-testid="modal"
            disclosure={
              <Button data-testid="button-modal" sentiment="neutral">
                Open Modal
              </Button>
            }
          >
            <div>
              <div>Modal</div>
              <SelectInput label="Choose an option" name="options" options={options} />
              <TextInput data-testid="modal-text-input" label="Type something here" />
            </div>
          </Modal>
          <SelectInput label="Choose an option" name="options" options={options} />
          <TextInput data-testid="popover-text-input" label="Type something here" />
        </>
      }
      data-testid="popover"
      onClose={onClose}
      title="Popover Title"
      visible={opened}
    >
      <Button data-testid="button-popover" onClick={() => setOpened(true)} sentiment="neutral">
        Open Popover
      </Button>
    </Popover>
  )
}

describe('popover', () => {
  it('should render only the trigger and not the panel when closed', () => {
    renderWithTheme(
      <Popover content="Test" title="Test">
        <button type="button">Open Popover</button>
      </Popover>,
    )

    expect(screen.getByRole('button', { name: 'Open Popover' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should open and close from the trigger when uncontrolled', async () => {
    renderWithTheme(
      <Popover content="Test" title="Test">
        <button type="button">Open Popover</button>
      </Popover>,
    )

    const trigger = screen.getByRole('button', { name: 'Open Popover' })
    await userEvent.click(trigger)
    expect(screen.getByRole('dialog')).toBeVisible()

    await userEvent.click(trigger)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should render the content as a paragraph when it is a string', () => {
    renderWithTheme(
      <Popover content="Popover content" title="Test" visible>
        Children
      </Popover>,
    )

    expect(screen.getByText('Popover content').tagName).toBe('P')
  })

  it('should render the content without modifying it when it is a JSX element', () => {
    renderWithTheme(
      <Popover content={<p data-testid="content">Test</p>} title="Test" visible>
        Children
      </Popover>,
    )

    expect(screen.getByTestId('content')).toBeVisible()
  })

  it.each([
    ['neutral', theme.colors.neutral.background],
    ['primary', theme.colors.primary.backgroundStrong],
  ] as const)(`should apply the %s sentiment background to the panel`, (sentiment, background) => {
    renderWithTheme(
      <Popover content="Test" data-testid="popover" sentiment={sentiment} title="Test" visible>
        Children
      </Popover>,
    )

    expect(screen.getByTestId('popover')).toHaveStyle({ backgroundColor: background })
  })

  it('should ignore deprecated props', () => {
    renderWithTheme(
      <Popover
        align="start"
        content="Test"
        data-testid="popover"
        dynamicDomRendering={false}
        maxHeight="100px"
        maxWidth="100px"

        placement="auto-left"
        title="Test"
        visible
      >
        Children
      </Popover>,
    )

    // the popup always flips, is dynamically rendered and has a fixed width derived from `size`
    expect(screen.getByTestId('popover')).toBeVisible()
  })

  it('should forward its ref to the popup panel element', () => {
    const ref = createRef<HTMLDivElement>()
    renderWithTheme(
      <Popover content="Test" ref={ref} title="Test" visible>
        Children
      </Popover>,
    )

    expect(ref.current).toBe(screen.getByRole('dialog'))
  })

  it('should render visible on mount and close on click on close button', async () => {
    const onClose = vi.fn(() => {})

    renderWithTheme(
      <Popover content="Test" data-testid="popover" onClose={onClose} title="Test" visible>
        Children
      </Popover>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const closeButton = screen.getByRole('button', { name: 'close' })
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('should render visible on mount and close on click outside', async () => {
    const onClose = vi.fn(() => {})

    renderWithTheme(
      <div>
        <div style={{ height: '500px', width: '500px' }}>
          <Popover content="Test" data-testid="popover" onClose={onClose} title="Test" visible>
            Children
          </Popover>
        </div>
        <div data-testid="outside-element">Outside element</div>
      </div>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const outsideElement = screen.getByTestId('outside-element')
    await userEvent.click(outsideElement)

    expect(onClose).toHaveBeenCalledOnce()
  })

  // This test is made to check advanced use cases of popover with inputs inside and a modal that contains the same inputs
  // The goal is to check if at any time the popover or the modal close unexpectedly when interacting with the inputs
  describe('advanced test', () => {
    it('should open popover click on select, choose an option and fill text input without closing popover', async () => {
      renderWithTheme(<AdvancedPopover />)
      const buttonControlsPopover = screen.getByTestId('button-popover')

      await userEvent.click(buttonControlsPopover)
      const popover = screen.getByTestId('popover')

      expect(popover).toBeVisible()

      const popoverSelect = screen.getByRole('combobox')
      const popoverTextInput = screen.getByTestId('popover-text-input')

      await userEvent.click(popoverSelect)
      const popoverSelectOption = screen.getByTestId('option-option 1')
      await userEvent.click(popoverSelectOption)
      expect(popover).toBeVisible()

      await userEvent.click(popoverTextInput)
      expect(popover).toBeVisible()

      await userEvent.type(popoverTextInput, 'test')
      expect(popover).toBeVisible()

      // closes popover
      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(popover).not.toBeVisible()
      })
    })

    it('should open popover then modal within popover, click on select, choose an option and fill text input without closing modal and popover', async () => {
      renderWithTheme(<AdvancedPopover />)
      const buttonControlsPopover = screen.getByTestId('button-popover')

      await userEvent.click(buttonControlsPopover)
      const popover = screen.getByTestId('popover')

      const buttonControlsModal = screen.getByTestId('button-modal')
      await userEvent.click(buttonControlsModal)
      const modal = screen.getByTestId('modal')
      expect(modal).toBeVisible()

      const modalSelect = screen.getAllByRole('combobox')[1]
      const modalTextInput = screen.getByTestId('modal-text-input')

      await userEvent.click(modalSelect)
      expect(modal).toBeVisible()
      expect(popover).toBeVisible()

      const modalSelectOption = screen.getByTestId('option-option 1')
      await userEvent.click(modalSelectOption)
      expect(modal).toBeVisible()
      expect(popover).toBeVisible()

      await userEvent.click(modalTextInput)
      expect(modal).toBeVisible()
      expect(popover).toBeVisible()

      await userEvent.type(modalTextInput, 'test')
      expect(modal).toBeVisible()
      expect(popover).toBeVisible()

      // closes modal
      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(modal).not.toBeVisible()
      })
      expect(popover).toBeVisible()

      // closes popover
      await userEvent.keyboard('{Escape}')
      await waitFor(() => {
        expect(popover).not.toBeVisible()
      })
    })
  })
})
