import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ComponentProps } from 'react'
import { Popover } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'

describe('Tooltip', () => {
  test('should render correctly with required props', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test">
        Children
      </Popover>,
    ))

  test('should render correctly with required props and visible', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content="Test" visible>
        Children
      </Popover>,
    ))

  test('should render correctly with component in content prop', () =>
    shouldMatchEmotionSnapshot(
      <Popover title="Test" content={<p>Test</p>} visible>
        Children
      </Popover>,
    ))

  describe(`should render correctly with placement`, () => {
    ;['top', 'left', 'right', 'bottom'].forEach(placement => {
      test(`should renders tooltip with placement ${placement}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            placement={placement as ComponentProps<typeof Popover>['placement']}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with variant`, () => {
    ;['default', 'primary'].forEach(variant => {
      test(`should renders tooltip with placement ${variant}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            variant={variant as ComponentProps<typeof Popover>['variant']}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  describe(`should render correctly with sizes`, () => {
    ;['small', 'medium', 'large'].forEach(size => {
      test(`should renders tooltip with placement ${size}`, async () => {
        await shouldMatchEmotionSnapshot(
          <Popover
            title="Test"
            content="Test"
            visible
            size={size as ComponentProps<typeof Popover>['size']}
          >
            <p data-testid="children">Children</p>
          </Popover>,
        )
      })
    })
  })

  test(`should render visible on mount and close on click on close button`, async () => {
    const onClose = jest.fn(() => {})

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
})
