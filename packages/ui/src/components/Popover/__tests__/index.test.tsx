import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { SelectInput } from '../../SelectInput'
import { TextInput } from '../../TextInput'
import { Popover } from '..'
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
            disclosure={() => (
              <Button data-testid="button-modal" sentiment="neutral">
                Open Modal
              </Button>
            )}
          >
            <div>
              <div>Modal</div>
              <SelectInput
                label="Choose an option"
                name="options"
                options={options}
              />
              <TextInput
                data-testid="modal-text-input"
                label="Type something here"
              />
            </div>
          </Modal>
          <SelectInput
            label="Choose an option"
            name="options"
            options={options}
          />
          <TextInput
            data-testid="popover-text-input"
            label="Type something here"
          />
        </>
      }
      data-testid="popover"
      onClose={onClose}
      title="Popover Title"
      visible={opened}
    >
      <Button
        data-testid="button-popover"
        onClick={() => setOpened(true)}
        sentiment="neutral"
      >
        Open Popover
      </Button>
    </Popover>
  )
}

describe('tooltip', () => {
  test('should render correctly with required props', () =>
    shouldMatchSnapshot(
      <Popover content="Test" onClose={() => {}} title="Test">
        Children
      </Popover>,
    ))

  test('should render correctly with required props and visible', () =>
    shouldMatchSnapshot(
      <Popover content="Test" onClose={() => {}} title="Test" visible>
        Children
      </Popover>,
    ))

  test('should render correctly with component in content prop', () =>
    shouldMatchSnapshot(
      <Popover content={<p>Test</p>} onClose={() => {}} title="Test" visible>
        Children
      </Popover>,
    ))

  describe(`should render correctly with placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, () => {
        shouldMatchSnapshot(
          <Popover
            content="Test"
            onClose={() => {}}
            placement={placement as ComponentProps<typeof Popover>['placement']}
            title="Test"
            visible
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with sentiment`, () => {
    ;(['neutral', 'primary'] as const).forEach(sentiment => {
      test(`should renders tooltip with placement ${sentiment}`, () => {
        shouldMatchSnapshot(
          <Popover
            content="Test"
            onClose={() => {}}
            sentiment={sentiment}
            title="Test"
            visible
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with sizes`, () => {
    ;['small', 'medium', 'large'].forEach(size => {
      test(`should renders tooltip with placement ${size}`, () => {
        const { asFragment } = renderWithTheme(
          <Popover
            content="Test"
            onClose={() => {}}
            size={size as ComponentProps<typeof Popover>['size']}
            title="Test"
            visible
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })

  test(`should render visible on mount and close on click on close button`, async () => {
    const onClose = vi.fn(() => {})

    renderWithTheme(
      <Popover
        content="Test"
        data-testid="popover"
        onClose={onClose}
        title="Test"
        visible
      >
        Children
      </Popover>,
    )

    const popover = screen.getByTestId('popover')
    expect(popover).toBeVisible()

    const closeButton = screen.getByLabelText('close')
    await userEvent.click(closeButton)

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  test(`should render visible on mount and close on click outside`, async () => {
    const onClose = vi.fn(() => {})

    renderWithTheme(
      <div>
        <div style={{ height: '500px', width: '500px' }}>
          <Popover
            content="Test"
            data-testid="popover"
            onClose={onClose}
            title="Test"
            visible
          >
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

    // Need to await cause popup close is in a setTimeout
    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  // This test is made to check advanced use cases of popover with inputs inside and a modal that contains the same inputs
  // The goal is to check if at any time the popover or the modal close unexpectedly when interacting with the inputs
  describe(`advanced test`, () => {
    test(`should open popover click on select, choose an option and fill text input without closing popover`, async () => {
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

    test(`should open popover then modal within popover, click on select, choose an option and fill text input without closing modal and popover`, async () => {
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
