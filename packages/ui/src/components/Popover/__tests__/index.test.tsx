import styled from '@emotion/styled'
import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { Popover } from '..'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { SelectInput } from '../../SelectInput'
import { TextInput } from '../../TextInput'

const StyledPopover = styled(Popover)`
  height: 600px;
`

const options: ComponentProps<typeof SelectInput>['options'] = [
  {
    value: 'option 1',
    label: 'Option 1',
  },
  {
    value: 'option 2',
    label: 'Option 2',
  },
]

const AdvancedPopover = () => {
  const [opened, setOpened] = useState(false)
  const onClose = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <StyledPopover
      visible={opened}
      title="Popover Title"
      onClose={onClose}
      data-testid="popover"
      content={
        <>
          <Modal
            disclosure={() => (
              <Button sentiment="neutral" data-testid="button-modal">
                Open Modal
              </Button>
            )}
            data-testid="modal"
          >
            <div>
              <div>Modal</div>
              <SelectInput
                name="options"
                label="Choose an option"
                options={options}
              />
              <TextInput
                label="Type something here"
                data-testid="modal-text-input"
              />
            </div>
          </Modal>
          <SelectInput
            name="options"
            label="Choose an option"
            options={options}
          />
          <TextInput
            label="Type something here"
            data-testid="popover-text-input"
          />
        </>
      }
    >
      <Button
        onClick={() => setOpened(true)}
        sentiment="neutral"
        data-testid="button-popover"
      >
        Open Popover
      </Button>
    </StyledPopover>
  )
}

describe('Tooltip', () => {
  test('should render correctly with required props', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" onClose={() => {}}>
        Children
      </Popover>,
    ))

  test('should render correctly with required props and visible', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" onClose={() => {}} visible>
        Children
      </Popover>,
    ))

  test('should render correctly with component in content prop', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content={<p>Test</p>} onClose={() => {}} visible>
        Children
      </Popover>,
    ))

  describe(`should render correctly with placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, () => {
        shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            placement={placement as ComponentProps<typeof Popover>['placement']}
            onClose={() => {}}
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
        shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            sentiment={sentiment}
            onClose={() => {}}
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
            title="Test"
            content="Test"
            visible
            size={size as ComponentProps<typeof Popover>['size']}
            onClose={() => {}}
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
        title="Test"
        content="Test"
        visible
        data-testid="popover"
        onClose={onClose}
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
            title="Test"
            content="Test"
            visible
            data-testid="popover"
            onClose={onClose}
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
